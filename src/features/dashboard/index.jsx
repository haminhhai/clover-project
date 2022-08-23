import { PlusCircleFilled, StopFilled } from '@ant-design/icons'
import { Button, Card, Col, Row, Table } from 'antd'
import accountApi from 'api/account'
import branchApi from 'api/branch'
import positionApi from 'api/position'
import productApi from 'api/product'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { getUser } from 'utils/'
import { formatVND } from 'utils/'
import { columnsTopSelling } from './columns'

import style from "./index.module.scss"
import ModalProduct from './ModalProduct'


const cx = classNames.bind(style)

const DashboardFeature = () => {
    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingBranch, setLoadingBranch] = useState(true)
    const [loadingBestSelling, setLoadingBestSelling] = useState(true)
    const [totalBranch, setTotalBranch] = useState(0)
    const [totalAccount, setTotalAccount] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [topSelling, setTopSelling] = useState([])
    const [listPosition, setListPosition] = useState([])

    const openModal = (selected) => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const renderIcon = (position) => {
        if (position.status) {
            return <Button icon={<StopFilled style={{ color: 'red' }} />} />
        }
        return <Button icon={<PlusCircleFilled style={{ color: 'green' }} />} />
    }

    const fetchBranch = async () => {
        try {
            setLoadingBranch(true)
            const list = await branchApi.getPaging({
                pageIndex: 0,
                pageSize: 100,
            });
            setTotalBranch(list.total);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingBranch(false)
        }
    }

    const fetchAccount = async () => {
        try {
            setLoadingUser(true)
            const { total } = await accountApi.getAll({
                pageIndex: 0,
                pageSize: 100,
            })
            setTotalAccount(total)
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingUser(false)
        }
    }

    const fetchTopSelling = async () => {
        try {
            setLoadingBestSelling(true)
            const list = await productApi.getBestSelling({});
            setTopSelling(list)
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingBestSelling(false)
        }
    }

    const fetchOrder = async () => {
        try {
            const total = await productApi.getOrder()
            setTotalOrder(total)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPosition = async () => {
        try {
            const list = getUser()?.roleId == 1 ? await positionApi.getBranch(getUser()?.idBranch) : await positionApi.getWarehouse()
            setListPosition(list)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBranch();
        fetchAccount();
        fetchTopSelling();
        fetchPosition()
        fetchOrder()
    }, [])

    return (
        <Row gutter={[16, 16]}>
            {
                getUser()?.roleId === 0 &&
                <>
                    <Col span={8}>
                        <Card hoverable title="User" loading={loadingUser}>
                            <h2>{totalAccount}</h2>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable title="Branch" loading={loadingBranch}>
                            <h2>{totalBranch}</h2>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable title="Order" >
                            <h2>{formatVND(parseInt(totalOrder))}</h2>
                        </Card>
                    </Col>
                </>
            }
            {
                getUser()?.roleId !== 0 &&
                <Col span={24}>
                    <Card hoverable title={`${getUser()?.roleId === 1 ? 'Branch' : 'Warehouse'}'s status`} className={cx('scroll')}>
                        <Row gutter={[16, 16]}>
                            {listPosition.map((item, index) => {
                                if (index !== 0 && (index + 1) % 10 === 0) {
                                    return (
                                        <>
                                            <Col span={2} key={index} className={cx('wrapper')}>
                                                <span className={cx('name')}>{item.name}</span>
                                                {renderIcon(item)}
                                            </Col>
                                            <Col span={4}>
                                                { }
                                            </Col>
                                        </>
                                    )
                                }

                                return (
                                    <Col span={2} key={index} className={cx('wrapper')}>
                                        <span className={cx('name')}>{item.name}</span>
                                        {renderIcon(item)}
                                    </Col>
                                )
                            })}
                        </Row>
                    </Card>
                </Col>
            }
            {
                getUser()?.roleId !== 2 &&
                <Col span={24}>
                    <Card hoverable title="Top 10 Best Selling" className={cx('scroll')} loading={loadingBestSelling}>
                        <Table dataSource={topSelling} columns={columnsTopSelling} pagination={false} />
                    </Card>
                </Col>
            }
            <ModalProduct show={showModal} onClose={closeModal} />
        </Row>
    )
}

export default DashboardFeature