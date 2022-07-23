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
        <Space>
            <Select value={type} onChange={setType}>
                <Option value="date">Date</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
            </Select>
            <PickerWithType type={type} onChange={(value) => console.log(value)} />
        </Space>
    )
}