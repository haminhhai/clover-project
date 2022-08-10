import { Card, Col, DatePicker, PageHeader, Row, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Area } from "@ant-design/plots";
import { dataIncome, incomeConfig, columns } from "./constants";

import style from "./index.module.scss";
import { getUser } from "utils/";

const cx = classNames.bind(style);
const { RangePicker } = DatePicker;

export default function BranchDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [branchDetail, setBranchDetail] = useState({});
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        const branch = {
            id: id,
            name: "Branch 1",
            address: "Address 1",
            phone: "0123456789",
            manager: "Full Name 1",
            status: 0,
            income: 10000,
        }
        setBranchDetail(branch);
        setDataTable([
            {
                key: 'address',
                label: 'Address',
                value: branch.address
            },
            {
                key: 'phone',
                label: 'Phone',
                value: branch.phone
            },
            {
                key: 'manager',
                label: 'Manager',
                value: branch.manager
            },
            {
                key: 'status',
                label: 'Status',
                value: branch.status
            },
            {
                key: 'income',
                label: 'Income',
                value: branch.income
            },
        ]);
    }, [])
    return (
        <>
            <PageHeader title={branchDetail?.name || ''} onBack={() => navigate('/branch')} />
            <Row gutter={16}>
                <Col span={6} >
                    <Card title='Branch Information'>
                        <div className={cx('table')}>
                            <Table dataSource={dataTable} columns={columns} pagination={false} />
                        </div>
                    </Card>
                </Col>
                {
                    getUser().roleId === 0 &&
                    <Col span={18}>
                        <Card title='Branch Income'>
                            <RangePicker className={cx('datepicker')} size="large" />
                            <Area data={dataIncome} {...incomeConfig} />
                        </Card>
                    </Col>
                }

            </Row>
        </>
    )
}