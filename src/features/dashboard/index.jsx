import { PlusCircleFilled, StopFilled } from '@ant-design/icons'
import { Card, Col, Row, Table, Tag } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import { formatVND } from 'utils/'
import { columns, data } from './columns'

import style from "./index.module.scss"

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
    }
]

const cx = classNames.bind(style)

const DashboardFeature = () => {
    const renderIcon = (position) => {
        if (position.isFull) {
            return <StopFilled style={{ color: 'red' }} />
        }
        return <PlusCircleFilled style={{ color: 'green' }} />
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Card hoverable title="User" >
                    <h2>100</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable title="Branch" >
                    <h2>50</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable title="Order" >
                    <h2>{formatVND(200000)}</h2>
                </Card>
            </Col>
            <Col span={12}>
                <Card hoverable title="Top 10 Best Selling" className={cx('scroll')}>
                    <Table dataSource={data} columns={columns} pagination={false} />
                </Card>
            </Col>
            <Col span={12}>
                <Card hoverable title="Warehouse's status" className={cx('scroll')}>
                    <Row gutter={[16, 16]}>
                        {listPosition.map((item, index) => (
                            <Col span={4} key={index} className={cx('wrapper')}>
                                <span className={cx('name')}>{item.name}</span>
                                {renderIcon(item)}
                            </Col>
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default DashboardFeature