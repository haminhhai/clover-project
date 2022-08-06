import { Col, Pagination, Row, Select } from "antd";
import branchApi from "api/branch";
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
    const [listBranch, setListBranch] = useState([]);

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

    const fetchBranch = async () => {
        try {
            const listActive = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
            });
            const listInActive = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
                active: false,
            });
            setListBranch([...listActive.branches, ...listInActive.branches]);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchBestSelling();
        fetchBranch();
    }, [])

    return (
        <Row gutter={16}>
            <Col span={4}>
                <Select placeholder="Select Branch" style={{ width: "100%" }}>
                    {
                        listBranch.map(branch => (
                            <Select.Option key={branch.id} value={branch.id}>{branch.name}</Select.Option>
                        ))
                    }
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