import { Button, Dropdown, Layout, Menu } from "antd"
import classNames from "classnames/bind"
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { getUser, isUserLoggedIn } from "utils"

import style from './index.module.scss'
import React, { useContext, useMemo } from "react"
import { removeHeader } from "api/axiosService"
import { CLOVER_TOKEN, CLOVER_USER } from "constants/"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Context from "layout/private/Context"

const cx = classNames.bind(style)
const { Header: AntHeader } = Layout
export default function Header() {
    const navigate = useNavigate()
    const contextValue = useContext(Context)

    const name = useMemo(() => contextValue?.name, [contextValue])

    const handleLogout = () => {
        removeHeader('Authorization')
        localStorage.removeItem(CLOVER_TOKEN)
        localStorage.removeItem(CLOVER_USER)
        navigate('/login')
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to='/profile'>
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" onClick={handleLogout}>
                <span className={cx('logout')}>
                    Logout
                    <LogoutOutlined />
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <AntHeader className={cx('container')}>
            <div className={cx('brand')}>
                <h2>Clover</h2>
            </div>
            {
                isUserLoggedIn() && <Dropdown overlay={menu} trigger={['click']} className={cx('user')}>
                    <Button type="primary">
                        <UserOutlined />
                        {name}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            }
        </AntHeader>
    )
}