/**************************************************************************/
/*  ProductForm.js                                                        */
/**************************************************************************/
/*                       Tệp này là một phần của:                         */
/*                             Open CDP                                   */
/*                        https://flast.vn                                */
/**************************************************************************/
/* Bản quyền (c) 2025 - này thuộc về các cộng tác viên Flast Solution     */
/* (xem AUTHORS.md).                                                      */
/* Bản quyền (c) 2024-2025 Long Huu, Quang Duc, Hung Bui                  */
/*                                                                        */
/* Bạn được quyền sử dụng phần mềm này miễn phí cho bất kỳ mục đích nào,  */
/* bao gồm sao chép, sửa đổi, phân phối, bán lại…                         */
/*                                                                        */
/* Chỉ cần giữ nguyên thông tin bản quyền và nội dung giấy phép này trong */
/* các bản sao.                                                           */
/*                                                                        */
/* Đội ngũ phát triển mong rằng phần mềm được sử dụng đúng mục đích và    */
/* có trách nghiệm                                                        */
/**************************************************************************/

import { Col, Form, Row, Select } from 'antd'
import CustomButton from 'components/CustomButton'
import FormHidden from 'components/form/FormHidden'
import FormInput from 'components/form/FormInput'
import React from 'react'

const ProductForm = ({ data, listProFile }) => {

    return (
        <div>
            <Row gutter={16} style={{ marginTop: 20 }}>
                <FormHidden name={'id'} />
                <Col md={24} xs={12}>
                    <FormInput
                        required
                        label="Họ tên"
                        name="fullName"
                        placeholder={"Nhập họ tên"}
                    />
                </Col>
                <Col md={12} xs={12}>
                    <FormInput
                        required
                        label="Số điện thoại"
                        name="phone"
                        placeholder={"Số điện thoại"}
                    />
                </Col>
                <Col md={12} xs={12}>
                    <FormInput
                        required
                        label="Email"
                        name="email"
                        placeholder={"Số điện thoại"}
                    />
                </Col>
                <Col md={12} xs={12}>
                    <FormInput
                        required
                        label="Tên tài khoản"
                        name="ssoId"
                        placeholder={"Tên tài khoản"}
                    />
                </Col>
                <Col md={12} xs={12}>
                    <FormInput
                        required
                        label="Mật khẩu"
                        name="password"
                        placeholder={"Mật khẩu"}
                    />
                </Col>
                <Col md={12} xs={12}>
                    {/* <FormInput
                        required
                        label="Trạng thái"
                        name="status"
                        placeholder={"Trạng thái"}
                    /> */}
                    <Form.Item label="Trạng thái" name="status">
                        <Select placeholder="Trạng thái">
                            <Select.Option value={1}>
                                Hoạt động
                            </Select.Option>
                            <Select.Option value={2}>
                                Ngừng hoạt động
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                    <Form.Item label={"Role user"} name="userProfiles">
                        <Select mode="multiple" placeholder="Chọn Role">
                            {listProFile?.map((item, i) => {
                                return (
                                    <Select.Option key={i} value={item.id}>
                                        {item.type}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={24} xs={12}>
                    <FormInput
                        required
                        label="Loại dạng"
                        name="layout"
                        placeholder={"Loại dạng"}
                    />
                </Col>
                <Col md={24} xs={24}>
                    <div style={{ display: 'flex', marginBottom: 20, justifyContent: 'end' }}>
                        <CustomButton
                            htmlType="submit"
                            title="Hoàn thành"
                            color="danger"
                            variant="solid"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductForm
