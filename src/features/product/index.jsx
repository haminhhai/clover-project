import { ExportOutlined, ImportOutlined, InboxOutlined, RiseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { getUser } from "utils/";
import BestSelling from "./best-selling";
import Export from "./export";
import Import from "./import";
import Inventory from "./inventory";
import ListProduct from "./list-product";

const { TabPane } = Tabs;
export default function ProductFeature() {
    return (
        <Tabs defaultActiveKey="1">
            {
                getUser()?.roleId === 0 &&
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
            }
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
            {
                getUser()?.roleId !== 0 &&
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
            }
            {
                getUser()?.roleId === 2 &&
                <>
                    <TabPane
                        tab={
                            <span>
                                <ImportOutlined />
                                Import Product
                            </span>
                        }
                        key="4"
                    >
                        <Import />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <ExportOutlined />
                                Export Product
                            </span>
                        }
                        key="5"
                    >
                        <Export />
                    </TabPane>
                </>
            }
        </Tabs>
    );
}