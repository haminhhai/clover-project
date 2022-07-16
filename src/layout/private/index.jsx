import { Layout } from "antd";
import classNames from "classnames/bind";
import { Navigate, Outlet } from "react-router-dom";
import { isUserLoggedIn } from "utils";
import { Sidebar } from "./components";
import Header from '../header'
import style from './index.module.scss'
import { useState } from "react";

const cx = classNames.bind(style)
const { Content } = Layout
export default function PrivateLayout() {
    const [selectedTab, setSelectedTab] = useState(['blog']);

    if (!isUserLoggedIn()) {
        return <Navigate to='/' />
    }

    return (
        <Layout className={cx('layout')}>
            <Header />
            <Layout>
                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <Content className={cx('content')}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}