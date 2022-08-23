import { Card, Col, DatePicker, PageHeader, Row, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Area } from "@ant-design/plots";
import { dataIncome, incomeConfig, columns } from "./constants";

import style from "./index.module.scss";
import { getUser } from "utils/";
import branchApi from "api/branch";
import moment from "moment";
import { DATE_FORMAT } from "constants/";
import { disableFutureDate } from "utils/";

const cx = classNames.bind(style);
const { RangePicker } = DatePicker;

export default function BranchDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [branchDetail, setBranchDetail] = useState({});
    const [dataTable, setDataTable] = useState([]);
    const [dataIncome, setDataIncome] = useState([]);
    const [filter, setFilter] = useState({
        startDate: '',
        endDate: '',
    })

    const onChangeDate = (dates) => {
        const [dateStart, dateEnd] = dates
        setFilter({
            startDate: dateStart.format(DATE_FORMAT),
            endDate: dateEnd.format(DATE_FORMAT)
        })
    }

    const fetchDetail = async (total = 0) => {
        try {
            let totalIncome = total || 0
            const branch = await branchApi.getDetail(id);
            if (getUser().roleId == '2') {
                const income = await branchApi.getIncomeBranch({
                    branchId: id,
                    startDate: '2019-07-01',
                    endDate: moment().format(DATE_FORMAT)
                });
                totalIncome = income.reduce((total, item) => {
                    return total + item.income
                }, 0)
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
                    value: branch.accountName || '-'
                },
                {
                    key: 'status',
                    label: 'Status',
                    value: branch.active
                },
                {
                    key: 'income',
                    label: 'Income',
                    value: totalIncome
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchIncome = async () => {
        if (!filter.startDate || !filter.endDate) return;
        try {
            const income = await branchApi.getIncomeBranch({
                branchId: id,
                startDate: filter.startDate,
                endDate: filter.endDate,
            });
            setDataIncome(income);
            fetchDetail(income.reduce((total, item) => total + item.income, 0));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDetail();
    }, [])

    useEffect(() => {
        fetchIncome();
    }, [filter])

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
                            <RangePicker
                                disabledDate={disableFutureDate}
                                value={[
                                    filter.startDate ? moment(filter.startDate, DATE_FORMAT) : '',
                                    filter.endDate ? moment(filter.endDate, DATE_FORMAT) : ''
                                ]}
                                className={cx('datepicker')}
                                size="large"
                                onChange={onChangeDate} />
                            <Area data={dataIncome} {...incomeConfig} />
                        </Card>
                    </Col>
                }

            </Row>
        </>
    )
}