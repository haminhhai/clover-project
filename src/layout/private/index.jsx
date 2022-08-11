import { Layout } from "antd";
import classNames from "classnames/bind";
import { Navigate, Outlet } from "react-router-dom";
import { getUser, isUserLoggedIn } from "utils";
import { Sidebar } from "./components";
import Header from '../header'
import style from './index.module.scss'
import { useState } from "react";
import { ContextProvider } from "./Context";

const cx = classNames.bind(style)
const { Content } = Layout
export default function PrivateLayout() {
    const [selectedTab, setSelectedTab] = useState(['blog']);
    const [name, setName] = useState(getUser()?.fullName);

    if (!isUserLoggedIn()) {
        return <Navigate to='/' />
    }

    return (
        <Layout className={cx('layout')}>
            <ContextProvider name={name} setName={setName}>
                <Header />
                <Layout>
                    <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    <Content className={cx('content')}>
                        <Outlet />
                    </Content>
                </Layout>
            </ContextProvider>
        </Layout>
    )
}