import { Avatar, Button, Col, Form, Image, Input, Row, Table, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import imageApi from "api/imgService";
import classNames from "classnames/bind";
import { VALIDATE_IMAGE } from "constants/";
import { FIELD_EMAIL_INVALID, FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "utils/";
import style from "./index.module.scss";
import img from 'assets/images/null-img.png'
import { ROLE_OPTIONS } from "constants/";
import { columns } from "./columns";
import { getUrlImage } from "utils/";
import accountApi from "api/account";
import { CLOVER_USER } from "constants/";

const cx = classNames.bind(style);

export function AccountDetail() {
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);
    const [imageProfile, setImageProfile] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const toggleMode = () => {
        if (!isEdit) {
            if (imageProfile.url) setFileList([imageProfile]);
            else setFileList([])
            form.setFieldsValue({
                email: getUser().email,
                fullName: getUser().fullName,
            })
        }
        setIsEdit(!isEdit);
    }

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

    const cancelSubmit = () => {
        setFileList([])
        setIsEdit(false);
    }

    const onFinish = async (values) => {
        let userInfo = {
            ...getUser(),
            ...values,
        }
        try {
            // check image exist
            if (imageProfile.url) {
                if (fileList.length === 0) {
                    await imageApi.deleteImgProfile(imageProfile.id);
                    userInfo.image = '';
                    setImageProfile(null)
                }
                else {
                    if (!fileList[0].url) {
                        let url = await getUrlImage(fileList);
                        const body = {
                            ...imageProfile,
                            ...fileList[0],
                            url,
                        }
                        await imageApi.updateImageProfile(imageProfile.id, body)
                        setImageProfile(body)
                        userInfo.image = imageProfile.id;
                    }
                }
                delete userInfo.roleName;
                delete userInfo.roleId;
                delete userInfo.idBranch;
                await accountApi.editAccount({
                    ...userInfo,
                    role: getUser().roleId,
                });
            } else {
                if (fileList.length > 0) {
                    let url = await getUrlImage(fileList);
                    const body = {
                        ...fileList[0],
                        url,
                    }
                    const resp = await imageApi.addImgProfile(body)
                    userInfo.image = resp.id;
                    setImageProfile(resp)
                }
                delete userInfo.roleName;
                delete userInfo.roleId;
                delete userInfo.idBranch;
                await accountApi.editAccount({
                    ...userInfo,
                    role: getUser().roleId,
                });
            }
            setFileList([])
            setIsEdit(false)
            localStorage.setItem(CLOVER_USER, JSON.stringify(userInfo));
            toast.success("Update account success");
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchImageProfile = async () => {
        const response = await imageApi.getImgProfile(getUser().image);
        if (response?.id) {
            setImageProfile(response);
        }
    }

    useEffect(() => {
        fetchImageProfile()
        setUserInfo([
            {
                key: getUser()?.fullName,
                label: 'Fullname',
                value: getUser()?.fullName
            },
            {
                key: getUser()?.username,
                label: 'Username',
                value: getUser()?.username
            },
            {
                key: getUser()?.email,
                label: 'Email',
                value: getUser()?.email
            },
            {
                key: getUser()?.name,
                label: 'Role',
                value: ROLE_OPTIONS[getUser()?.roleId].name
            },
        ])
    }, [])

    return (
        <Row gutter={12} className={cx('container')}>
            <Col span={6}>
                <p>Avatar</p>
                {
                    !isEdit ?
                        <Image
                            width={102}
                            height={102}
                            preview={imageProfile?.url}
                            src={imageProfile?.url ? imageProfile.url : img}
                        /> :
                        <>
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
                        </>
                }
            </Col>
            <Col span={!isEdit ? 8 : 18}>
                {
                    isEdit ?
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
                                    Save
                                </Button>
                                <Button danger className={cx('cancel-btn')} onClick={cancelSubmit}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form> :
                        <div className={cx('table')}>
                            <Table dataSource={userInfo} columns={columns} pagination={false} />
                        </div>
                }
            </Col>
            <Col span={24}>
                {
                    !isEdit && <Button className={cx('img-btn')} onClick={toggleMode}>
                        Update Information
                    </Button>
                }
            </Col>
        </Row>
    )
}