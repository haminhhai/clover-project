import { Card, Col, Menu, PageHeader, Row } from "antd";
import classNames from "classnames/bind";
import { getUser } from "utils/";
import style from './index.module.scss'
import ManageBranch from "./manage-branch";

const cx = classNames.bind(style)

let title = '';
if (getUser()?.role) {
    if (getUser().role == 0) {
        title = "Manage Branches";
    } else if (getUser().role == 1) {
        title = "My Branch"
    }
}
export function BranchFeature() {
    return (
        <>
            <PageHeader
                title={title}
            />
            <ManageBranch />
        </>
    )
}