import { EyeFilled, RestFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Form, Input, InputNumber, Menu, Modal, Pagination, Row } from "antd";
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
import style from "./index.module.scss";

const cx = classNames.bind(style);

export default function InventoryProduct() {
    const [form] = Form.useForm();

    const [filter, setFilter] = useState({
        pageIndex: 0,
        pageSize: 9,
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
            const { products, total } = await productApi.getProductBranch({
                ...filter,
                branchId: selectedKeys[0],
            });
            setListProduct(products);
            setTotal(total);
        } catch (error) {
            console.log(error);
        }
    }

    const addToWarehouse = async (values) => {
        try {
            console.log("🚀 ~ selectedProduct", selectedProduct)
            await productApi.addProductToWarehouse({
                ...values,
                productId: selectedProduct.id,
                positionId: selectedProduct.position,
            })
            setVisibleDelete(false);
            fetchInventory();
            toast.success("Success")
        } catch (error) {
            console.log(error);
            toast.error('Failed')
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
        selectedKeys.length > 0 && fetchInventory();
    }, [filter, selectedKeys]);

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
                                <Filter filter={filter} onChangeFilter={onChangeFilter} listCategory={listCategory} />
                                {/* <div className={cx('btn')}>
                                    <Button icon={<SearchOutlined />}>Search</Button>
                                </div> */}
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
                    <Form.Item name='reason' label='Reason' rules={[
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

        </div>
    )
}