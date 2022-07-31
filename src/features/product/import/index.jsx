import { Col, Row, Select } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import ImportExcel from "./excel";
import style from "./index.module.scss";
import Manually from "./manually";

const cx = classNames.bind(style)

export default function Import() {

    const [typeImport, setTypeImport] = useState('1');

    const onChangeType = (value) => {
        setTypeImport(value);
    }

    return (
        <Row gutter={16}>
            <Col span={4}>
                <Select value={typeImport} style={{ width: '100%' }} onChange={onChangeType}>
                    <Select.Option value='1'>Import Manually</Select.Option>
                    <Select.Option value='2'>Import By Excel</Select.Option>
                </Select>
            </Col>
            <Col span={20}>
                {typeImport === '1' ? <Manually /> : <ImportExcel />}
            </Col>

        </Row>
    );
}