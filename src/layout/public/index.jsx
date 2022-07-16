import { Layout } from "antd";
import classNames from "classnames/bind";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "utils";
import Header from "../header";
import style from './index.module.scss';

const cx = classNames.bind(style);
const { Content } = Layout
export default function PublicLayout({ children }) {
    if (isUserLoggedIn()) {
        return <Navigate to='/' />
    }
    return (
        <Layout className={cx("layout")}>
            <Header />
            <Content className={cx('content')}>
                {/* {children} */}
                <Outlet />
            </Content>
        </Layout>
    )
}