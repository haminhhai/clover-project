import { Avatar, Badge } from "antd"
import img from "assets/images/null-img.png"

export const columnsTopSelling = [
    {
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        width: '10%',
        render: (text, record, index) => (
            <Badge
                count={index + 1}
                style={{
                    color: index < 3 ? '#fff' : '#000',
                    backgroundColor: index < 3 ? '#314659' : 'transparent',
                }} />
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Amount',
        dataIndex: 'quantity',
        key: 'quantity',
    }
]

export const columnsProductOnWH = [
    {
        title: '',
        dataIndex: 'image',
        key: 'image',
        render: (image) => <Avatar src={image ? image : img} />
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
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

export const productsInWareHouse = [
    {
        id: 1,
        name: "Product 1",
        image: "https://via.placeholder.com/150",
        amount: 20,
    },
    {
        id: 2,
        name: "Product 2",
        image: "https://via.placeholder.com/150",
        amount: 19,
    },
    {
        id: 3,
        name: "Product 3",
        image: "https://via.placeholder.com/150",
        amount: 18,
    },
]