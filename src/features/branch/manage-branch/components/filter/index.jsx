import { Col, Input, Row, Select } from "antd";

export default function Filter() {
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
                        <Input />
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
                        <Select style={{ width: '100%' }}>
                            <Select.Option value="0">Active</Select.Option>
                            <Select.Option value="1">Inactive</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}