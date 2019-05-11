import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_POST, GET_POSTS } from '../queries';
import { 
    Button, 
    Modal, 
    Form, 
    Input, 
    Select
} from 'antd';

const { Option } = Select;

export class ModalUI extends Component {
    state = {
        visible: false,
        twitterUsername: '',
        description: '',
        genderPreffer: '',
        gender: ''
    }

    onModal = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleSubmit = (e, createPost) => {
        e.preventDefault();
        this.setState({ visible: false })
        createPost().then(async ({data}) => {
            this.setState({
                twitterUsername: '',
                description: '',
                genderPreffer: '',
                gender: ''
            })
        })
    }

    updateCache = (cache, {data: {createPost}}) => {
        const { posts } = cache.readQuery({
            query: GET_POSTS
        });

        cache.writeQuery({
            query: GET_POSTS,
            data: {
                posts: [createPost, ...posts,]
            }
        })
    }

    handleChangeUsername = (e) => {
        this.setState({twitterUsername: e.target.value})
    }

    handleSelectChangeGender = (e) => {
        let gender=null;
        if(e==="woman"){ gender=false}
        if(e==="man"){ gender=true}
        this.setState({genderPreffer: e, gender})
    }

    handleSelectChangeDescription = (e) => {
        this.setState({description: e})
    }

    validation = () => {
        const { twitterUsername, description, genderPreffer } = this.state;
        if( !twitterUsername || !description || !genderPreffer){
            return true
        }
        return false
    }

    render() {
    const { twitterUsername, description, genderPreffer, gender } = this.state;
    return (
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <Button type="primary" icon="plus" onClick={this.onModal}>
            İlan Ver
        </Button>
        <Modal
          title="İlan Ver"
          visible={this.state.visible}
          onCancel={this.onModal}
          footer={null}
        >
            <Mutation 
                mutation={ CREATE_POST } 
                variables={ { twitterUsername, description, gender } }
                update={ this.updateCache }
                optimisticResponse={{
                    __typename: "Mutation",
                    createPost: {
                        __typename: "Post",
                        id: Math.round(Math.random()*-20000),
                        user: {
                            __typename: "User",
                            id: Math.round(Math.random()*20000),
                            twitterUsername
                        },
                        type: {
                            __typename: "Description",
                            id: Math.round(Math.random()*20000),
                            description
                        },
                        genderPreffer: gender
                    }
                }}
            >
                { (createPost, { loading, error }) => (
                    <Form 
                        labelcol={{ span: 5 }} 
                        wrappercol={{ span: 12 }} 
                        onSubmit={ (e) => {this.handleSubmit(e, createPost)}}
                    >
                        <Form.Item>
                            <Input 
                                value={twitterUsername}
                                placeholder="Twitter Kullanıcı Adı"
                                onChange={this.handleChangeUsername}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Select
                            value={description ? description: undefined}
                            placeholder="İhtiyaç"
                            onChange={this.handleSelectChangeDescription}
                            >
                            <Option value="Gidiş">Gidiş</Option>
                            <Option value="Gidiş-Geliş">Gidiş-Geliş</Option>
                            <Option value="Gidiş-Geliş-Konaklama">Gidiş-Geliş-Konaklama</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Select
                                value={ genderPreffer ? genderPreffer: undefined }
                                placeholder="Cinsiyet"
                                onChange={this.handleSelectChangeGender}
                            >
                            <Option value="man">erkek</Option>
                            <Option value="woman">kadın</Option>
                            </Select>
                        </Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="login-form-button" 
                            block
                            disabled={this.validation()}
                        >
                            { this.validation() ? "Tüm Alanları Doldurmalısın" : "Gönder" }
                        </Button>
                    </Form>
                )}
            </Mutation>
        </Modal>
      </div>
    )
  }
}

export default ModalUI
