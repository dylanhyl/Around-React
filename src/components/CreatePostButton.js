import React, {Component} from 'react';
import { Modal, Button } from 'antd';
import CreatePostForm from "./CreatePostForm";
import {API_ROOT, AUTH_HEADER, POS_KEY, TOKEN_KEY} from "../constants";
import * as message from "antd";

class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        this.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form', values);
                const token = localStorage.getItem(TOKEN_KEY);
                const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));

                const formData = new FormData();
                formData.set('lat', lat);
                formData.set('lon', lon);
                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);

                this.setState({ confirmLoading: true });
                fetch(`${API_ROOT}/post`, {
                    method: 'POST',
                    headers: {
                        Authorization: `${AUTH_HEADER} ${token}`
                    },
                    body: formData,
                }).then((response) => {
                    if (response.ok) {
                        return this.props.loadNearbyPosts();
                    }
                    throw new Error('Failed to create a post.')
                }).then(() => {
                    this.setState( {visible: false, confirmLoading: false});
                    this.form.resetFields();
                    // message.success('Post created successfully');
                }).catch((e) => {
                    console.error(e);
                    // message.error('Failed to create post.');
                    this.setState({ confirmLoading: false });
                })
            }
        })
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading } = this.state;

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create Post Button
                </Button>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <CreatePostForm ref={this.getFormRef}/>
                </Modal>
            </div>
        );
    }

    getFormRef = (formInstance) => {
        this.form = formInstance;
    }
}

export default CreatePostButton;