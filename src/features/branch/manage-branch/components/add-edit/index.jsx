import { Button, Form, Input, Modal, Select } from "antd";
import branchApi from "api/branch";
import { FIELD_REQUIRED, PHONE_INVALID } from "constants/message";
import { useEffect, useMemo, useState } from "react";

export default function BranchAddEdit({ selected, visible, onClose, onSubmit }) {
    const [form] = Form.useForm();
    const isEdit = useMemo(() => !!selected, [selected])
    const [listManager, setListManager] = useState([]);

    const checkPhoneNumber = (_, value) => {
        const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        if (!value || regex.test(value)) {
            return Promise.resolve();
        }

        return Promise.reject(new Error(PHONE_INVALID));
    };

    const fetchListManager = async () => {
        try {
            const data = await branchApi.getALlManager();
            setListManager(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (visible) {
            fetchListManager();
            if (isEdit) {
                form.setFieldsValue({
                    ...selected,
                    active: selected.active ? 0 : 1
                })

            }
            !isEdit && form.resetFields();
        }
        if (!visible) {
            setListManager([]);
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
                onFinish={onSubmit}
                layout="vertical">
                <Form.Item name="name" label="Branch Name" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[
                    { required: true, message: FIELD_REQUIRED },
                    { validator: checkPhoneNumber }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="accountId" label="Manager" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Select>
                        {
                            selected?.accountId && (
                                <Select.Option value={selected.accountId}>{selected.accountName}</Select.Option>
                            )
                        }
                        {listManager.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.username}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="active" label="Status" rules={[{ required: true, message: FIELD_REQUIRED }]}>
                    <Select>
                        <Select.Option key='0' value={0}>Active</Select.Option>
                        <Select.Option key='1' value={1}>Deactive</Select.Option>
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