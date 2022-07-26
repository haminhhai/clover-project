import { UploadOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Form, Input, InputNumber, Row, Select, Tag, Upload } from "antd";
import classNames from "classnames/bind";
import { InputCurrency } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import { useState } from "react";
import style from "./index.module.scss";
import WareHouse from "./warehouse";

const cx = classNames.bind(style)

export default function Import() {
    const [form] = Form.useForm();

    const [typeImport, setTypeImport] = useState("");
    const [visibleWarehouse, setVisibleWarehouse] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState({});

    const onChangeType = (value) => {
        setTypeImport(value);
    }

    const addNewProduct = values => {
        console.log("🚀 ~ values", values)
    }

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

    const selectPosistion = pos => {
        setSelectedPosition(pos);
        setVisibleWarehouse(false);
        form.setFieldsValue({
            position: pos.id,
        });
    }

    return (
        <Row gutter={16}>
            <Col span={4}>
                <Select placeholder='Select Type' style={{ width: '100%' }} onChange={onChangeType}>
                    <Select.Option value='1'>Import Manually</Select.Option>
                    <Select.Option value='2'>Import By Excel</Select.Option>
                </Select>
            </Col>
            <Col span={12}>
                {typeImport === '1' &&
                    <Card>
                        <Form form={form} layout='vertical' onFinish={addNewProduct}>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Form.Item
                                        name="upload"
                                        label="Image"
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        rules={[{ required: true, message: FIELD_REQUIRED }]}
                                    >
                                        <Upload
                                            name="logo"
                                            listType="picture"
                                            accept="image/png, image/jpeg"
                                            maxCount={1}>
                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label='Name' name='productName' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label='Code' name='productCode' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Price' name='productPrice' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                                        <InputCurrency />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Quantity' name='productQuantity' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='Position' name='position' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                                        {
                                            selectedPosition.name &&
                                            <Tag color='success'>{selectedPosition.name}</Tag>
                                        }
                                        <Button onClick={() => setVisibleWarehouse(true)}>
                                            {
                                                selectedPosition.name ? 'Change' : 'Select Position'
                                            }
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>Import</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                }
            </Col>
            <WareHouse
                selectedPosition={selectedPosition}
                visible={visibleWarehouse}
                onClose={() => setVisibleWarehouse(false)}
                selectPosistion={selectPosistion} />
        </Row>
    );
}