//Query resolvers
const Query = require('./queries/Query');
const Post = require('./queries/Post');

//mutation resolvers
const Mutation = require('./mutations/index');

module.exports = {
    Query,
    Post,
    Mutation
};