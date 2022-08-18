import { Button, Card, Col, DatePicker, Row, Select, Space, Table } from "antd";
import branchApi from "api/branch";
import classNames from "classnames/bind";
import { DATE_FORMAT } from "constants/";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { disableFutureDate } from "utils/";
import { data, renderColumns } from "./columns";
import style from "./index.module.scss";

const cx = classNames.bind(style);

const { RangePicker } = DatePicker;
const { Option } = Select;
export default function AllIncome() {
    const [filter, setFilter] = useState({
        startDate: "",
        endDate: "",
    })

    const [selectedBranch, setSelectedBranch] = useState('');
    const [listBranch, setListBranch] = useState([]);
    const [listIncome, setListIncome] = useState([]);

    const changeBranch = async (value) => {
        setSelectedBranch(value);
    }

    const onChangeDate = (dates) => {
        const [dateStart, dateEnd] = dates
        setFilter({
            startDate: dateStart.format(DATE_FORMAT),
            endDate: dateEnd.format(DATE_FORMAT)
        })
    }

    const fetchIncome = async () => {
        const { startDate, endDate } = filter
        if (!selectedBranch) {
            let result = []
            let allPromise = []
            listBranch.forEach(async (branch) => {
                allPromise.push(branchApi.getIncomeBranch({
                    branchId: branch.id,
                    startDate,
                    endDate
                }))
            })

            Promise.all(allPromise).then(res => {
                res.forEach((item, index) => {
                    const total = item.reduce((total, item) => {
                        return total + item.income
                    }, 0)
                    result.push({
                        branchName: listBranch[index].name,
                        income: total
                    })
                })
                setListIncome(result)
            }).catch(err => {
                console.log("🚀 ~ err", err)
            })
        } else {
            try {
                const branchName = listBranch.find(branch => branch.id === selectedBranch).name;
                const branchIncome = await branchApi.getIncomeBranch({
                    branchId: selectedBranch,
                    startDate,
                    endDate
                });
                const total = branchIncome.reduce((total, income) => {
                    return total += income.income
                }, 0)
                setListIncome([{ branchName, income: total }])
            } catch (error) {
                console.log("🚀 ~ error", error)
            }
        }
    }

    const fetchListBranch = async () => {
        try {
            const { branches } = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
            })
            setListBranch(branches)
        } catch (error) {
            toast.error('Oops! Something went wrong. Please try again!');
        }
    }

    useEffect(() => {
        fetchListBranch()
    }, [])

    useEffect(() => {
        fetchIncome()
    }, [filter, selectedBranch])

    return (
        <Card>
            <Row gutter={24}>
                <Col span={6}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Space>
                                <RangePicker
                                    disabledDate={disableFutureDate}
                                    value={[
                                        filter.startDate ? moment(filter.startDate, DATE_FORMAT) : '',
                                        filter.endDate ? moment(filter.endDate, DATE_FORMAT) : ''
                                    ]}
                                    onChange={onChangeDate}
                                />
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Select value={selectedBranch} onChange={changeBranch} style={{ width: '100%' }}>
                                <Option value="">All</Option>
                                {
                                    listBranch.map(item => (
                                        <Option value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={18}>
                    <Table dataSource={listIncome} columns={renderColumns()} pagination={false} />
                </Col>
            </Row>
        </Card>
    )
}