import { Col, Pagination, Row, Select } from "antd";
import productApi from "api/product";
import classNames from "classnames/bind";
import CardProduct from "components/card-product";
import { useEffect, useState } from "react";
import ProductDetail from "../detail";
import style from "./index.module.scss";

const cx = classNames.bind(style);

export default function BestSelling() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [listProduct, setListProduct] = useState([]);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setVisibleDetail(true);
    }

    const fetchBestSelling = async () => {
        try {
            const list = await productApi.getBestSelling();
            setListProduct(list);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBestSelling()
    }, [])

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    {listProduct.map((product, index) => {
                        if (index < 3) {

                            return (
                                <Col key={product.id} span={24} style={{ marginTop: index === 0 ? 160 : 16 }}>
                                    <CardProduct product={product} onClick={() => openDetail(product)} />
                                </Col>
                            )
                        }
                    })}
                </Col>
                <Col span={8}>
                    {listProduct.map((product, index) => {
                        if (index >= 3 && index <= 6) {
                            return (
                                <Col key={product.id} span={24} style={{ marginTop: index === 3 ? 0 : 16 }}>
                                    <CardProduct product={product} onClick={() => openDetail(product)} />
                                </Col>
                            )
                        }
                    })}
                </Col>
                <Col span={8}>
                    {listProduct.map((product, index) => {
                        if (index > 6) {
                            return (
                                <Col key={product.id} span={24} style={{ marginTop: index === 7 ? 160 : 16 }}>
                                    <CardProduct product={product} onClick={() => openDetail(product)} />
                                </Col>
                            )
                        }
                    })}
                </Col>
            </Row>
            <ProductDetail visible={visibleDetail} product={selectedProduct} onClose={() => setVisibleDetail(false)} />
        </>

    )
}