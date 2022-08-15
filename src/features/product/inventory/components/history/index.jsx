import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { columns } from "./columns";

export default function HistoryDelete({ list, visible, onClose }) {

    return (
        <Modal
            width={800}
            title="History Delete"
            visible={visible}
            footer={<Button danger onClick={onClose}>Close</Button>}
            onCancel={onClose}>
            <Table dataSource={list} columns={columns} pagination={false} />
        </Modal>
    )
}