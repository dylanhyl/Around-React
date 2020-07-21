import React, {Component} from 'react';
import {Button, Form, Input, message} from "antd";
import { Link } from 'react-router-dom';
import {API_ROOT} from "../constants";

class NormalLoginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                fetch(`${API_ROOT}/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password
                    })
                }).then((response) => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error(response.statusText);
                }).then((data) => {
                    console.log('====', data);
                    this.props.handleLoginSucceed(data);
                    message.success('Login succeed!');
                }).catch((err) => {
                    console.log(err);
                    message.error('Login failed.');
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        }

        return (
            <Form onSubmit={this.handleSubmit} className={"login-form"} {...formItemLayout}>
                <Form.Item label="Username">
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password',
                        {
                            rules: [{required: true, message: 'Please input your password!'}],
                        }
                    )(
                        <Input.Password />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;