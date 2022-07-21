import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table } from "antd";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { data, renderColumns } from "./columns";
import { Filter } from "./components";
import style from './index.module.scss';

const cx = classNames.bind(style);
export default function ManageBranch() {
    const navigate = useNavigate();

    const goDetail = (record) => {
        navigate(`/branch/detail/${record?.id || 0}`);
    }

    return (
        <>
            <Card>
                <div style={{ marginBottom: 16 }}>
                    <Button type='primary' icon={<PlusOutlined />} size='large'>New Branch</Button>
                </div>
                <Filter />
                <Space className={cx('btn')}>
                    <Button icon={<SearchOutlined />}>Search</Button>
                </Space>

                <Table dataSource={data} columns={renderColumns(goDetail)} pagination={false} />
            </Card>
        </>
    )
}