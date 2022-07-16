import { Button, Form, Input, Spin } from 'antd'
import classNames from 'classnames/bind'
import { FIELD_REQUIRED } from 'constants'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import _get from "lodash/get";
import { toast } from 'react-toastify'

import style from '../index.module.scss'
import authApi from 'api/auth'
import { setHeader } from 'api/axiosService'
import { CLOVER_TOKEN, CLOVER_USER } from 'constants/'

const cx = classNames.bind(style)

export default function LoginPage() {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [isLogging, setIsLogging] = useState(false)

    const handleSubmit = async (values) => {
        try {
            setIsLogging(true)
            const { jwtToken, user } = await authApi.login(values)
            setHeader('Authorization', `Bearer ${jwtToken}`);
            localStorage.setItem(CLOVER_TOKEN, jwtToken);
            localStorage.setItem(CLOVER_USER, JSON.stringify(user));
            navigate('/', { replace: true })
        } catch (error) {
            const message = _get(error, 'response.data.message', {});
            if (message) {
                toast.error(message)
            }
        } finally {
            setIsLogging(false)
        }
    }

    return (
        <Spin spinning={isLogging}>
            <div className={cx('container', 'container_login')}>
                <h1 className={cx('title')}>Welcome</h1>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Username" name='username' rules={[
                        { required: true, message: FIELD_REQUIRED }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name='password' rules={[
                        { required: true, message: FIELD_REQUIRED }
                    ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type="primary">Login</Button>
                    </Form.Item>
                </Form>
                <div className={cx('bottom-form')}>
                    Do not have an account?
                    <NavLink className={cx('link-route')} to='/register'>
                        Register now
                    </NavLink>
                </div>
            </div>
        </Spin>
    )
}