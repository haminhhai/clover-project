import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { columns } from "./columns";

export default function HistoryDelete({ visible, onClose }) {
    const [inventory, setInventory] = useState({
        id: 1,
        name: "Inventory 1",
        history: [
            {
                id: 1,
                productName: "Product 1",
                productId: 1,
                quantity: 1,
                fullName: "Nguyen Van A",
                timeDelete: "2020-01-01",
            },
            {
                id: 2,
                productName: "Product 2",
                productId: 2,
                quantity: 2,
                fullName: "Nguyen Van B",
                timeDelete: "2020-01-02",
            },
        ]
    });

    return (
        <Modal
            title={inventory?.name || "History Delete"}
            visible={visible}
            footer={<Button danger onClick={onClose}>Close</Button>}
            onCancel={onClose}>
            <Table dataSource={inventory?.history || []} columns={columns} pagination={false} />
        </Modal>
    )
}