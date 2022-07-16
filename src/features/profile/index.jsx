import { AuditOutlined, LockOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Tabs } from "antd";
import { getUser } from "utils/";

const { TabPane } = Tabs;
export default function ProfileFeature() {
    return (
        <Card>
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <AuditOutlined />
                            {getUser()?.role == 0 ? 'My Account' : "My Profile"}
                        </span>
                    }
                    key="1"
                >
                    Tab 1
                </TabPane>
                {
                    getUser()?.role == 0 &&
                    <TabPane
                        tab={
                            <span>
                                <TeamOutlined />
                                List Account
                            </span>
                        }
                        key="2"
                    >
                        List Account
                    </TabPane>
                }
                {
                    getUser()?.role == 0 &&
                    <TabPane
                        tab={
                            <span>
                                <LockOutlined />
                                Change Password
                            </span>
                        }
                        key="3"
                    >
                        Change Password
                    </TabPane>
                }
            </Tabs>
        </Card>
    )
}