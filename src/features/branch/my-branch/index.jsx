import { Card, Col, DatePicker, Empty, PageHeader, Row, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Area } from "@ant-design/plots";
import { dataIncome, incomeConfig, columns } from "./constants";

import style from "./index.module.scss";
import { getUser } from "utils/";
import moment from "moment";
import { DATE_FORMAT } from "constants/";
import branchApi from "api/branch";
import { disableFutureDate } from "utils/";

const cx = classNames.bind(style);
const { RangePicker } = DatePicker;

export default function MyBranch() {
    const { id } = useParams();

    const [branchDetail, setBranchDetail] = useState({});
    const [dataIncome, setDataIncome] = useState([]);
    const [dataTable, setDataTable] = useState([]);
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

    const fetchDetail = async (total) => {
        try {
            let totalIncome = total || 0
            const branch = await branchApi.getDetail(getUser().idBranch);
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
                branchId: getUser().idBranch,
                startDate: filter.startDate,
                endDate: filter.endDate,
            });
            setDataIncome(income);
            const tableData = dataTable
            setDataTable(tableData)
            fetchDetail(income.reduce((total, item) => {
                return total + item.income
            }, 0))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDetail()
    }, [])

    useEffect(() => {
        fetchIncome();
    }, [filter])


    return getUser()?.idBranch ?
        <>
            <PageHeader title={branchDetail?.name || ''} />
            <Row gutter={16}>
                <Col span={6} >
                    <Card title='Branch Information'>
                        <div className={cx('table')}>
                            <Table dataSource={dataTable} columns={columns} pagination={false} />
                        </div>
                    </Card>
                </Col>
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

            </Row>
        </> :
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description='You dont have branch yet'>
        </Empty>
}