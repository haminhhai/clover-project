import { DatePicker } from 'antd'
import classNames from 'classnames/bind'
import style from './index.module.scss'

const cx = classNames.bind(style)

export default function RCDatePicker({ children, ...props }) {
    return <DatePicker className={cx('date-picker')} {...props} />
}