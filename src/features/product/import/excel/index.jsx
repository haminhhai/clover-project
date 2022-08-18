import { Button, Card, Col, Image, Modal, Row, Tag, Upload } from "antd";
import { useEffect, useState } from "react";
import img from 'assets/images/example-xlsx.png'
import { PlusCircleFilled, StopFilled } from "@ant-design/icons";
import style from "./index.module.scss";
import classNames from "classnames/bind";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import _ from "lodash";
import productApi from "api/product";

const listPosition = [
    {
        id: 1,
        name: "A1",
        isFull: false,
    },
    {
        id: 2,
        name: "A2",
        isFull: false,
    },
    {
        id: 3,
        name: "A3",
        isFull: true,
    },
    {
        id: 4,
        name: "A4",
        isFull: false,
    },
    {
        id: 5,
        name: "A5",
        isFull: true,
    },
    {
        id: 6,
        name: "A6",
        isFull: true,
    },
    {
        id: 7,
        name: "A7",
        isFull: false,
    }
]

const cx = classNames.bind(style)

export default function ImportExcel() {
    const [visible, setVisible] = useState(false);

    const handleFile = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = e => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            console.log(data)
            if (Array.isArray(data) && data.length >= 1) {
                let allPromise = []
                let error = false
                data.forEach((item, idx) => {
                    if (idx) {
                        const [productId, quantity, size, positionId] = item
                        if (!productId || !positionId || !size || !quantity) {
                            error = true
                            return
                        }

                        allPromise.push(
                            productApi.addProductToWarehouse({
                                productId, quantity, size, positionId
                            })
                        )
                    }
                })
                if (!error) {
                    Promise.all(allPromise).then(res => {
                        toast.success(`Import success ${data.length - 1} product(s)`)
                    }).catch(err => {
                        toast.error("Import error!")
                    })
                } else {
                    toast.error("Import error!")
                }

            } else toast.error("Import error!")
            /* Update state */
        };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    }

    function handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) handleFile(files[0]);
    }

    const renderIcon = (position) => {
        if (position.isFull) {
            return <StopFilled style={{ color: 'red' }} />
        }
        return <PlusCircleFilled style={{ color: 'green' }} />
    }

    return (
        <Card>
            <input
                type="file"
                className="form-control"
                id="file"
                accept={'.xlsx'}
                onChange={handleChange}
            />
            <h3>Example format</h3>
            <Image style={{ marginBottom: 8 }} src={img} />
            {/* <Tag color='blue'>
                Note: Position must be available in warehouse. You can click this button to see warehouse's status.
            </Tag>
            <Button onClick={() => setVisible(true)} style={{ marginTop: 8 }}>
                Status
            </Button>
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={<Button onClick={() => setVisible(false)}>Cancel</Button>}
                title="Warehouse's status">
                <Row gutter={[16, 16]}>
                    {listPosition.map((item, index) => (
                        <Col span={4} key={index} className={cx('wrapper')}>
                            <span>{`ID: ${item.id}`}</span>
                            {renderIcon(item)}
                        </Col>
                    ))}
                </Row>
            </Modal> */}
        </Card>
    )
}