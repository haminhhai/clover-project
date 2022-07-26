import { Badge } from "antd"

export const columns = [
    {
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        align: 'center',
        render: (text, record, index) => {
            if (index < 3) {
                return <Badge count={index + 1} style={{ backgroundColor: '#314659' }} />
            }

            return <span>{index + 1}</span>
        }
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    }
]

export const data = [
    {
        id: 1,
        name: "Product 1",
        amount: 20,
    },
    {
        id: 2,
        name: "Product 2",
        amount: 19,
    },
    {
        id: 3,
        name: "Product 3",
        amount: 18,
    },
    {
        id: 4,
        name: "Product 4",
        amount: 17,
    },
    {
        id: 5,
        name: "Product 5",
        amount: 16,
    },
    {
        id: 6,
        name: "Product 6",
        amount: 15,
    },
    {
        id: 7,
        name: "Product 7",
        amount: 14,
    },
    {
        id: 8,
        name: "Product 8",
        amount: 13,
    },
    {
        id: 9,
        name: "Product 9",
        amount: 12,
    },
    {
        id: 10,
        name: "Product 9",
        amount: 11,
    },
]