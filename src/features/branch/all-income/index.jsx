import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table } from "antd";
import classNames from "classnames/bind";
import { data, renderColumns } from "./columns";
import Filter from "./filter";
import style from "./index.module.scss";

const cx = classNames.bind(style);

export default function AllIncome() {
    return (
        <Card>
            <Row>
                <Col span={6}>
                    <Filter />
                </Col>
                <Col span={18}>
                    <Table dataSource={data} columns={renderColumns()} pagination={false} />
                </Col>
            </Row>
        </Card>
    )
}