import { PlusCircleFilled, StopFilled } from '@ant-design/icons'
import { Button, Card, Col, Row, Table, Tag } from 'antd'
import accountApi from 'api/account'
import branchApi from 'api/branch'
import productApi from 'api/product'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { getUser } from 'utils/'
import { formatVND } from 'utils/'
import { columnsTopSelling, data } from './columns'

import style from "./index.module.scss"
import ModalProduct from './ModalProduct'

const listPosition = [
    {
        id: 1,
        name: "A1",
        isFull: false,
    },
    {
        id: 2,
        name: "A2",
        isFull: false,
    },
    {
        id: 3,
        name: "A3",
        isFull: true,
    },
    {
        id: 4,
        name: "A4",
        isFull: false,
    },
    {
        id: 5,
        name: "A5",
        isFull: true,
    },
    {
        id: 6,
        name: "A6",
        isFull: true,
    },
    {
        id: 7,
        name: "A7",
        isFull: false,
    }
]

const cx = classNames.bind(style)

const DashboardFeature = () => {
    const [totalBranch, setTotalBranch] = useState(0)
    const [totalAccount, setTotalAccount] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [topSelling, setTopSelling] = useState([])

    const openModal = (selected) => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const renderIcon = (position) => {
        if (position.isFull) {
            return <Button onClick={openModal} icon={<StopFilled style={{ color: 'red' }} />} />
        }
        return <Button icon={<PlusCircleFilled style={{ color: 'green' }} />} />
    }

    const fetchBranch = async () => {
        try {
            const listActive = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
            });
            const listInActive = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
                active: false,
            });
            setTotalBranch(listActive.total + listInActive.total)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAccount = async () => {
        try {
            const { total } = await accountApi.getAll({
                pageIndex: 0,
                pageSize: 100,
            })
            setTotalAccount(total)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTopSelling = async () => {
        try {
            const list = await productApi.getBestSelling({});
            setTopSelling(list)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBranch();
        fetchAccount();
        fetchTopSelling();
    }, [])

    return (
        <Row gutter={[16, 16]}>
            {
                getUser()?.roleId === 0 &&
                <>
                    <Col span={8}>
                        <Card hoverable title="User" >
                            <h2>{totalAccount}</h2>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable title="Branch" >
                            <h2>{totalBranch}</h2>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable title="Order" >
                            <h2>{formatVND(200000)}</h2>
                        </Card>
                    </Col>
                </>
            }
            {
                getUser()?.roleId !== 2 &&
                <Col span={getUser()?.roleId === 0 ? 24 : 12}>
                    <Card hoverable title="Top 10 Best Selling" className={cx('scroll')}>
                        <Table dataSource={topSelling} columns={columnsTopSelling} pagination={false} />
                    </Card>
                </Col>
            }
            {
                getUser()?.roleId !== 0 &&
                <Col span={getUser()?.roleId === 2 ? 24 : 12}>
                    <Card hoverable title={`${getUser()?.roleId === 1 ? 'Branch' : 'Warehouse'}'s status`} className={cx('scroll')}>
                        <Row gutter={[16, 16]}>
                            {listPosition.map((item, index) => (
                                <Col span={getUser()?.roleId === 2 ? 2 : 4} key={index} className={cx('wrapper')}>
                                    <span className={cx('name')}>{item.name}</span>
                                    {renderIcon(item)}
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>
            }
            <ModalProduct show={showModal} onClose={closeModal} />
        </Row>
    )
}

export default DashboardFeature