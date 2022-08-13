import { Col, Input, Row, Select } from "antd";

export default function Filter({ filter, onChange }) {

    const onChangeName = (e) => {
        onChange({ ...filter, name: e.target.value });
    }

    const onChangeStatus = (value) => {
        onChange({ ...filter, active: value });
    }

    return (
        <Row gutter={24}>
            <Col>
                <Row>
                    <Col span={24}>
                        <label>
                            Name
                        </label>
                    </Col>
                    <Col span={24}>
                        <Input value={filter.name} onChange={onChangeName} />
                    </Col>
                </Row>

            </Col>
            <Col>
                <Row>
                    <Col span={24}>
                        <label>
                            Status
                        </label>
                    </Col>
                    <Col span={24}>
                        <Select value={filter.active} onChange={onChangeStatus} style={{ width: '100%' }}>
                            <Select.Option value="">All</Select.Option>
                            <Select.Option value="0">Active</Select.Option>
                            <Select.Option value="1">Deactive</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}