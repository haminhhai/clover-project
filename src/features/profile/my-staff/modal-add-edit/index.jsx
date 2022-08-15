import { Button, Form, Input, Modal, Radio, Select, Space, Upload } from "antd"
import { FIELD_EMAIL_INVALID, FIELD_REQUIRED, PASSWORD_NOT_MATCH } from "constants/message";
import { useEffect, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { UploadOutlined } from "@ant-design/icons";

export default function ModalAddEdit({ listRole, loading, visible, onCancel, onSubmit, selectedUser }) {
    const [form] = Form.useForm();

    const isEdit = useMemo(() => !isEmpty(selectedUser), [selectedUser]);

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        if (e?.fileList?.length > 0) e.fileList[0].status = 'done';
        return e?.fileList;
    };

    useEffect(() => {
        if (!isEdit || !visible) {
            form.resetFields();
            return;
        };

        form.setFieldsValue({
            fullName: selectedUser?.fullName || "",
            email: selectedUser?.email || "",
            role: selectedUser?.roleId || "",
            username: selectedUser?.username || "",
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
                <Form.Item
                    name="imageProfile"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        name="logo"
                        listType="picture"
                        accept="image/png, image/jpeg"
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                {
                    !isEdit && (
                        <Form.Item label="Username" name="username" rules={[
                            { required: true, message: FIELD_REQUIRED },
                        ]}>
                            <Input />
                        </Form.Item>
                    )
                }
                <Form.Item label="Fullname" name="fullName" rules={[
                    { required: true, message: FIELD_REQUIRED },
                ]}>
                    <Input />
                </Form.Item>
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
                                listRole.map(item => (
                                    item.id !== 0 && <Radio value={item.id}>{item.name}</Radio>
                                ))
                            }
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="New Password" name="password" rules={[
                    { required: !isEdit, message: FIELD_REQUIRED },
                    { min: 8, message: "Password must be at least 8 characters" }
                ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Confirm New Password" name="confirm" rules={[
                    { required: !isEdit, message: FIELD_REQUIRED },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
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
                        {isEdit ? "Update" : "Add"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}