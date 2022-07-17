import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import classnames from "classnames/bind";
import { formatVND } from "utils/common";
import style from "./index.module.scss";

const cx = classnames.bind(style);
export function Currency({ value, type, isIcon = true }) {
    const renderIcon = () => {
        if (!isIcon) return

        return type ? <PlusOutlined /> : <MinusOutlined />
    }

    return (
        <div className={cx(!type ? 'expense' : 'income', 'wrapper')}>
            { renderIcon() }
            {formatVND(value)}
        </div>
    )
}