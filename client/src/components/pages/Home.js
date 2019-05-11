import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../../queries';
import { 
    List,
    Avatar,
    Spin,
    Icon
} from 'antd';

class Home extends Component {

    render() {
        return (
            <div>
                <Query query={GET_POSTS}>
                    {
                        ({ data, loading, error }) => {
                            if(loading) { return(<Spin size="large" />) } 
                            if(error) { return(<div>Hata</div>) }
                            return(
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data.posts}
                                    className="container"
                                    renderItem={post => (
                                    <List.Item>
                                        <List.Item.Meta
                                        avatar={<Avatar size="large" icon={post.id < 0 ? "loading" : "user"} />}
                                        title={
                                            <a href={"https://twitter.com/"+ post.user.twitterUsername} 
                                            rel="noopener noreferrer" target="_black">
                                                @{post.user.twitterUsername}
                                            </a>
                                        }
                                        description={post.type.description}
                                        />
                                        <div style={{ marginRight: 5 }}>{post.genderPreffer ? "Erkek" : "Kadın"}</div>
                                        <div>
                                            <Icon type={post.genderPreffer ? "man" : "woman"} />
                                        </div>
                                    </List.Item>
                                    )}
                                />
                            )
                        }
                    }
                </Query>
            </div>
        );
    }
}

export default Home;