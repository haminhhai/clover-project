import { Col, DatePicker, Input, Row, Select, Space } from "antd";
import { useState } from "react";

const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};
export default function Filter() {
    const [type, setType] = useState('date');

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Space>
                    <Select value={type} onChange={setType}>
                        <Option value="date">Date</Option>
                        <Option value="month">Month</Option>
                        <Option value="year">Year</Option>
                    </Select>
                    <PickerWithType type={type} onChange={(value) => console.log(value)} />
                </Space>
            </Col>
            <Col span={24}>
                <Select defaultValue="" style={{ width: '90%' }}>
                    <Option value="">All</Option>
                    <Option value="1">Branch 1</Option>
                    <Option value="2">Branch 2</Option>
                </Select>
            </Col>
        </Row>
    )
}