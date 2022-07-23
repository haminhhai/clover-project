import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Menu, Pagination, Row } from "antd";
import classNames from "classnames/bind";
import { CardProduct } from "components/";
import { useState } from "react";
import { listProduct } from "../constants";
import ProductDetail from "../detail";
import { Filter, HistoryDelete } from "./components";
import style from "./index.module.scss";

const cx = classNames.bind(style);

const listInventory = [
    {
        id: 1,
        name: "Inventory 1",
    },
    {
        id: 2,
        name: "Inventory 2",
    },
]

export default function Inventory() {
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedInventory, setSelectedInventory] = useState({});
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setVisibleDetail(true);
    }

    const openHistory = (inventory) => {
        setSelectedInventory(inventory);
        setVisibleHistory(true);
    }

    return (
        <div>
            <Button disabled={selectedKeys.length === 0} style={{ marginBottom: 16 }} onClick={openHistory}>
                View History
            </Button>
            <Row gutter={16}>
                <Col span={4}>
                    <Menu mode="inline" selectedKeys={selectedKeys}>
                        {listInventory.length > 0 ? listInventory.map((item, idx) => (
                            <Menu.Item key={item.id} onClick={() => setSelectedKeys([`${item.id}`])}>
                                {item.name}
                            </Menu.Item>
                        )) : <Empty />}
                    </Menu>
                </Col>
                {
                    selectedKeys.length > 0 && (
                        <Col span={20}>
                            <Card className={cx('filter')}>
                                <Filter />
                                <div className={cx('btn')}>
                                    <Button icon={<SearchOutlined />}>Search</Button>
                                </div>
                            </Card>

                            <Row gutter={[16, 16]}>
                                {
                                    listProduct.map((product) => (
                                        <Col key={product.id} span={8}>
                                            <CardProduct
                                                product={product}
                                                onClick={() => openDetail(product)} />
                                        </Col>
                                    ))
                                }
                            </Row>
                            <Pagination className={cx('pagination')} defaultCurrent={1} pageSize={12} total={10} />
                        </Col>
                    )
                }
            </Row>
            <ProductDetail visible={visibleDetail} product={selectedProduct} onClose={() => setVisibleDetail(false)} />
            <HistoryDelete visible={visibleHistory} inventory={selectedInventory} onClose={() => setVisibleHistory(false)} />
        </div>
    )
}