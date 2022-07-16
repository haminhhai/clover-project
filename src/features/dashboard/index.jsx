import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'
import { Card, Col, Row, Tag } from 'antd'
import React from 'react'
import { formatVND } from 'utils/'

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
        <Row gutter={16}>
            <Col span={8}>
                <Card hoverable title="User" extra={<Extra percent={20} isIncrease />}>
                    <h2>100</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable title="Brand" extra={<Extra percent={10} />}>
                    <h2>50</h2>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable title="Order" extra={<Extra percent={8} />}>
                    <h2>{formatVND(200000)}</h2>
                </Card>
            </Col>
        </Row>
    )
}

export default DashboardFeature