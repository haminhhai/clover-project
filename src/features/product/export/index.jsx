import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, InputNumber, Row, Select, Space } from "antd";
import branchApi from "api/branch";
import positionApi from "api/position";
import productApi from "api/product";
import classNames from "classnames/bind";
import { InputCurrency } from "components/";
import { DATE_FORMAT } from "constants/";
import { FIELD_REQUIRED } from "constants/message";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "utils/";
import FieldExport from "./Field";
import style from "./index.module.scss";

const cx = classNames.bind(style)

export default function Export() {
    const [form] = Form.useForm();
    const [listProduct, setListProduct] = useState([]);
    const [listPosition, setListPosition] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState({});
    const [listBranch, setListBranch] = useState([]);

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

    const onFinish = async (values) => {
        if (!values.products || values.products?.length === 0) {
            toast.error('Please add fields to export')
            return;
        }
        try {
            const newValues = values.products.map(item => ({
                ...item,
                price: 0,
            }))
            await productApi.exportProduct({
                products: newValues,
                employee: getUser().id,
                exportDate: moment().format(DATE_FORMAT)
            });
            toast.success("Success");
            fetchListProduct()
            form.resetFields();
        } catch (error) {
            console.log(error);
            toast.error("Export Failed")
        }
    }

    const fetchListPosition = async () => {
        try {
            const list = await positionApi.getWarehouse();
            setListPosition(list);
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const fetchListProduct = async () => {
        try {
            const { products } = await productApi.getProductWarehouse({
                pageIndex: 0,
                pageSize: 100,
                warehouseId: 1
            });
            setListProduct(products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBranch();
        fetchListProduct();
    }, [])

    return (
        <Card>
            <Form form={form} onFinish={onFinish} autoComplete="off">
                <Form.List name="products">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <FieldExport
                                    key={key}
                                    listProduct={listProduct}
                                    listBranch={listBranch}
                                    name={name}
                                    remove={remove}
                                    restField={restField}
                                />
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}