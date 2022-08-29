import { EyeFilled, MinusCircleOutlined, PlusCircleOutlined, RestFilled, RotateRightOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Empty, Form, Input, InputNumber, Menu, Modal, Pagination, Row, Select } from "antd";
import branchApi from "api/branch";
import categoryApi from "api/category";
import productApi from "api/product";
import classNames from "classnames/bind";
import { CardProduct } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "utils/";
import ProductDetail from "../detail";
import { Filter, HistoryDelete } from "./components";
import img from "assets/images/null-img.png"

import style from "./index.module.scss";

const cx = classNames.bind(style);

export default function InventoryProduct() {
    const [form] = Form.useForm();

    const [filter, setFilter] = useState({
        pageIndex: 0,
        pageSize: 8,
        name: "",
        size: "",
        category: "",

    });
    const [total, setTotal] = useState(0);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedBranch, setSelectedBranch] = useState({});
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleAddTo, setVisibleAddTo] = useState(false);
    const [visibleAddNew, setVisibleAddNew] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listHistory, setListHistory] = useState([]);
    const [listProductWarehouse, setListProductWarehouse] = useState([]);
    const [listProductBranch, setListProductBranch] = useState([]);
    const [quantityValidate, setQuantityValidate] = useState('')
    const [selectedProductAddNew, setSelectedProductAddNew] = useState('')

    const onChangeProductAddNew = (product) => {
        let res
        if (getUser().roleId === 2) {
            res = listProductWarehouse.find(item => item.id === product)
        } else {
            res = listProductBranch.find(item => item.id === product)
        }
        setSelectedProductAddNew(res)

    }

    const openDetail = (product) => {
        setSelectedProduct(product);
        setVisibleDetail(true);
    }

    const openHistory = (branch) => {
        setSelectedBranch(branch);
        setVisibleHistory(true);
    }

    const openAdd = (product) => {
        setSelectedProduct(product);
        setVisibleAdd(true);
    }

    const openAddTo = (product) => {
        setSelectedProduct(product);
        setVisibleAddTo(true);
    }


    const openDelete = (product) => {
        setSelectedProduct(product);
        setVisibleDelete(true);
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
    }

    const renderAction = (product) => {
        let actions = [
            <EyeFilled key='1' onClick={() => openDetail(product)} />
        ]

        if (getUser()?.roleId == 1 && selectedKeys[0] == getUser().idBranch) {
            actions.push(<PlusCircleOutlined key='5' onClick={() => openAddTo(product)} />)
        }

        if (getUser()?.roleId === 2 && selectedKeys[0] == '0') {
            actions.push(<PlusCircleOutlined key='4' onClick={() => openAddTo(product)} />)
        }

        if (getUser().roleId === 2) {
            actions.push(<RestFilled key='3' onClick={() => openDelete(product)} />)
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
            const list = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
            });
            setListBranch(list.branches);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchInventory = async () => {
        try {
            const { products, total } = await productApi.getProductInventory({
                ...filter,
                branchId: selectedKeys[0] == '0' ? undefined : selectedKeys[0],
            });
            setListProduct(products);
            setTotal(total);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchHistoryDelete = async () => {
        try {
            const list = await branchApi.getDeleteHistory(selectedKeys[0]);
            setListHistory(list);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProductWarehouse = async () => {
        try {
            const { products } = await productApi.getProductWarehouse({
                pageIndex: 0,
                pageSize: 100,
                warehouseId: 1
            });
            setListProductWarehouse(products);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProductBranch = async () => {
        try {
            const { products } = await productApi.getProductBranch({
                pageIndex: 0,
                pageSize: 100,
                branchId: selectedKeys[0]
            });
            setListProductBranch(products);
        } catch (error) {
            console.log(error);
        }
    }

    const submitAddInventory = async (values) => {
        try {
            await productApi.addProductToInventory({
                ...values,
                productId: selectedProduct.productId,
                idCategory: selectedProduct.idCategory,
                name: selectedProduct.name,
                image: selectedProduct.image,
                price: selectedProduct.price,
                size: selectedProduct.size,
                position: selectedProduct.position,
                branchId: getUser().roleId == '1' ? selectedKeys[0] : undefined,
                isWarehouse: getUser().roleId == '2'
            });
            setVisibleAddTo(false);
            fetchInventory();
            toast.success("Success")
        } catch (error) {
            console.log(error);
        }
    }

    const addNewInventory = async (values) => {
        try {
            let selectedProduct;
            if (getUser().roleId == '2') {
                selectedProduct = listProductWarehouse.find(item => (item.id === values.productId))
            } else {
                selectedProduct = listProductBranch.find(item => (item.id === values.productId))
            }
            await productApi.addProductToInventory({
                ...selectedProduct,
                ...values,
                isWarehouse: getUser().roleId == '2',
            })
            setVisibleAddNew(false);
            fetchInventory();
            fetchProductBranch();
            fetchProductWarehouse()
            toast.success("Success")
        } catch (error) {
            console.log(error);
            toast.error('Failed')
        }
    }

    const addToWarehouse = async (values) => {
        try {
            await productApi.addProductToWarehouse({
                ...values,
                productId: selectedProduct.id,
                positionId: selectedProduct.position,
            })
            setVisibleAdd(false);
            fetchInventory();
            toast.success("Success")
        } catch (error) {
            console.log(error);
            toast.error('Failed')
        }
    }

    const deleteInventory = async (values) => {
        try {
            await productApi.deleteInventory({
                ...values,
                id: selectedProduct.id,
                branchId: selectedProduct.branchId,
                accountId: getUser()?.id,
                accountName: getUser()?.username,
            })
            setVisibleDelete(false);
            fetchInventory();
            toast.success("Success")
        } catch (error) {
            console.log(error);
            toast.error('Failed')
        }
    }

    const fetchListForAddTo = async () => {
        try {
            if (selectedKeys[0] === '0') {
                const { products } = await productApi.getProductWarehouse({
                    pageIndex: 0,
                    pageSize: 100,
                    warehouseId: 1
                });
                let product = products.find(item => item.id === selectedProduct.productId)
                setQuantityValidate(product?.quantity || '')
            } else {
                const { products } = await productApi.getProductBranch({
                    pageIndex: 0,
                    pageSize: 100,
                    branchId: selectedKeys[0]
                })
                let product = products.find(item => item.id === selectedProduct.productId)
                setQuantityValidate(product?.quantity || '')
            }
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

    useEffect(() => {
        visibleHistory && fetchHistoryDelete();
    }, [visibleHistory])

    useEffect(() => {
        if (visibleAddNew) {
            fetchProductWarehouse();
            fetchProductBranch()
        }
        setSelectedProductAddNew()
    }, [visibleAddNew])

    useEffect(() => {
        selectedKeys.length > 0 && fetchInventory();
    }, [filter, selectedKeys]);

    useEffect(() => {
        visibleAddTo && fetchListForAddTo()
        if (!visibleAddTo) setQuantityValidate('')
    }, [visibleAddTo])

    useEffect(() => {
        setFilter({
            pageIndex: 0,
            pageSize: 8,
            name: "",
            size: "",
            category: "",
        })
    }, [selectedKeys])

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
                        {
                            getUser()?.roleId !== 1 && (
                                <Menu.Item key="0" onClick={() => setSelectedKeys(['0'])}>
                                    <span>WareHouse</span>
                                </Menu.Item>
                            )
                        }
                        {listBranch.length > 0 ? listBranch.map((item, idx) => {
                            if ((getUser()?.roleId === 0 || getUser()?.roleId === 2) || (getUser()?.roleId === 1 && item.id == getUser()?.idBranch)) {
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
                            {
                                selectedKeys[0] == '0' && getUser().roleId == '2' && (
                                    <Button style={{ marginBottom: 16 }} onClick={() => setVisibleAddNew(true)}>
                                        Add New Inventory
                                    </Button>
                                )
                            }
                            {
                                selectedKeys[0] == getUser().idBranch && getUser().roleId == '1' && (
                                    <Button style={{ marginBottom: 16 }} onClick={() => setVisibleAddNew(true)}>
                                        Add New Inventory
                                    </Button>
                                )
                            }
                            <Card className={cx('filter')}>
                                <Filter filter={filter} onChangeFilter={onChangeFilter} listCategory={listCategory} />
                            </Card>

                            <Row gutter={[16, 16]}>
                                {
                                    listProduct.map((product) => (
                                        <Col key={product.id} span={6}>
                                            <CardProduct
                                                product={product}
                                                actions={renderAction(product)}
                                            />
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
                    )
                }
            </Row>
            <ProductDetail isInventory visible={visibleDetail} product={selectedProduct} onClose={() => setVisibleDetail(false)} />
            <HistoryDelete visible={visibleHistory} list={listHistory} onClose={() => setVisibleHistory(false)} />
            <Modal
                title="Add Inventory"
                visible={visibleAdd}
                onCancel={() => setVisibleAdd(false)}
                footer=''
            >
                <Form
                    form={form}
                    onFinish={addToWarehouse}
                    layout='vertical'>
                    <Form.Item
                        label="Quantity"
                        name='quantity'
                        extra={`Has ${selectedProduct.quantity} left`}
                        rules={[
                            { required: true, message: FIELD_REQUIRED },
                        ]}
                    >
                        <InputNumber min={0} max={selectedProduct?.quantity} />
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
            <Modal
                title="Delete Inventory Product"
                visible={visibleDelete}
                onCancel={() => setVisibleDelete(false)}
                footer=''
            >
                <Form
                    form={form}
                    onFinish={deleteInventory}
                    layout='vertical'>
                    <Form.Item
                        label="Quantity"
                        name='quantity'
                        extra={`Has ${selectedProduct.quantity} left`}
                        rules={[
                            { required: true, message: FIELD_REQUIRED },
                        ]}
                    >
                        <InputNumber min={0} max={selectedProduct?.quantity} />
                    </Form.Item>
                    <Form.Item name='reason' label="Reason" rules={[
                        { required: true, message: FIELD_REQUIRED },
                    ]}>
                        <Input />
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
            <Modal
                title="Add New Inventory"
                visible={visibleAddNew}
                onCancel={() => setVisibleAddNew(false)}
                footer=''
            >
                <Form
                    form={form}
                    onFinish={addNewInventory}
                    layout='vertical'>
                    <Form.Item
                        label="Product"
                        name='productId'
                        rules={[{ required: true, message: FIELD_REQUIRED }]}>
                        <Select placeholder='Select Product' size="large" onChange={onChangeProductAddNew}>
                            {
                                getUser().roleId == '2' ? listProductWarehouse.map(product => (
                                    <Select.Option key={product.id} value={product.id} >
                                        <Avatar src={product?.image || img} style={{ marginRight: '1em' }} />
                                        {product.name}
                                    </Select.Option>
                                )) : listProductBranch.map(product => (
                                    <Select.Option key={product.id} value={product.id}>
                                        <Avatar src={product?.image || img} style={{ marginRight: '1em' }} />
                                        {product.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name='quantity'
                        extra={selectedProductAddNew?.quantity ? `Has ${selectedProductAddNew.quantity} left` : ''}
                        rules={[
                            { required: true, message: FIELD_REQUIRED },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value && !getFieldValue('productId')) return;
                                    let product;

                                    if (getUser().roleId == 1) {
                                        product = listProductWarehouse.find(item => item.id === getFieldValue('productId'))
                                    } else {
                                        product = listProductBranch.find(item => item.id === getFieldValue('productId'))
                                    }
                                    if (!product?.quantity || value <= product?.quantity) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(`Quantity must be less than ${selectedProductAddNew?.quantity}`));
                                },
                            }),
                        ]}
                    >
                        <InputNumber min={0} max={selectedProductAddNew?.quantity} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Submit
                        </Button>
                        <Button onClick={() => setVisibleAddNew(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Add To Inventory"
                visible={visibleAddTo}
                onCancel={() => setVisibleAddTo(false)}
                footer=''
            >
                <Form
                    form={form}
                    onFinish={submitAddInventory}
                    layout='vertical'>
                    <Form.Item
                        label="Quantity"
                        name='quantity'
                        extra={quantityValidate ? `Has ${quantityValidate} left` : ''}
                        rules={[
                            { required: true, message: FIELD_REQUIRED },
                            ({ }) => ({
                                validator(_, value) {
                                    if (value <= quantityValidate) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(`Quantity must be less than ${quantityValidate}`));
                                },
                            }),
                        ]}
                    >
                        <InputNumber min={0} max={quantityValidate ? quantityValidate : undefined} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Submit
                        </Button>
                        <Button onClick={() => setVisibleAddTo(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
