import React from 'react'
import { Chart, Featured, Widget, Sidebar, Navbar } from 'components'

import "./index.scss"

const DashboardFeature = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className='widgets'>
                    <Widget type="user" />
                    <Widget type="brand" />
                    <Widget type="order" />
                    <Widget type="balance" />
                </div>
                <div className='charts'>
                    <Featured />
                    <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
                </div>
                <div className='listContainer'>
                    <div className='listTitle'></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardFeature