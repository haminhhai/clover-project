import { ClusterOutlined, CrownOutlined, DatabaseOutlined, DeleteOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

const commonStyle = {
    fontSize: 18,
    marginRight: 4
}

const renderRoles = {
    1: {
        title: "Branch Manager",
        icon: <ClusterOutlined style={{ ...commonStyle, color: '#ff9f43' }} />
    },
    2: {
        title: "Store Keeper",
        icon: <DatabaseOutlined style={{ ...commonStyle, color: '#28c76f' }} />
    },
    3: {
        title: "Staff",
        icon: <UserOutlined style={{ ...commonStyle, color: '#7367f0' }} />
    }

}

export const renderColumns = ({ openEdit, openDelete }) => [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role, record) => (
            <span>
                {renderRoles[role].icon}
                {renderRoles[role].title}
            </span>
        )
    },
    {
        align: 'right',
        title: 'Action',
        key: 'action',
        render: (content, record) => (
            <>
                <Button
                    key='1'
                    type='primary'
                    icon={<FormOutlined />}
                    onClick={() => openEdit(record)} />
                <Button
                    key='2'
                    style={{ marginLeft: '8px' }}
                    type='danger'
                    icon={<DeleteOutlined />}
                    onClick={() => openDelete(record)} />
            </>
        )
    },
]