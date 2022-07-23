import { Col, Input, InputNumber, Row, Select } from "antd";
import { InputCurrency } from "components";

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
                            Price
                        </label>
                    </Col>
                    <Col span={24}>
                        <InputCurrency />
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row>
                    <Col span={24}>
                        <label>
                            Quantity
                        </label>
                    </Col>
                    <Col span={24}>
                        <InputNumber style={{ width: '100%' }} />
                    </Col>
                </Row>

            </Col>
            <Col>
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
            <Col>
                <Row>
                    <Col span={24}>
                        <label>
                            Position
                        </label>
                    </Col>
                    <Col span={24}>
                        <Input />
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}