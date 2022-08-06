import { EyeFilled, MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Form, InputNumber, Menu, Modal, Pagination, Row } from "antd";
import classNames from "classnames/bind";
import { Filter } from "./components";
import { CardProduct } from "components";
import style from "./index.module.scss";
import { useEffect, useState } from "react";
import ProductDetail from "../detail";
import { getUser } from "utils/";
import { FIELD_REQUIRED } from "constants/message";
import branchApi from "api/branch";
import categoryApi from "api/category";

const cx = classNames.bind(style);

export default function ListProduct() {
    const [form] = Form.useForm();

    const [selectedProduct, setSelectedProduct] = useState("");
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setVisibleDetail(true);
    }

    const openAdd = (product) => {
        setSelectedProduct(product);
        setVisibleAdd(true);
    }

    const addToInventory = (values) => {
        console.log("🚀 ~ values", values)
    }

    const renderAction = (product) => {
        let actions = [
            <EyeFilled key='1' onClick={() => openDetail(product)} />
        ]
        if (getUser()?.roleId === 2 && selectedKeys[0] == '0') {
            actions.push(<MinusCircleOutlined key='2' onClick={() => openAdd(product)} />)
        }

        return actions;
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

    const fecthCategory = async () => {
        try {
            const list = await categoryApi.getAll();
            setListCategory(list);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBranch();
        fecthCategory();
    }, [])

    useEffect(() => {
        form.resetFields();
    }, [visibleAdd])

    return (
        <Row gutter={16}>
            <Col span={4}>
                <Menu mode="inline" selectedKeys={selectedKeys}>
                    {
                        (getUser()?.roleId === 0 || getUser()?.roleId === 2) &&
                        <Menu.Item key={'0'} onClick={() => setSelectedKeys(['0'])}>
                            Warehouse
                        </Menu.Item>
                    }
                    {
                        (getUser()?.roleId !== 0 || getUser()?.roleId !== 4) &&
                            listBranch.length > 0 ? listBranch.map((item, idx) => {
                                if (getUser()?.roleId === 1 && item.id == getUser()?.idBranch) {
                                    return (
                                        <Menu.Item key={item.id} onClick={() => setSelectedKeys([`${item.id}`])}>
                                            {item.name}
                                        </Menu.Item>
                                    )
                                }
                                if (getUser()?.roleId === 2) {
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
                selectedKeys.length > 0 &&
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
                                <Col key={product.id} span={6}>
                                    <CardProduct
                                        product={product}
                                        actions={renderAction(product)} />
                                </Col>
                            ))
                        }
                    </Row>
                    <Pagination className={cx('pagination')} defaultCurrent={1} pageSize={12} total={10} />
                </Col>
            }
            <ProductDetail visible={visibleDetail} product={selectedProduct} onClose={() => setVisibleDetail(false)} />
            <Modal
                title="Add To Inventory"
                visible={visibleAdd}
                onCancel={() => setVisibleAdd(false)}
                footer=''
            >
                <Form
                    form={form}
                    onFinish={addToInventory}
                    layout='vertical'>
                    <Form.Item
                        label="Quantity"
                        name='quantity'
                        extra={`Has ${selectedProduct.quantity} left`}
                        rules={[
                            { required: true, message: FIELD_REQUIRED },
                            ({ }) => ({
                                validator(_, value) {
                                    if (value <= selectedProduct?.quantity) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(`Quantity must be less than ${selectedProduct?.quantity}`));
                                },
                            }),
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Submit
                        </Button>
                        <Button onClick={() => setVisibleAdd(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    )
}