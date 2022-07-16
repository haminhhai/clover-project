import { Sidebar, Navbar, Chart } from "components/index"

import "./index.scss"
const DetailUser = () => {
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img
                                src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-9/125275520_1719515868212827_4422932026094200156_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=-1Qe6lbvKCIAX-5r6uR&_nc_ht=scontent.fhan3-2.fna&oh=00_AT8rGUb0pT-K1K6Eff4wmMwdVn8QTuH7aN5phfEauGZK2w&oe=62E6BBA5"
                                alt=""
                                className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">Hoang Minh</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">nngocminh30920@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">0379965926</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">Ha Noi</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">Viet Nam</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
                    </div>
                </div>
                <div className="bottom">

                </div>
            </div>
        </div>
    )
}

export default DetailUser