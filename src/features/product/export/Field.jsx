import { MinusCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { InputCurrency } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import img from "assets/images/null-img.png"
import { useState } from "react";
import { formatVND } from "utils/";

export default function FieldExport({ listProduct, listBranch, name, remove, ...restField }) {
    const [initialPrice, setInitialPrice] = useState('');
    const [maxQuantity, setMaxQuantity] = useState(null);

    const onChangeProduct = (value) => {
        const product = listProduct.find(item => item.id === value);
        if (product) {
            setInitialPrice(formatVND(product.price));
            setMaxQuantity(product.quantity);
        }
    }

    return (
        <Row gutter={16}>
            <Col span={8}>
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
            <Col span={8}>
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
            {/* <Col span={6}>
                <Form.Item name={[name, 'price']} rules={[{ required: true, message: FIELD_REQUIRED }]} extra={initialPrice && `Initial Price: ${initialPrice}`}>
                    <InputCurrency min={0} size='large' placeholder='Price' style={{ width: '100%' }} />
                </Form.Item>
            </Col> */}
            <Col span={6}>
                <Form.Item name={[name, 'quantity']} rules={[{ required: true, message: FIELD_REQUIRED }]} extra={maxQuantity && `Max quantity: ${maxQuantity}`}>
                    <InputNumber max={maxQuantity} placeholder='Quantity' size='large' min={1} style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col>
                <Button size='large' icon={<MinusCircleOutlined />} type="danger" onClick={() => remove(name)} />
            </Col>
        </Row>
    )
}