import { Button, Card, Col, Form, InputNumber, Row, Select } from "antd";
import branchApi from "api/branch";
import classNames from "classnames/bind";
import { FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        fetchBranch();
    }, [])

    return (
        <Card>
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label='Product' name="productId" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Select placeholder='Select Product'>
                                {
                                    listProduct.map(product => (
                                        <Select.Option key={product.id} value={product.id}>{product.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Branch' name="branchId" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Select placeholder='Select Branch'>
                                <Select.Option value="1">Branch 1</Select.Option>
                                <Select.Option value="2">Branch 2</Select.Option>
                                <Select.Option value="2">Branch 2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Quantity' name="quantity" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Export
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}