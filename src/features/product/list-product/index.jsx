import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Pagination, Row } from "antd";
import classNames from "classnames/bind";
import { listProduct } from "../constants";
import { Filter } from "./components";
import { CardProduct } from "components";
import style from "./index.module.scss";
import { useState } from "react";
import ProductDetail from "../detail";

const cx = classNames.bind(style);

export default function ListProduct() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [visibleDetail, setVisibleDetail] = useState(false);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setVisibleDetail(true);
    }

    return (
        <>
            <Card className={cx('filter')}>
                <Filter />
                <div className={cx('btn')}>
                    <Button icon={<SearchOutlined />}>Search</Button>
                </div>
            </Card>
            <Row gutter={[16, 16]}>
                {
                    listProduct.map((product) => (
                        <Col key={product.id} span={6}>
                            <CardProduct
                                product={product}
                                onClick={() => openDetail(product)} />
                        </Col>
                    ))
                }
            </Row>
            <Pagination className={cx('pagination')} defaultCurrent={1} pageSize={12} total={10} />
            <ProductDetail visible={visibleDetail} product={selectedProduct} onClose={() => setVisibleDetail(false)} />
        </>
    )
}