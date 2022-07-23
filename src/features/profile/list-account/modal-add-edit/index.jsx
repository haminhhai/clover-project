import { Button, Form, Input, Modal, Radio, Space } from "antd"
import { FIELD_EMAIL_INVALID, FIELD_REQUIRED, PASSWORD_NOT_MATCH } from "constants/message";
import { useEffect, useMemo } from "react";
import { isEmpty } from "lodash";
import { ROLE_OPTIONS } from "constants/";

export default function ModalAddEdit({ loading, visible, onCancel, onSubmit, selectedUser }) {
    const [form] = Form.useForm();

    const isEdit = useMemo(() => !isEmpty(selectedUser), [selectedUser]);

    useEffect(() => {
        if (!isEdit || !visible) {
            form.resetFields();
            return;
        };

        form.setFieldsValue({
            fullName: selectedUser?.fullName || "",
            email: selectedUser?.email || "",
            role: selectedUser?.role || "",
        });

    }, [selectedUser, isEdit, visible, form])

    return (
        <Modal
            title={isEdit ? "Edit Account" : "Add Account"}
            size='large'
            visible={visible}
            onCancel={onCancel}
            footer=''>
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}>
                <Form.Item label="Email" name="email" rules={[
                    { required: true, message: FIELD_REQUIRED },
                    { type: "email", message: FIELD_EMAIL_INVALID }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[
                    { required: true, message: FIELD_REQUIRED }
                ]}>
                    <Radio.Group>
                        <Space direction="vertical">
                            {
                                ROLE_OPTIONS.map(item => (
                                    item.id !== 0 && <Radio value={item.id}>{item.name}</Radio>
                                ))
                            }
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="New Password" name="new_password" rules={[
                    { required: !isEdit, message: FIELD_REQUIRED },
                ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Confirm New Password" name="confirm" rules={[
                    { required: !isEdit, message: FIELD_REQUIRED },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('new_password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(PASSWORD_NOT_MATCH));
                        },
                    }),
                ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}