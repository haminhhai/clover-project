import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Tag, Upload } from "antd";
import imageApi from "api/imgService";
import productApi from "api/product";
import { InputCurrency } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import { useState } from "react";
import { toast } from "react-toastify";
import { getUrlImage } from "utils/";
import WareHouse from "../warehouse";

export default function Manually() {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState({});
    const [visibleWarehouse, setVisibleWarehouse] = useState(false);

    const addNewProduct = async (values) => {
        let productInfo = values
        try {
            setLoading(true);
            if (productInfo.upload && productInfo.upload.length > 0) {
                let url = await getUrlImage(productInfo.upload);
                const body = {
                    ...productInfo.upload[0],
                    url,
                }
                const resp = await imageApi.addImgProduct(body)
                productInfo.image = resp.id;
            }

            await productApi.addProduct(productInfo);
            toast.success("Import product success");
        } catch (error) {
            console.log("🚀 ~ error", error)
            toast.error('Import product failed');
        } finally {
            setLoading(false);
        }
    }

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        if (e?.fileList?.length > 0) {
            let res = e.fileList;
            e.fileList[0].status = "done"

            return res;
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
        <Card>
            <Form form={form} layout='vertical' onFinish={addNewProduct}>
                <Row gutter={[16, 8]}>
                    <Col span={24}>
                        <Form.Item
                            name="upload"
                            label="Image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
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
                    <Col span={8}>
                        <Form.Item label='Name' name='name' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Code' name='code' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Category' name='idCategory' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Select >
                                <Select.Option value={1}>Category 1</Select.Option>
                                <Select.Option value={2}>Category 2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
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
                    <Col span={6}>
                        <Form.Item label='Price' name='price' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <InputCurrency style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Quantity' name='quantity' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Size' name='size' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                </Row>
                <Form.Item>
                    <Button type='primary' loading={loading} htmlType='submit'>Import</Button>
                </Form.Item>
            </Form>

            <WareHouse
                selectedPosition={selectedPosition}
                visible={visibleWarehouse}
                onClose={() => setVisibleWarehouse(false)}
                selectPosistion={selectPosistion} />
        </Card>
    )
}