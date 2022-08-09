import { ClusterOutlined, CrownOutlined, DatabaseOutlined, DeleteOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

const commonStyle = {
    fontSize: 18,
    marginRight: 4
}

const renderRoles = {
    0: {
        icon: <CrownOutlined style={{ ...commonStyle, color: '#ea5455' }} />,
    },
    1: {
        icon: <ClusterOutlined style={{ ...commonStyle, color: '#ff9f43' }} />
    },
    2: {
        icon: <DatabaseOutlined style={{ ...commonStyle, color: '#28c76f' }} />
    },
    3: {
        icon: <UserOutlined style={{ ...commonStyle, color: '#7367f0' }} />
    }

}

export const renderColumns = ({ listRole, openEdit, openDelete }) => [
    {
        title: '',
        dataIndex: 'image',
        key: 'image',
        render: (image) => <Avatar src={image ? image : undefined} icon={!image && <UserOutlined />} />
    },
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
        dataIndex: 'roleId',
        key: 'roleId',
        render: (roleId, record) => (
            <span>
                {renderRoles?.[roleId]?.icon}
                {listRole?.[roleId]?.name}
            </span>
        )
    },
    {
        align: 'right',
        title: 'Action',
        key: 'action',
        render: (content, record) => (
            record.roleId !== 0 &&
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