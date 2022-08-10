import { Button, Modal, Table } from "antd";
import { columnsProductOnWH, productsInWareHouse } from "./columns";

export default function ModalProduct({ show, onClose }) {
    return (
        <Modal
            visible={show}
            title='Products'
            onCancel={onClose}
            footer={<Button onClick={onClose}>Close</Button>}
        >
            <Table columns={columnsProductOnWH} dataSource={productsInWareHouse} pagination={false} />
        </Modal>
    )
}