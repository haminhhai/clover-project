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
    const [visibleDelete, setVisibleDelete] = useState(false);

    const openAdd = () => {
        setVisibleAddEdit(true);
    }

    const openEdit = (branch) => {
        setSelected(branch);
        setVisibleAddEdit(true);
    }

    const openDelete = (branch) => {
        setSelected(branch);
        setVisibleDelete(true);
    }

    const closeAddEdit = () => {
        console.log(123);
        setSelected(null)
        setVisibleAddEdit(false);
    }

    const closeDelete = () => {
        setSelected(null)
        setVisibleDelete(false);
    }

    const submitAddEdit = (values) => {
        console.log(values);
    }

    const submitDelete = () => {
        console.log(selected);
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

            <Table dataSource={data} columns={renderColumns(goDetail, openEdit, openDelete)} pagination={false} />
            <BranchAddEdit
                selected={selected}
                visible={visbleAddEdit}
                onClose={closeAddEdit}
                onSubmit={submitAddEdit}
            />
            <Modal
                visible={visibleDelete}
                title="Confirm"
                width={400}
                onOk={submitDelete}
                onCancel={closeDelete}
                footer={[
                    <Button key="back" onClick={closeDelete}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="danger" onClick={submitDelete} loading={loading}>
                        Delete
                    </Button>,
                ]}
            >
                <p>Do you want to delete this branch?</p>
            </Modal>
        </Card>
    )
}