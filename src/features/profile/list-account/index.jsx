import { Button, Modal, Pagination, Table } from "antd";
import { renderColumns } from "./columns";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import { useEffect, useState } from "react";
import Filter from "./filter";
import ModalAddEdit from "./modal-add-edit";
import { PlusCircleFilled } from "@ant-design/icons";
import roleApi from "api/role";
import accountApi from "api/account";
import { toast } from "react-toastify";
import { handleUploadImage } from "utils/";

const cx = classNames.bind(style);

export default function ListAccount() {

    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [listAccount, setListAccount] = useState([]);
    const [listRole, setListRole] = useState([]);
    const [total, setTotal] = useState(0);
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
        console.log("🚀 ~ user", user)
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

    const submitAddEdit = async (values) => {
        let userInfo = {
            ...selectedUser,
            ...values,
        }
        if (!userInfo.password) {
            userInfo.password = selectedUser.password;
        }
        try {
            setLoading(true);
            if (!selectedUser) {
                if (userInfo.imageProfile && userInfo.imageProfile.length > 0) {
                    const { url } = await handleUploadImage(userInfo.imageProfile);
                    userInfo.image = url;
                }

                await accountApi.addAccount(userInfo);
                toast.success("Create account success");
            } else {
                if (userInfo.imageProfile && userInfo.imageProfile.length > 0) {
                    const { url } = await handleUploadImage(userInfo.imageProfile);

                    userInfo.image = url;
                }

                await accountApi.editAccount(userInfo);
                toast.success("Success");
            }
            setVisibleEdit(false);
            fetchListAccount();
        } catch (error) {
            console.log("🚀 ~ error", error)
            toast.error('Account existed');
        } finally {
            setLoading(false);
        }
    }

    const submitDelete = async () => {
        try {
            await accountApi.deleteAccount(selectedUser.id);
            toast.success("Delete account success");
            setVisibleDelete(false);
            fetchListAccount();
        } catch (error) {
            toast.error('Delete account failed');
        }
    }

    const fetchListRole = async () => {
        try {
            const list = await roleApi.getAll();
            setListRole(list);
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const fetchListAccount = async () => {
        try {
            const { total, accounts } = await accountApi.getAll({
                ...filter,
            });
            setListAccount(accounts);
            setTotal(total);
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    useEffect(() => {
        fetchListAccount()
    }, [filter])

    useEffect(() => {
        fetchListRole();
        fetchListAccount()
    }, [])

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
            <Filter listRole={listRole} filter={filter} onChange={handleFilterChange} />
            <Table columns={renderColumns({ listRole, openEdit, openDelete })} dataSource={listAccount} pagination={false} />
            <Pagination
                className={cx('pagination')}
                total={total}
                current={filter.pageIndex + 1}
                pageSize={filter.pageSize}
                showSizeChanger
                onChange={handlePageChange} />
            <ModalAddEdit
                listRole={listRole}
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