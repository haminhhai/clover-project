import { Button, Col, Form, Input, Row, Spin } from 'antd'
import authApi from 'api/auth'
import classNames from 'classnames/bind'
import { FIELD_REQUIRED } from 'constants'
import { FIELD_EMAIL_INVALID, PASSWORD_NOT_MATCH, PHONE_INVALID } from 'constants'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import _get from 'lodash/get'
import style from '../index.module.scss'

const cx = classNames.bind(style)

export default function RegisterPage() {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [isLogging, setIsLogging] = useState(false)

    useEffect(() => {
        form.resetFields()
    }, [])

    const handleSubmit = async (values) => {
        try {
            setIsLogging(true)
            await authApi.register(values)
            toast.success('Register success')
            navigate('/login')
        } catch (error) {
            const message = _get(error, 'response.data.message', {});
            if (message) {
                toast.error(message)
            }
        } finally {
            setIsLogging(false)
        }
    }

    const checkPhoneNumber = (_, value) => {
        const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        if (!value || regex.test(value)) {
            return Promise.resolve();
        }

        return Promise.reject(new Error(PHONE_INVALID));
    };

    return (
        <Spin spinning={isLogging}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Register</h1>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Row gutter={16}>
                        <Col span='12'>
                            <Form.Item label="Username" name='username' rules={[
                                { required: true, message: FIELD_REQUIRED },
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span='12'>
                            <Form.Item label="Email" name='email' rules={[
                                { required: true, message: FIELD_REQUIRED },
                                { type: 'email', message: FIELD_EMAIL_INVALID }
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span='24'>
                            <Form.Item label="Full Name" name='fullName' rules={[
                                { required: true, message: FIELD_REQUIRED },
                            ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span='12'>
                            <Form.Item label="Password" name='password' rules={[
                                { required: true, message: FIELD_REQUIRED }
                            ]}>
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span='12'>
                            <Form.Item label="Confirm Password" name='re_password' rules={[
                                { required: true, message: FIELD_REQUIRED },
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
                        </Col>
                        <Col span='24'>
                            <Form.Item>
                                <Button htmlType='submit' type="primary">Register</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className={cx('bottom-form')}>
                    Have an account?
                    <Link className={cx('link-route')} to='/login'>
                        Login now
                    </Link>
                </div>
            </div>
        </Spin>
    )
}