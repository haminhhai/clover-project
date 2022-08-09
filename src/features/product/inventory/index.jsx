import { EyeFilled, RestFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Form, InputNumber, Menu, Modal, Pagination, Row } from "antd";
import branchApi from "api/branch";
import categoryApi from "api/category";
import classNames from "classnames/bind";
import { CardProduct } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import { getUser } from "utils/";
import ProductDetail from "../detail";
import { Filter, HistoryDelete } from "./components";
import style from "./index.module.scss";

const cx = classNames.bind(style);

export default function InventoryProduct() {
    const [form] = Form.useForm();

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedBranch, setSelectedBranch] = useState({});
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setVisibleDetail(true);
    }

    const openHistory = (branch) => {
        setSelectedBranch(branch);
        setVisibleHistory(true);
    }

    const openDelete = (product) => {
        setSelectedProduct(product);
        setVisibleDelete(true);
    }

    const deleteProduct = (values) => {
        console.log(values);
    }

    const renderAction = (product) => {
        let actions = [
            <EyeFilled key='1' onClick={() => openDetail(product)} />
        ]
        if (getUser()?.roleId === 1) {
            actions.push(<RestFilled key='2' onClick={() => openDelete(product)} />)
        }

        return actions;
    }

    const fecthCategory = async () => {
        try {
            const list = await categoryApi.getAll();
            setListCategory(list);
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
        fetchBranch();
        fecthCategory();
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [visibleDelete])

    return (
        <div>
            {
                (getUser()?.roleId === 0 || getUser()?.roleId === 2) &&
                <Button disabled={selectedKeys.length === 0} style={{ marginBottom: 16 }} onClick={openHistory}>
                    View History
                </Button>
            }
            <Row gutter={16}>
                <Col span={4}>
                    <Menu mode="inline" selectedKeys={selectedKeys}>
                        {listBranch.length > 0 ? listBranch.map((item, idx) => {
                            if (getUser()?.roleId === 1 && item.id == getUser()?.idBranch) {
                                return (
                                    <Menu.Item key={item.id} onClick={() => setSelectedKeys([`${item.id}`])}>
                                        {item.name}
                                    </Menu.Item>
                                )
                            }
                            if (getUser()?.roleId === 0 || getUser()?.roleId === 2) {
                                return (
                                    <Menu.Item key={item.id} onClick={() => setSelectedKeys([`${item.id}`])}>
                                        {item.name}
                                    </Menu.Item>
                                )
                            }
                        }) : <Empty />}
                    </Menu>
                </Col>
                {
                    selectedKeys.length > 0 && (
                        <Col span={20}>
                            <Card className={cx('filter')}>
                                <Filter listCategory={listCategory} />
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
                                                actions={renderAction(product)}
                                            />
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
            <HistoryDelete visible={visibleHistory} inventory={selectedBranch} onClose={() => setVisibleHistory(false)} />
            <Modal
                title="Add Inventory Product To Warehouse"
                visible={visibleDelete}
                onCancel={() => setVisibleDelete(false)}
                footer=''
            >
                <Form
                    form={form}
                    onFinish={deleteProduct}
                    layout='vertical'>
                    <Form.Item
                        label="Quantity"
                        name='quantity'
                        extra={`Has ${selectedProduct.quantity} left`}
                        rules={[
                            { required: true, message: FIELD_REQUIRED },
                        ]}
                    >
                        <InputNumber max={selectedProduct?.quantity} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Submit
                        </Button>
                        <Button onClick={() => setVisibleDelete(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}