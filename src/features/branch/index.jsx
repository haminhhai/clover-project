import { LineChartOutlined, PartitionOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { getUser } from "utils/";
import AllIncome from "./all-income";
import ManageBranch from "./manage-branch";

const { TabPane } = Tabs;
export function BranchFeature() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane
                tab={
                    <span>
                        <PartitionOutlined />
                        List Branch
                    </span>
                }
                key="1"
            >
                <ManageBranch />
            </TabPane>
            {
                getUser().roleId === 0 &&
                <TabPane
                    tab={
                        <span>
                            <LineChartOutlined />
                            Income All Branch
                        </span>
                    }
                    key="2"
                >
                    <AllIncome />
                </TabPane>
            }
        </Tabs>
    )
}