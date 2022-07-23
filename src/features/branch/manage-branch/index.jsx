import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Space, Table } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { data, renderColumns } from "./columns";
import { Filter } from "./components";
import BranchAddEdit from "./components/add-edit";
import style from './index.module.scss';

const cx = classNames.bind(style);
export default function ManageBranch() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [visbleAddEdit, setVisibleAddEdit] = useState(false);

    const openAdd = () => {
        setVisibleAddEdit(true);
    }

    const openEdit = (branch) => {
        setSelected(branch);
        setVisibleAddEdit(true);
    }

    const closeAddEdit = () => {
        console.log(123);
        setSelected(null)
        setVisibleAddEdit(false);
    }

    const submitAddEdit = (values) => {
        console.log(values);
    }

    const goDetail = (record) => {
        navigate(`/branch/detail/${record?.id || 0}`);
    }

    return (
        <Card>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={openAdd}
                    size='large'>
                    New Branch
                </Button>
            </div>
            <Filter />
            <Space className={cx('btn')}>
                <Button icon={<SearchOutlined />}>Search</Button>
            </Space>

            <Table dataSource={data} columns={renderColumns(goDetail, openEdit)} pagination={false} />
            <BranchAddEdit
                selected={selected}
                visible={visbleAddEdit}
                onClose={closeAddEdit}
                onSubmit={submitAddEdit}
            />
        </Card>
    )
}