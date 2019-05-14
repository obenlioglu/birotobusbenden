import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../../queries';
import { 
    List,
    Avatar,
    Spin,
    Icon,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Moment from 'react-moment';


class Home extends Component {

    state = {
        first: 10,
        loading: false,
        hasMore: true
    }

    handleGetClick = (data) => {
        this.setState({
            first: this.state.first + 10,
            loading: true
        });
        console.log(data);
        console.log(this.state.first);
        if (!(this.state.first == data.posts.length + 10)) {
            this.setState({
              hasMore: false,
              loading: false,
            });
            return;
        }
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div>
            
            <div className="demo-infinite-container">

                <Query query={GET_POSTS} variables ={{ first: this.state.first }}>
                    {
                        ({ data, loading, error }) => {
                            if(loading) { return(<Spin size="large" />) } 
                            if(error) { return(<div>Hata</div>) }
                            console.log(data);
                            return(
                                <InfiniteScroll
                                    initialLoad={false}
                                    pageStart={0}
                                    loadMore={() => this.handleGetClick(data)}
                                    hasMore={!this.state.loading && this.state.hasMore}
                                    useWindow={false}
                                >
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
                                        
                                        <div style={{ marginRight: 5 }}>{post.genderPreffer===1 ? "Erkek" : post.genderPreffer===0 ? "Kadın" : post.genderPreffer===2 ? "Farketmez" : null}</div>
                                        <div style={{ marginRight: 75 }}>
                                            {
                                                post.genderPreffer===1 ?
                                                <Icon type="man" />
                                                :
                                                post.genderPreffer===0 ?
                                                <Icon type="woman" />
                                                :
                                                null
                                            }
                                        </div>
                                        <div style={{ marginRight: 5 }}>
                                        <Moment format="YYYY/MM/DD HH:mm">
                                        {post.createdAt}
                                        </Moment>
                                        
                                        </div>
                                    </List.Item>
                                    )}
                                    
                                >
                                {this.state.loading && this.state.hasMore && (
                                        <div className="demo-loading-container">
                                          <Spin />
                                        </div>
                                      )}
                                </List>
                                </InfiniteScroll>
                            )
                        }
                    }
                </Query>
            </div>
            </div>
        );
    }
}

export default Home;