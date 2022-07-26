import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'
import { Card, Col, Row, Table, Tag } from 'antd'
import React from 'react'
import { formatVND } from 'utils/'
import { columns, data } from './columns'

import style from "./index.module.scss"

const DashboardFeature = () => {

    const Extra = ({ percent, isIncrease }) => {
        return isIncrease ?
            <Tag icon={<CaretUpFilled />} color="success">
                {percent}%
            </Tag> :
            <Tag icon={<CaretDownFilled />} color="error">
                {percent}%
            </Tag>
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Card hoverable title="User" >
                    <h2>100</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable title="Brand" >
                    <h2>50</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable title="Order" >
                    <h2>{formatVND(200000)}</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable title="Top 10 Best Selling">
                    <Table dataSource={data} columns={columns} pagination={false} />
                </Card>
            </Col>
        </Row>
    )
}

export default DashboardFeature