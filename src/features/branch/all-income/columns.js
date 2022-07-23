import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Badge, Button, Space } from "antd"
import { formatVND } from "utils/"

const style = {
    fontSize: 20,
    cursor: "pointer"
}

export const data = [
    {
        key: '1',
        branchName: 'Branch 1',
        income: 0
    },
    {
        key: '2',
        branchName: 'Branch 2',
        income: 0
    }

]
export const renderColumns = () => ([
    {
        title: 'Name',
        dataIndex: 'branchName',
        key: 'branchName',
    },
    {
        title: 'Income',
        dataIndex: 'income',
        key: 'income',
        render: (income) => formatVND(income)
    },
])