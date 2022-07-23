import { InboxOutlined, RiseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import BestSelling from "./best-selling";
import Inventory from "./inventory";
import ListProduct from "./list-product";

const { TabPane } = Tabs;
export default function ProductFeature() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane
                tab={
                    <span>
                        <RiseOutlined />
                        Best Selling Product
                    </span>
                }
                key="1"
            >
                <BestSelling />
            </TabPane>
            <TabPane
                tab={
                    <span>
                        <ShoppingOutlined />
                        Product
                    </span>
                }
                key="2"
            >
                <ListProduct />
            </TabPane>
            <TabPane
                tab={
                    <span>
                        <InboxOutlined />
                        Inventory Product
                    </span>
                }
                key="3"
            >
                <Inventory />
            </TabPane>
        </Tabs>
    );
}