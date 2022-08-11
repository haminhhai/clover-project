import { Col, Input, InputNumber, Row, Select } from "antd";

export default function Filter({ listCategory, filter, onChangeFilter }) {
    const onChangeName = (e) => {
        onChangeFilter({ ...filter, name: e.target.value });
    }

    const onChangeSize = (value) => {
        onChangeFilter({ ...filter, size: value });
    }

    const onChangeCategory = (value) => {
        onChangeFilter({ ...filter, category: value });
    }

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
                        <Input value={filter.name} onChange={onChangeName} />
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
                        <InputNumber value={filter.size} onChange={onChangeSize} style={{ width: '100%' }} />
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
                        <Select value={filter.category} onChange={onChangeCategory} style={{ width: '100%' }} >
                            <Select.Option value="">All</Select.Option>
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