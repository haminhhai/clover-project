import { Button, Form, Input } from "antd";
import { FIELD_EMAIL_INVALID, FIELD_REQUIRED, PASSWORD_NOT_MATCH } from "constants/message";

export function ChangePassword() {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log("Received values of form: ", values);
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}>
            <Form.Item label="Old Password" name="old_password" rules={[
                { required: true, message: FIELD_REQUIRED }
            ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="New Password" name="new_password" rules={[
                { required: true, message: FIELD_REQUIRED },
            ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm New Password" name="confirm" rules={[
                { required: true, message: FIELD_REQUIRED },
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
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}