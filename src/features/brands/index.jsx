import { Card, Col, Menu, Row } from "antd";

export function BrandFeature() {
    return (
        <Card>
            <Row>
                <Col span={6}>
                    <Menu mode="inline" defaultSelectedKeys={['1']}>

                    </Menu>
                </Col>
            </Row>
        </Card>
    )
}