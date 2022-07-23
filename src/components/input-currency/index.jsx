import { InputNumber } from "antd"

export default function InputCurrency({ ...rest }) {
    return (
        <InputNumber
            addonAfter="VND"
            formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            {...rest} />
    )
}