import { Button, Modal, Pagination, Table } from "antd";
import { renderColumns } from "./columns";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import { useEffect, useState } from "react";
import Filter from "./filter";
import ModalAddEdit from "./modal-add-edit";
import { PlusCircleFilled } from "@ant-design/icons";

const cx = classNames.bind(style);

const list = [
    {
        id: 1,
        username: "nguyena",
        fullName: 'Nguyen Van A',
        email: 'nguyenvana@gmail.com',
        role: 1,
    },
    {
        id: 2,
        username: "nguyenb",
        fullName: 'Nguyen Van B',
        email: 'nguyenb@gmail.com',
        role: 2,
    },
    {
        id: 3,
        username: "nguyenc",
        fullName: 'Nguyen Van C',
        email: 'nguyenb@gmail.com',
        role: 3,
    },
]

export default function ListAccount() {

    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [filter, setFilter] = useState({
        username: "",
        fullName: "",
        role: "",
        email: "",
        pageIndex: 0,
        pageSize: 10,
    })

    const openAdd = () => {
        setSelectedUser(null);
        setVisibleEdit(true);
    }

    const openEdit = (user) => {
        setSelectedUser(user);
        setVisibleEdit(true);
    }

    const openDelete = (user) => {
        setSelectedUser(user);
        setVisibleDelete(true);
    }

    const handleFilterChange = newFilter => {
        setFilter(newFilter);
    }

    const handlePageChange = (page, pageSize) => {
        setFilter({
            ...filter,
            pageIndex: page - 1,
            pageSize,
        })
    }

    const submitAddEdit = values => {
        console.log("🚀 ~ values", values)
    }

    const submitDelete = () => {
        setVisibleDelete(false);
    }

    useEffect(() => {

    }, [filter])

    return (
        <>
            <div className={cx('btn-add')}>
                <Button
                    type='primary'
                    size='large'
                    icon={<PlusCircleFilled />}
                    onClick={openAdd} >
                    New Account
                </Button>
            </div>
            <Filter filter={filter} onChange={handleFilterChange} />
            <Table columns={renderColumns({ openEdit, openDelete })} dataSource={list} pagination={false} />
            <Pagination
                className={cx('pagination')}
                total={10}
                current={filter.pageIndex + 1}
                pageSize={filter.pageSize}
                showSizeChanger
                onChange={handlePageChange} />
            <ModalAddEdit
                loading={loading}
                visible={visibleEdit}
                onSubmit={submitAddEdit}
                onCancel={() => setVisibleEdit(false)}
                selectedUser={selectedUser} />

            <Modal
                visible={visibleDelete}
                title="Confirm"
                width={400}
                onOk={submitDelete}
                onCancel={() => setVisibleDelete(false)}
                footer={[
                    <Button key="back" onClick={() => setVisibleDelete(false)}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="danger" onClick={submitDelete} loading={loading}>
                        Delete
                    </Button>,
                ]}
            >
                <p>Do you want to delete this user?</p>
            </Modal>
        </>


    )
}