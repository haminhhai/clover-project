import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Badge, Button, Space } from "antd"

const style = {
    fontSize: 20,
    cursor: "pointer"
}

export const data = [
    {
        key: '1',
        branchName: 'Branch 1',
        address: 'Address 1',
        phone: '0123456789',
        managerId: 1,
        fullName: 'Full Name 1',
        active: 0
    },
    {
        key: '2',
        branchName: 'Branch 2',
        address: 'Address 2',
        phone: '0123456789',
        managerId: 2,
        fullName: 'Full Name 2',
        active: 1
    }

]
export const renderColumns = (goDetail, openEdit) => ([
    {
        title: 'Name',
        dataIndex: 'branchName',
        key: 'branchName',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Manager',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render: (active) => {
            return <Badge
                status={active == 0 ? 'processing' : 'default'}
                text={active == 0 ? 'Active' : 'Inactive'} />
        }
    },
    {
        align: 'right',
        title: 'Action',
        key: 'action',
        render: (content, record) => (
            <Space>
                <EyeOutlined onClick={() => goDetail(record)} style={style} />
                <EditOutlined onClick={() => openEdit(record)} style={style} />
            </Space>
        )
    },
])