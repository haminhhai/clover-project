import { Col, Pagination, Row, Select } from "antd";
import classNames from "classnames/bind";
import CardProduct from "components/card-product";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listProduct } from "../constants";
import ProductDetail from "../detail";
import style from "./index.module.scss";

const cx = classNames.bind(style);

export default function BestSelling() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [visibleDetail, setVisibleDetail] = useState(false);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setVisibleDetail(true);
    }

    return (
        <Row gutter={16}>
            <Col span={4}>
                <Select placeholder="Select Branch" style={{ width: "100%" }}>
                    <Select.Option value="1">Branch 1</Select.Option>
                    <Select.Option value="2">Branch 2</Select.Option>
                </Select>
            </Col>
            <Col span={18}>
                <Row gutter={[16, 16]}>

                    {listProduct.map((product) => (
                        <Col key={product.id} span={8}>
                            <CardProduct product={product} onClick={() => openDetail(product)} />
                        </Col>
                    ))}
                </Row>
                <Pagination className={cx('pagination')} pageSize={12} defaultCurrent={1} total={10} />
            </Col>
            <ProductDetail visible={visibleDetail} product={selectedProduct} onClose={() => setVisibleDetail(false)} />
        </Row>
    )
}