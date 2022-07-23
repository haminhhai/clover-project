import { Card, Divider } from "antd";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import LazyLoad from "react-lazyload";
import { formatVND } from "utils/";

const cx = classNames.bind(styles);
const { Meta } = Card;
export default function CardProduct({ product, ...rest }) {
    return (
        <Card
            className={cx("card-product")}
            cover={
                <LazyLoad once>
                    <img alt="blog-img" src={product.url} />
                </LazyLoad>
            }
            hoverable
            {...rest}>
            <div className={cx('content')}>
                <h3>{product.productName}</h3>
                <h2>{formatVND(product.productPrice)}</h2>
                {/* <Divider />
                <div className={cx('footer')}>
                    <div className={cx('item-group')}>
                        <span className={cx('item-title')}>Quantity</span>
                        <span className={cx('item-value')}>{product.quantity}</span>
                    </div>
                    <div className={cx('item-group')}>
                        <span className={cx('item-title')}>Size</span>
                        <span className={cx('item-value')}>{product.size}</span>
                    </div>
                    <div className={cx('item-group')}>
                        <span className={cx('item-title')}>Position</span>
                        <span className={cx('item-value')}>{product.position}</span>
                    </div>
                </div> */}
            </div>
        </Card>
    )
}