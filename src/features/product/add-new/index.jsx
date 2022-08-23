import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Tag, Upload } from "antd";
import branchApi from "api/branch";
import categoryApi from "api/category";
import positionApi from "api/position";
import productApi from "api/product";
import classNames from "classnames/bind";
import { InputCurrency } from "components/";
import { FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleUploadImage } from "utils/";
import WareHouse from "../import/warehouse";
import style from "./index.module.scss";

const cx = classNames.bind(style);

export default function AddNew() {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState({});
    const [visibleWarehouse, setVisibleWarehouse] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [listPosition, setListPosition] = useState([]);
    const [listBranch, setListBranch] = useState([]);

    const addNewProduct = async (values) => {
        let productInfo = values
        // if (productInfo.idBranch == 0) {
        productInfo.idBranch = null;
        productInfo.warehouseId = null
        // } else {
        //     productInfo.warehouseId = null
        // }
        try {
            setLoading(true);
            if (productInfo.upload && productInfo.upload.length > 0) {
                const { url } = await handleUploadImage(productInfo.upload);
                productInfo.image = url;
            }

            await productApi.addProduct(productInfo);
            toast.success("Add product success");
            form.resetFields();
            setSelectedPosition({});
        } catch (error) {
            console.log("🚀 ~ error", error)
            toast.error('Add product failed');
        } finally {
            setLoading(false);
        }
    }

    const onFinishFailed = ({ values, errorFields }) => {
        console.log("🚀 ~ values", values)
        console.log("🚀 ~ errorFields", errorFields)
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

    const fetchCategory = async () => {
        try {
            const list = await categoryApi.getAll();
            setListCategory(list);
        } catch (error) {
            console.log("🚀 ~ error", error)
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

    useEffect(() => {
        fetchCategory();
        fetchBranch()
        fetchListPosition()
    }, [])

    return (
        <Card>
            <Form form={form} layout='vertical' onFinish={addNewProduct} onFinishFailed={onFinishFailed}>
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
                    <Col span={4}>
                        <Form.Item label='Code' name='sku' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col span={6}>
                        <Form.Item
                            label='Place'
                            name='idBranch'
                            rules={[{ required: true, message: FIELD_REQUIRED }]}
                        >
                            <Select style={{ width: '100%' }}>
                                <Select.Option value={0}>Warehouse</Select.Option>
                                {
                                    listBranch.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col> */}
                    <Col span={4}>
                        <Form.Item label='Category' name='idCategory' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Select >
                                {
                                    listCategory.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label='Price' name='price' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <InputCurrency min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label='Size' name='size' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    {/* <Col span={4}>
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
                    </Col> */}

                </Row>
                <Form.Item>
                    <Button type='primary' loading={loading} htmlType='submit'>Add</Button>
                </Form.Item>
            </Form>
            {/* 
            <WareHouse
                selectedPosition={selectedPosition}
                listPosition={listPosition}
                visible={visibleWarehouse}
                onClose={() => setVisibleWarehouse(false)}
                selectPosistion={selectPosistion} /> */}
        </Card>
    )
}