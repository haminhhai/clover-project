import { Button, Card, Col, Image, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { columns } from "./constants";
import img from 'assets/images/null-img.png'

import style from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function ProductDetail({ visible, product, onClose }) {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        setDataTable([
            {
                key: product.productPrice,
                label: 'Price',
                value: product.productPrice
            },
            {
                key: product.quantity,
                label: 'Quantity',
                value: product.quantity
            },
            {
                key: product.size,
                label: 'Size',
                value: product.size
            },
            {
                key: product.position,
                label: 'Position',
                value: product.position
            }
        ]);
    }, [visible, product]);

    return (
        <Modal
            title={product?.productName || "Product"}
            width={700}
            visible={visible}
            footer={<Button danger onClick={onClose}>Close</Button>}
            onCancel={onClose}
        >
            <Row gutter={16}>
                <Col span={8} >
                    <Image
                        width={200}
                        height={200}
                        preview={product?.url}
                        src={product?.url ? product.url : img}
                    />
                </Col>
                <Col span={16} className={cx('table')}>
                    <Table dataSource={dataTable} columns={columns} pagination={false} />
                </Col>
            </Row>
        </Modal>
    )
}