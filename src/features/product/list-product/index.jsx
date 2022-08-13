import { EyeFilled, MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Form, InputNumber, Menu, Modal, Pagination, Row, Select, Spin } from "antd";
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
import productApi from "api/product";
import { toast } from "react-toastify";

const cx = classNames.bind(style);

export default function ListProduct() {
    const [form] = Form.useForm();

    const [filter, setFilter] = useState({
        pageIndex: 0,
        pageSize: 9,
        name: "",
        size: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    const openDetail = (product) => {
        getProductById(product);
        setVisibleDetail(true);
    }

    const openAdd = (product) => {
        getProductById(product);
        setVisibleAdd(true);
    }

    const onChangeFilter = (values) => {
        setFilter(values);
    }

    const handlePageChange = async (page, pageSize) => {
        const params = {
            ...filter,
            pageIndex: page - 1,
            pageSize,
        }
        setFilter(params)
        try {
            if (selectedKeys[0] == '0') {
                const { products, total } = await productApi.getProductWarehouse({
                    ...filter,
                    warehouseId: 1
                });
                setListProduct(products);
                setTotal(total);
            } else {
                const { products, total } = await productApi.getProductBranch({
                    ...filter,
                    branchId: selectedKeys[0].id
                });
                setListProduct(products);
                setTotal(total);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeBranch = (id) => {
        setSelectedKeys([`${id}`])
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

    const getProductById = async (product) => {
        try {
            const resp = await productApi.getById(product.id);
            setSelectedProduct({
                ...resp,
                quantity: product.quantity
            });
        } catch (error) {
            console.log(error);
        }
    }

    const fetchBranch = async () => {
        try {
            const list = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
            });
            setListBranch(list.branches);
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

    const fecthListProduct = async () => {
        try {
            setLoading(true);
            if (selectedKeys[0] == '0') {
                const { products, total } = await productApi.getProductWarehouse({
                    ...filter,
                    warehouseId: 1
                });
                setListProduct(products);
                setTotal(total);
            } else {
                const { products, total } = await productApi.getProductBranch({
                    ...filter,
                    branchId: selectedKeys[0]
                });
                setListProduct(products);
                setTotal(total);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const submitAddInventory = async (values) => {
        try {
            await productApi.addProductToInventory({
                ...values,
                idCategory: selectedProduct.idCategory,
                name: selectedProduct.name,
                image: selectedProduct.image,
                price: selectedProduct.price,
                size: selectedProduct.size,
                position: selectedProduct.position,
            });
            setVisibleAdd(false);
            fecthListProduct();
            toast.success("Success")
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

    useEffect(() => {
        selectedKeys.length > 0 && fecthListProduct();
    }, [filter, selectedKeys])

    return (
        <Row gutter={16}>
            <Col span={4}>
                <Menu mode="inline" selectedKeys={selectedKeys}>
                    {
                        (getUser()?.roleId === 0 || getUser()?.roleId === 2) &&
                        <Menu.Item key={'0'} onClick={() => onChangeBranch('0')}>
                            Warehouse
                        </Menu.Item>
                    }
                    {
                        (getUser()?.roleId !== 0 || getUser()?.roleId !== 4) &&
                            listBranch.length > 0 ? listBranch.map((item, idx) => {
                                if (getUser()?.roleId === 1 && item.id == getUser()?.idBranch) {
                                    return (
                                        <Menu.Item key={item.id} onClick={() => onChangeBranch(item.id)}>
                                            {item.name}
                                        </Menu.Item>
                                    )
                                }
                                if (getUser()?.roleId === 2) {
                                    return (
                                        <Menu.Item key={item.id} onClick={() => onChangeBranch(item.id)}>
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
                        <Filter filter={filter} onChangeFilter={onChangeFilter} listCategory={listCategory} />
                    </Card>
                    <Row gutter={[16, 16]}>
                        {
                            loading ? <Spin /> : listProduct.map((product) => (
                                <Col key={product.id} span={6}>
                                    <CardProduct
                                        product={product}
                                        actions={renderAction(product)} />
                                </Col>
                            ))
                        }
                    </Row>
                    <Pagination
                        className={cx('pagination')}
                        currentPage={filter.pageIndex + 1}
                        pageSize={filter.pageSize}
                        onChange={handlePageChange}
                        total={total} />
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
                    onFinish={submitAddInventory}
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
                        <InputNumber min={0} max={selectedProduct?.quantity} />
                    </Form.Item>
                    <Form.Item
                        label="Branch"
                        name='branchId'
                        rules={[
                            { required: true, message: FIELD_REQUIRED },
                        ]}
                    >
                        <Select>
                            {
                                listBranch.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                ))
                            }
                        </Select>
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