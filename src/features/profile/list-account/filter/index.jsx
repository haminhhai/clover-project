import { Col, Input, Row, Select } from "antd"
import classNames from "classnames/bind"
import { ROLE_OPTIONS } from "constants/"
import { debounce } from "lodash"
import style from "./index.module.scss"

const cx = classNames.bind(style)
const { Option } = Select

export default function Filter({ filter, onChange }) {

    const onChangeInput = debounce((value, field) => {
        onChange({
            ...filter,
            [field]: value
        })
        console.log(value, field);
    }, 500)

    const onChangeRole = (value) => {
        onChange({
            ...filter,
            role: value
        })
    }

    return (
        <Row gutter={16} className={cx('container')}>
            <Col span={6}>
                <Row gutter={8} className={cx('col-filter')}>
                    <Col span={24}>Username</Col>
                    <Col span={24}>
                        <Input onChange={(e) => onChangeInput(e.target.value, 'username')} />
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Row gutter={8} className={cx('col-filter')}>
                    <Col span={24}>
                        Full Name
                    </Col>
                    <Col span={24}>
                        <Input onChange={(e) => onChangeInput(e.target.value, 'fullName')} />
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Row gutter={8} className={cx('col-filter')}>
                    <Col span={24}>
                        Email
                    </Col>
                    <Col span={24}>
                        <Input onChange={(e) => onChangeInput(e.target.value, 'email')} />
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Row gutter={8} className={cx('col-filter')}>
                    <Col span={24}>Role</Col>
                    <Col span={24}>
                        <Select defaultValue={''} onChange={onChangeRole}>
                            <Option value={''}>All</Option>
                            {ROLE_OPTIONS.map(option => (
                                option.id !== 0 && <Option key={option.id} value={option.id}>
                                    {option.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}