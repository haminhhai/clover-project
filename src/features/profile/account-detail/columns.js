import { EyeOutlined, MailOutlined, PartitionOutlined, UserOutlined } from "@ant-design/icons"

const listIcon = {
    fullname: <EyeOutlined />,
    username: <UserOutlined />,
    email: <MailOutlined />,
    role: <PartitionOutlined />
}

export const columns = [
    {
        title: '',
        dataIndex: 'label',
        key: 'label',
        width: '20',
        render: (label, record) => {
            return (
                <div>
                    {listIcon[label.toLowerCase()]}
                    <span style={{ marginLeft: 8 }}>{label}</span>
                </div>
            )
        }
    },
    {
        title: '',
        dataIndex: 'value',
        key: 'value',
    },
]