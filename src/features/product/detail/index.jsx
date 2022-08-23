import { Button, Card, Col, Image, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { columns } from "./constants";
import img from 'assets/images/null-img.png'

import style from "./index.module.scss";
import classNames from "classnames/bind";
import { formatVND } from "utils/";

const cx = classNames.bind(style);

export default function ProductDetail({ visible, isInventory, isProductAll, product, onClose }) {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        let columns = [
            {
                key: 'price',
                label: 'Price',
                value: formatVND(product.price)
            },
            {
                key: 'quantity',
                label: 'Quantity',
                value: product.quantity
            },
            {
                key: 'size',
                label: 'Size',
                value: product.size
            },
            {
                key: 'position',
                label: 'Position',
                value: product.positionName
            }
        ]
        if (isInventory) {
            columns = columns.filter(item => item.key !== 'position')
        }
        if (isProductAll) {
            columns = columns.filter(item => item.key !== 'quantity' && item.key !== 'position')
        }
        setDataTable(columns);
    }, [visible, product]);

    return (
        <Modal
            title={product?.name || "Product"}
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
                        preview={product?.image}
                        src={product?.image ? product.image : img}
                    />
                </Col>
                <Col span={16} className={cx('table')}>
                    <Table dataSource={dataTable} columns={columns} pagination={false} />
                </Col>
            </Row>
        </Modal>
    )
}