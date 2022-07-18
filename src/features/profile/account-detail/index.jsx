import { Button, Col, Form, Input, Row, Upload } from "antd";
import { VALIDATE_IMAGE } from "constants/";
import { FIELD_EMAIL_INVALID, FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";

export function AccountDetail() {
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);

    const beforeUpload = (file) => {
        const isAccept = VALIDATE_IMAGE.accept.includes(file.type);
        const overLimit = file.size / 1024 / 1024 <= 5;
        if (!isAccept || !overLimit) {
            return false;
        }

        return true;
    };

    const onChange = ({ fileList: newFileList }) => {
        if (newFileList.length > 0 && newFileList[0].status === "error") {
            newFileList[0].status = "done";
        }

        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);

                reader.onload = () => resolve(reader.result);
            });
        }

        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onRemove = (file) => {
        console.log("🚀 ~ file", file)

    }

    const onFinish = values => {
        console.log("Received values of form: ", values);
    }

    useEffect(() => {

    }, [])

    return (
        <Row gutter={12}>
            <Col span={6}>
                <p>Avatar</p>
                <Upload
                    key="upload"
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    fileList={fileList}
                    accept="image/png, image/jpeg"
                    maxCount={1}
                    onPreview={onPreview}
                    onChange={onChange}
                    onRemove={onRemove}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </Col>
            <Col span={18}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}>
                    <Form.Item label="Full Name" name="fullName" rules={[
                        { required: true, message: FIELD_REQUIRED }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[
                        { required: true, message: FIELD_REQUIRED },
                        { type: "email", message: FIELD_EMAIL_INVALID }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}