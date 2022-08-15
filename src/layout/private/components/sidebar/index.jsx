import { Layout, Menu } from "antd"
import classNames from "classnames/bind"
import style from "./index.module.scss"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { getUser } from "utils/"
import { DashboardFilled, ExportOutlined, ImportOutlined, InboxOutlined, ShopFilled, ShoppingFilled, TeamOutlined } from "@ant-design/icons"

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
            case path.includes('my-branch'):
                setSelectedTab(['my-branch'])
                break;
            case path.includes('branch'):
                setSelectedTab(['branch'])
                break
            case path.includes('product'):
                setSelectedTab(['product'])
                break
            case path.includes('inventory'):
                setSelectedTab(['inventory'])
                break
            case path.includes('import'):
                setSelectedTab(['import'])
                break
            case path.includes('export'):
                setSelectedTab(['export'])
                break
            case path.includes('account'):
                setSelectedTab(['manage-account'])
                break
            case path.includes('staff'):
                setSelectedTab(['my-staff'])
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
                {
                    getUser()?.roleId !== 1 &&
                    <Menu.Item key='branch' icon={<ShopFilled style={{ fontSize: 20 }} />}>
                        Branch
                    </Menu.Item>
                }
                {
                    getUser()?.roleId === 1 &&
                    <Menu.Item key='my-branch' icon={<ShopFilled style={{ fontSize: 20 }} />}>
                        My Branch
                    </Menu.Item>
                }
                <Menu.Item key='product' icon={<ShoppingFilled style={{ fontSize: 20 }} />}>
                    Product
                </Menu.Item>

                {
                    (getUser()?.roleId !== 3) &&
                    <Menu.Item key='inventory' icon={<InboxOutlined style={{ fontSize: 20 }} />}>
                        Inventory
                    </Menu.Item>
                }

                {
                    getUser()?.roleId === 2 &&
                    <>
                        <Menu.Item key='import' icon={<ImportOutlined style={{ fontSize: 20 }} />}>
                            Import
                        </Menu.Item>
                        <Menu.Item key='export' icon={<ExportOutlined style={{ fontSize: 20 }} />}>
                            Export
                        </Menu.Item>
                    </>
                }
                {
                    getUser()?.roleId === 0 && (
                        <Menu.Item key='manage-account' icon={<TeamOutlined style={{ fontSize: 20 }} />}>
                            Manage Account
                        </Menu.Item>
                    )
                }
                {
                    getUser()?.roleId === 1 && (
                        <Menu.Item key='my-staff' icon={<TeamOutlined style={{ fontSize: 20 }} />}>
                            My Staff
                        </Menu.Item>
                    )
                }
            </Menu>
        </Sider>
    )
}