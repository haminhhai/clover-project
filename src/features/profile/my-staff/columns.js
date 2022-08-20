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

export const renderColumns = ({ listRole }) => [
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
        dataIndex: 'role',
        key: 'role',
        render: (roleId, record) => (
            <span>
                {renderRoles?.[roleId]?.icon}
                {listRole?.[roleId]?.name}
            </span>
        )
    },
]