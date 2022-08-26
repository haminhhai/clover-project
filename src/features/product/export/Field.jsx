import { MinusCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, InputNumber, Row, Select, Tag } from "antd";
import { InputCurrency } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import img from "assets/images/null-img.png"
import { useState } from "react";
import { formatVND } from "utils/";

export default function FieldExport({ listProduct, listBranch, selectedPosition, listPosition, name, remove, ...restField }) {
    const [initialPrice, setInitialPrice] = useState('');
    const [visibleWarehouse, setVisibleWarehouse] = useState(false);

    const onChangeProduct = (value) => {
        console.log("🚀 ~ value", value)
        const product = listProduct.find(item => item.id === value);
        if (product) {
            setInitialPrice(formatVND(product.price));
        }
    }

    return (
        <Row gutter={16}>
            <Col span={6}>
                <Form.Item
                    name={[name, 'productId']}
                    rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Select placeholder='Select Product' size="large" onChange={onChangeProduct}>
                        {
                            listProduct.map(product => (
                                <Select.Option key={product.id} value={product.id}>
                                    <Avatar src={product?.image || img} style={{ marginRight: '1em' }} />
                                    {product.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name={[name, 'branchId']} rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Select placeholder='Select Branch' size='large'>
                        {
                            listBranch.map(branch => (
                                <Select.Option key={branch.id} value={branch.id}>
                                    {branch.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name={[name, 'quantity']}
                    rules={
                        [{ required: true, message: FIELD_REQUIRED },
                        ({ getFieldsValue }) => ({
                            validator(_, value) {
                                const index = _.field.indexOf('.')

                                const { products } = getFieldsValue()
                                const { productId } = products[_.field.slice(index + 1, index + 2)]
                                console.log("🚀 ~ productId", productId)
                                if (!value || !productId) return Promise.resolve();

                                const maxQuantity = listProduct.find(item => item.id === productId).quantity
                                if (value <= maxQuantity) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error(`Export ${maxQuantity} product`));
                            },
                        })]}
                // extra={maxQuantity && `Quantity product is ${maxQuantity}`}
                >
                    <InputNumber placeholder='Quantity' size='large' min={1} style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item name={[name, 'positionId']}
                // rules={[{ required: true, message: FIELD_REQUIRED }]}
                >
                    {
                        selectedPosition?.name &&
                        <Tag color='success'>{selectedPosition?.name}</Tag>
                    }
                    <Button size='large'>
                        {
                            selectedPosition?.name ? 'Change' : 'Select Position'
                        }
                    </Button>
                </Form.Item>
            </Col>
            <Col>
                <Button size='large' icon={<MinusCircleOutlined />} type="danger" onClick={() => remove(name)} />
            </Col>
        </Row>
    )
}