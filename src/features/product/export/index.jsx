import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, InputNumber, Row, Select, Space } from "antd";
import branchApi from "api/branch";
import classNames from "classnames/bind";
import { InputCurrency } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import FieldExport from "./Field";
import style from "./index.module.scss";

const cx = classNames.bind(style)

export default function Export() {
    const [form] = Form.useForm();
    const [listProduct, setListProduct] = useState([]);
    const [listBranch, setListBranch] = useState([]);

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

    const onFinish = async (values) => {
        console.log("🚀 ~ values", values)
    }

    useEffect(() => {
        fetchBranch();
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