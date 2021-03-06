import React, { Component } from 'react';
import {  graphql, Query } from 'react-apollo';
import { CREATE_POST, GET_TYPES } from '../queries';
import { 
    Button, 
    Modal, 
    Form, 
    Input, 
    Select,
    Icon,
    Divider
} from 'antd';

const { Option } = Select;

export class ModalUI extends Component {
    state = {
        visible: false
    }

    onModal = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ visible: false });
        this.props.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
            this.props.mutate({
            variables: {
                twitterUsername: values.twitterUsername,
                type: values.type,
                gender: values.genderPreffered
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(res => {
            console.log('error', res);
        })
    }
    });
}

    // updateCache = (cache, {data: {createPost}}) => {
    //     const { posts } = cache.readQuery({
    //         query: GET_POSTS
    //     });

    //     cache.writeQuery({
    //         query: GET_POSTS,
    //         data: {
    //             posts: [createPost, ...posts,]
    //         }
    //     })
    // }

    renderItem() {
        if(
            this.props.form.getFieldValue('type')==="cjvnufk9h007v0714rznpx450" || 
            this.props.form.getFieldValue('type')==="cjvnufppd00800714qmha77b3") 
        {
            return true;
        }
        return false;
    }

    render() {
    
    const {
        form: {
            getFieldDecorator
        }
    } = this.props;

    return (
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <Divider>Bir otobüs de sizden olsun</Divider>
        <p>
        23 Haziran İstanbul yerel seçimlerinde şehir dışında bulunan öğrencilere bilet ve konaklama imkanı sağlamak için
        ilan bırakman yeterli
        </p>
        <Button type="primary" icon="plus" onClick={this.onModal}>
            İlan Ver
        </Button>
        <Modal
          title="İlan Ver"
          visible={this.state.visible}
          onCancel={this.onModal}
          footer={null}
        >
                <Form 
                    labelcol={{ span: 5 }} 
                    wrappercol={{ span: 12 }} 
                    onSubmit={ this.handleSubmit}
                >
                    <Form.Item>
                            {getFieldDecorator('twitterUsername', {
								rules: [{ required: true, message: 'Lütfen ilan başlığını giriniz!' }],
							})(
								<Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Twitter Kullanıcı Adı" />
							)}
                    </Form.Item>
                    <Query query={GET_TYPES}>
                        {({ data, loading }) => (
                            (!loading && data.types) ?
                                (
                                    <Form.Item hasFeedback>
                                        {getFieldDecorator('type', {
                                                rules: [{ required: true, message: 'Lütfen İhtiyaç Tipini seçiniz!' }],
                                            })(        
                                                <Select
                                                placeholder="karşıyalabilirim.."
                                                >
                                                {
                                                    data.types.map(
                                                        type =>
                                                            <Option key={type.id} value={type.id}>
                                                                {type.description}
                                                            </Option>
                                                    )
                                                }
                                                </Select>
                                        )}
                                    </Form.Item>
                                ) : null
                        )}
                    </Query>
                    {
                        this.renderItem() ?
                        <Form.Item>
                            {getFieldDecorator('genderPreffered', {
                                rules: [{ required: false, message: 'Lütfen Cinsiyet tercihinizi seçiniz!' }],
                            })(
                            <Select
                                placeholder="Cinsiyet Tercihi"
                            >
                            <Option value={1}>erkek</Option>
                            <Option value={0}>kadın</Option>
                            <Option value={2}>farketmez</Option>
                            </Select>
                            )}
                        </Form.Item>
                        :
                        null
                    }
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        block
                    >
                    Gönder
                    </Button>
                </Form>
            
        </Modal>
      </div>
    )
  }
}

ModalUI = Form.create({ name: 'create_post' })(ModalUI);

export const WrappedModalUI = (
    graphql(CREATE_POST, { name: 'mutate' })(ModalUI)
);
