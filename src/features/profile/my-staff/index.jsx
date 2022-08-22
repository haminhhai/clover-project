import { Button, Modal, Pagination, Table } from "antd";
import { renderColumns } from "./columns";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import { useEffect, useState } from "react";
import roleApi from "api/role";
import accountApi from "api/account";
import { getUser } from "utils/";

const cx = classNames.bind(style);

export default function MyStaff() {
    const [listAccount, setListAccount] = useState([]);
    const [listRole, setListRole] = useState([]);

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
            const list = await accountApi.getAllStaff(getUser().idBranch);
            const filter = list.filter(x => x.role !== 1);
            setListAccount(filter);
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    useEffect(() => {
        fetchListRole();
        fetchListAccount()
    }, [])

    return (
        <>
            {/* <Filter listRole={listRole} filter={filter} onChange={handleFilterChange} /> */}
            <Table columns={renderColumns({ listRole })} dataSource={listAccount} />
        </>


    )
}