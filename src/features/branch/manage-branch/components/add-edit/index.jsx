import { Button, Form, Input, Modal, Select } from "antd";
import { FIELD_REQUIRED } from "constants/message";
import { useEffect, useMemo } from "react";

const listManager = [
    {
        managerId: 1,
        name: "Manager 1"
    },
    {
        managerId: 2,
        name: "Manager 2"
    },
    {
        managerId: 3,
        name: "Manager 3"
    }
]

export default function BranchAddEdit({ selected, visible, onClose, onSubmit }) {
    const [form] = Form.useForm();
    const isEdit = useMemo(() => !!selected, [selected])

    useEffect(() => {
        if (visible && isEdit) {
            form.setFieldsValue(selected)
        }
    }, [visible, selected])
    return (
        <Modal
            title={isEdit ? "Edit Branch" : "Add Branch"}
            visible={visible}
            footer=''
            onCancel={onClose}>
            <Form
                form={form}
                layout="vertical">
                <Form.Item name="branchName" label="Branch Name" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="managerId" label="Manager" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Select>
                        {listManager.map(item => (
                            <Select.Option key={item.managerId} value={item.managerId}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="active" label="Status" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Select>
                        <Select.Option key='0' value={0}>Active</Select.Option>
                        <Select.Option key='1' value={1}>Inactive</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit' style={{ marginRight: 8 }}>
                        {isEdit ? "Update" : "Add"}
                    </Button>
                    <Button type="danger" onClick={onClose}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}