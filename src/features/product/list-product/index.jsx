import { EyeFilled, MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Form, InputNumber, Menu, Modal, Pagination, Row, Select, Spin } from "antd";
import classNames from "classnames/bind";
import { Filter } from "./components";
import { CardProduct } from "components";
import style from "./index.module.scss";
import { useEffect, useState } from "react";
import ProductDetail from "../detail";
import { getUser } from "utils/";
import branchApi from "api/branch";
import categoryApi from "api/category";
import productApi from "api/product";

const cx = classNames.bind(style);

export default function ListProduct() {
    const [form] = Form.useForm();

    const [filter, setFilter] = useState({
        pageIndex: 0,
        pageSize: 8,
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

        return actions;
    }

    const getProductById = async (product) => {
        if (selectedKeys[0] !== 'All' && selectedKeys[0] !== '0') {
            setSelectedProduct(product)
            return;
        }
        try {
            const resp = await productApi.getById(product.id);
            // const resp = await productApi.getProductBranchById(product.id)
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
                active: true
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

            } else if (selectedKeys[0] === 'All') {
                const { products, total } = await productApi.getAll({
                    ...filter,
                });
                setListProduct(products);
                setTotal(total);
            }
            else {
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
        <Row gutter={16}>
            <Col span={4}>
                <Menu mode="inline" selectedKeys={selectedKeys}>
                    {
                        getUser().roleId !== 1 &&
                        <Menu.Item key="All" onClick={() => onChangeBranch('All')}>
                            All
                        </Menu.Item>
                    }
                    {
                        getUser()?.roleId != 1 && (
                            <Menu.Item key={'0'} onClick={() => onChangeBranch('0')}>
                                Warehouse
                            </Menu.Item>

                        )
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
            <ProductDetail isProductAll={selectedKeys[0] === 'All'} visible={visibleDetail} product={selectedProduct} onClose={() => setVisibleDetail(false)} />

        </Row>
    )
}