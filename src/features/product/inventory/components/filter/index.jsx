import { Col, Input, InputNumber, Row, Select } from "antd";

export default function Filter({ listCategory }) {
    return (
        <Row gutter={24}>
            <Col span={8}>
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
            <Col span={8}>
                <Row>
                    <Col span={24}>
                        <label>
                            Size
                        </label>
                    </Col>
                    <Col span={24}>
                        <InputNumber style={{ width: '100%' }} />
                    </Col>
                </Row>

            </Col>
            <Col span={8}>
                <Row>
                    <Col span={24}>
                        <label>
                            Category
                        </label>
                    </Col>
                    <Col span={24}>
                        <Select style={{ width: '100%' }} >
                            {listCategory.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}