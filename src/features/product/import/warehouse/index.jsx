import { CheckCircleFilled, PlusCircleFilled, StopFilled } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import classNames from "classnames/bind";
import style from "./index.module.scss";

const cx = classNames.bind(style);
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
    }
]
export default function WareHouse({ selectedPosition, listPosition, visible, onClose, selectPosistion }) {
    const renderIcon = (position) => {
        if (position.status) {
            return <StopFilled />
        }
        return position.id === selectedPosition?.id ? <CheckCircleFilled /> : <PlusCircleFilled />
    }
    return (
        <Modal
            visible={visible}
            title="Choose a postion"
            onCancel={onClose}
            footer={<Button onClick={onClose}>Cancel</Button>}
        >
            <Row gutter={[16, 16]}>
                {listPosition.map((item, index) => (
                    <Col span={4} key={index} className={cx('wrapper')}>
                        <span className={cx('name')}>{item.name}</span>
                        <Button
                            disabled={item.status}
                            type={selectedPosition?.id === item.id ? "primary" : ""}
                            icon={renderIcon(item)}
                            onClick={() => selectPosistion(item)} />
                    </Col>
                ))}
            </Row>
        </Modal>
    );
}