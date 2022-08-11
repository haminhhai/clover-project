import { Button, Form, Input } from "antd";
import accountApi from "api/account";
import { CLOVER_USER } from "constants/";
import { FIELD_REQUIRED, PASSWORD_NOT_MATCH } from "constants/message";
import { toast } from "react-toastify";
import { getUser } from "utils/";

export function ChangePassword() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (values.old_password !== getUser().password) {
            toast.error("Old password is incorrect");
            return;
        }

        try {
            const userInfo = {
                ...getUser(),
                password: values.new_password
            }
            await accountApi.editAccount(userInfo)
            localStorage.setItem(CLOVER_USER, JSON.stringify(userInfo));
            toast.success("Change password success");
            form.resetFields();
        } catch (error) {
            toast.error('Change password failed');
        }
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
                { min: 8, message: "Password must be at least 8 characters" }
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