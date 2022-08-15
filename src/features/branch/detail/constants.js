import { AlertOutlined, EnvironmentOutlined, EyeOutlined, PhoneOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { formatVND } from "utils/"

const listIcon = {
    address: <EnvironmentOutlined />,
    phone: <PhoneOutlined />,
    manager: <UserOutlined />,
    status: <AlertOutlined />,
    income: <PieChartOutlined />
}

export const dataIncome = [
    {
        date: '2020-01-01',
        income: 0,
    },
    {
        date: '2020-01-02',
        income: 100000,
    },
    {
        date: '2020-01-03',
        income: -20000,
    },
    {
        date: '2020-01-04',
        income: 40000,
    },
    {
        date: '2020-01-05',
        income: 300000,
    },
]

const render = (value, record) => {
    console.log("🚀 ~ value", value)
    switch (record.label.toLowerCase()) {
        case 'status':
            return <Badge status={value ? 'processing' : 'default'} text={value ? 'Active' : 'Deactive'} />;
        case 'income':
            return formatVND(value);
        default:
            return value;
    }
}

export const columns = [
    {
        title: '',
        dataIndex: 'label',
        key: 'label',
        width: '40%',
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
        render
    },
]

export const incomeConfig = {
    xField: 'date',
    yField: 'income',
    xAxis: {
        range: [0, 1],
        tickCount: 5,
    },
    areaStyle: () => {
        return {
            fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        };
    },
};