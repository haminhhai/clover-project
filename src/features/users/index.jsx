import { Table, Navbar, Sidebar } from "components"
import { Outlet } from 'react-router-dom'

import "./index.scss"

const UserFeature = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Table title="Add new Users" />
            </div>
            <Outlet />
        </div>
    )
}

export default UserFeature