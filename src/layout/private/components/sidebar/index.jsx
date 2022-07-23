import { Layout, Menu } from "antd"
import classNames from "classnames/bind"
import style from "./index.module.scss"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { getUser } from "utils/"
import { DashboardFilled, ShopFilled, ShoppingFilled } from "@ant-design/icons"

const cx = classNames.bind(style)
const { Sider } = Layout
export default function Sidebar({ selectedTab, setSelectedTab }) {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const path = location.pathname
        switch (true) {
            case path.includes('dashboard'):
                setSelectedTab(['dashboard'])
                break
            case path.includes('branch'):
                setSelectedTab(['branch'])
                break
            case path.includes('product'):
                setSelectedTab(['product'])
                break
            default:
                setSelectedTab([])
        }
    }, [location])

    const changeSite = ({ key }) => {
        setSelectedTab([key])
        navigate(`/${key}`)
    }

    return (
        <Sider
            theme="light"
            className={cx('container')}
            trigger={null}
        >
            <Menu theme="light" selectedKeys={selectedTab} mode="inline" onClick={changeSite}>
                <Menu.Item key='dashboard' icon={<DashboardFilled style={{ fontSize: 20 }} />}>
                    Dashboard
                </Menu.Item>
                <Menu.Item key='branch' icon={<ShopFilled style={{ fontSize: 20 }} />}>
                    Branch
                </Menu.Item>
                <Menu.Item key='product' icon={<ShoppingFilled style={{ fontSize: 20 }} />}>
                    Product
                </Menu.Item>
            </Menu>
        </Sider>
    )
}