import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Tag, Upload } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import positionApi from "api/position";
import productApi from "api/product";
import classNames from "classnames/bind";
import { FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WareHouse from "../warehouse";
import style from "./index.module.scss";
import img from "assets/images/null-img.png"

const cx = classNames.bind(style);

export default function Manually() {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState({});
    const [visibleWarehouse, setVisibleWarehouse] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listPosition, setListPosition] = useState([]);

    const importProduct = async (values) => {
        try {
            const resp = await productApi.addProductToWarehouse(values);
            if (resp.positionId) {
                const position = listPosition.find(item => item.id === resp.positionId);
                if (position?.id) {
                    toast.success(`Product was been placed in ${position.name}`);
                }

            }
            toast.success("Import product success");
            form.resetFields();
            setSelectedPosition({});
            fetchListProduct();
        } catch (error) {
            console.log("🚀 ~ error", error)
            toast.error('Import product failed');
        } finally {
            setLoading(false);
        }
    }

    const onFinishFailed = ({ values, errorFields }) => {
        console.log("🚀 ~ values", values)
        console.log("🚀 ~ errorFields", errorFields)
    }

    const changeProduct = (value) => {
        const product = listProduct.find(item => item.id === value)
        form.setFieldsValue({
            size: product.size
        })
    }

    const selectPosistion = pos => {
        setSelectedPosition(pos);
        setVisibleWarehouse(false);
        form.setFieldsValue({
            positionId: pos.id,
        });
    }
    const fetchListProduct = async () => {
        try {
            const { products } = await productApi.getAll({
                pageIndex: 0,
                pageSize: 100,
                warehouseId: 1
            });
            setListProduct(products);
        } catch (error) {
            console.log(error);
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
        fetchListProduct();
    }, [])

    useEffect(() => {
        visibleWarehouse && fetchListPosition()
    }, [visibleWarehouse])

    return (
        <Card>
            <Form form={form} layout='vertical' onFinish={importProduct} onFinishFailed={onFinishFailed}>
                <Row gutter={[16, 8]}>
                    <Col span={6}>
                        <Form.Item
                            label='Product'
                            name='productId'
                            rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Select placeholder='Select Product' size="large" onChange={changeProduct}>
                                {
                                    listProduct.map(product => (
                                        <Select.Option key={product.id} value={product.id} >
                                            <Avatar src={product?.image || img} style={{ marginRight: '1em' }} />
                                            {product.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Quantity' name='quantity' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Size' name='size' rules={[{ required: true, message: FIELD_REQUIRED }]}>
                            <Input disabled style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Position' name='positionId' rules={[{ required: true, message: FIELD_REQUIRED }]}>
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
                    <Button type='primary' loading={loading} htmlType='submit'>Import</Button>
                </Form.Item>
            </Form>

            <WareHouse
                selectedPosition={selectedPosition}
                visible={visibleWarehouse}
                listPosition={listPosition}
                onClose={() => setVisibleWarehouse(false)}
                selectPosistion={selectPosistion} />
        </Card>
    )
}