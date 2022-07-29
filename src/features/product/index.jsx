import { ExportOutlined, ImportOutlined, RiseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { getUser } from "utils/";
import BestSelling from "./best-selling";
import Export from "./export";
import Import from "./import";
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
        </Tabs>
    );
}