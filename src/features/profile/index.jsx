import { AuditOutlined, LockOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Tabs } from "antd";
import { getUser } from "utils/";
import { AccountDetail } from "./account-detail";
import { ChangePassword } from "./change-password";
import ListAccount from "./list-account";

const { TabPane } = Tabs;
export default function ProfileFeature() {
    return (
        <Card>
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <AuditOutlined />
                            {getUser()?.roleId == 0 ? 'My Account' : "My Profile"}
                        </span>
                    }
                    key="1"
                >
                    <AccountDetail />
                </TabPane>
                {
                    getUser()?.roleId == 0 &&
                    <TabPane
                        tab={
                            <span>
                                <LockOutlined />
                                Change Password
                            </span>
                        }
                        key="3"
                    >
                        <ChangePassword />
                    </TabPane>
                }
            </Tabs>
        </Card>
    )
}