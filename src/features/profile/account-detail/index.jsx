import { Button, Form, Input } from "antd";
import { FIELD_EMAIL_INVALID, FIELD_REQUIRED } from "constants/message";

export function AccountDetail() {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log("Received values of form: ", values);
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}>
            <Form.Item label="Full Name" name="fullName" rules={[
                { required: true, message: FIELD_REQUIRED }
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[
                { required: true, message: FIELD_REQUIRED },
                { type: "email", message: FIELD_EMAIL_INVALID }
            ]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}