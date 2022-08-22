import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Pagination, Space, Table } from "antd";
import branchApi from "api/branch";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "utils/";
import { data, renderColumns } from "./columns";
import { Filter } from "./components";
import BranchAddEdit from "./components/add-edit";
import style from './index.module.scss';

const cx = classNames.bind(style);
export default function ManageBranch() {
    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        name: "",
        active: '',
        pageIndex: 0,
        pageSize: 5,
    });
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState(null);
    const [listBranch, setListBranch] = useState([]);
    const [visbleAddEdit, setVisibleAddEdit] = useState(false);

    const openAdd = () => {
        setSelected(null)
        setVisibleAddEdit(true);
    }

    const openEdit = (branch) => {
        setSelected(branch);
        setVisibleAddEdit(true);
    }

    const closeAddEdit = () => {
        setSelected(null)
        setVisibleAddEdit(false);
    }

    const handlePageChange = async (page, pageSize) => {
        const params = {
            ...filter,
            pageIndex: page - 1,
            pageSize,
        }
        setFilter(params)
    }

    const submitAddEdit = async (values) => {
        try {
            if (!selected) {
                await branchApi.add({
                    ...values,
                    active: values.active == '0',
                })
            } else await branchApi.update({
                ...values,
                active: values.active == '0',
                id: selected.id
            })
            fetchListBranch();
            closeAddEdit();
            toast.success(!selected ? 'Create Branch Success' : 'Success');
        } catch (error) {
            toast.error('Oops! Something went wrong. Please try again!');
        }
    }

    const goDetail = (record) => {
        navigate(`/branch/detail/${record?.id || 0}`);
    }

    const fetchListBranch = async () => {
        try {
            const { branches, total } = await branchApi.getPaging({
                ...filter,
                active: filter.active.length < 1 ? undefined : (filter.active == '0' ? true : false),
            })
            setListBranch(branches)
            setTotal(total)
        } catch (error) {
            toast.error('Oops! Something went wrong. Please try again!');
        }
    }

    useEffect(() => {
        fetchListBranch();
    }, [filter])

    return (
        <Card>
            {
                getUser().roleId === 0 && (
                    <div style={{ marginBottom: 16 }}>
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={openAdd}
                            size='large'>
                            New Branch
                        </Button>
                    </div>
                )
            }
            <Filter filter={filter} onChange={(value) => setFilter(value)} />
            {/* <Space className={cx('btn')}>
                <Button icon={<SearchOutlined />} onClick={fetchListBranch}>Search</Button>
            </Space> */}

            <Table dataSource={listBranch} columns={renderColumns(goDetail, openEdit)} pagination={false} />
            <Pagination
                className={cx('pagination')}
                total={total}
                current={filter.pageIndex + 1}
                pageSize={filter.pageSize}
                onChange={handlePageChange}
            />
            <BranchAddEdit
                selected={selected}
                visible={visbleAddEdit}
                onClose={closeAddEdit}
                onSubmit={submitAddEdit}
            />
        </Card>
    )
}