import { Col, DatePicker, Input, Row, Select, Space } from "antd";
import { useState } from "react";
import { disableFutureDate } from "utils/";

const { Option } = Select;

const { RangePicker } = DatePicker;
export default function Filter() {
    const [type, setType] = useState('date');

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Space>
                    <RangePicker disabledDate={disableFutureDate} />
                </Space>
            </Col>
            <Col span={24}>
                <Select defaultValue="" style={{ width: '100%' }}>
                    <Option value="">All</Option>
                    <Option value="1">Branch 1</Option>
                    <Option value="2">Branch 2</Option>
                </Select>
            </Col>
        </Row>
    )
}