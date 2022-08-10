import { MinusCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { InputCurrency } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import img from "assets/images/null-img.png"

export default function FieldExport({ listProduct, listBranch, name, remove, ...restField }) {
    return (
        <Row gutter={16}>
            <Col span={6}>
                <Form.Item
                    name="productId"
                    rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Select placeholder='Select Product' size="large">
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
            <Col span={4}>
                <Form.Item name="branchId" rules={[{ required: true, message: FIELD_REQUIRED }]}>
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
            <Col span={4}>
                <Form.Item name="sku" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Input size='large' placeholder='SKU' />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item name="price" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <InputCurrency size='large' placeholder='Price' style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item name="quantity" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <InputNumber placeholder='Quantity' size='large' min={1} style={{ width: '100%' }} />
                </Form.Item>
            </Col>
            <Col>
                <Button size='large' icon={<MinusCircleOutlined />} type="danger" onClick={() => remove(name)} />
            </Col>
        </Row>
    )
}