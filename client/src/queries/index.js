const { gql } = require('apollo-boost');

export const CREATE_POST = gql`
    mutation($twitterUsername: String! $type: ID! $gender: Boolean) {
        createPost(
            data: {
            user: { 
                create: { twitterUsername: $twitterUsername } 
            },
            type: {
                connect: { id: $type }
            },
            genderPreffer: $gender
            }
        ) {
            id
            user{twitterUsername}
            genderPreffer
            type{description}
        }
    }
`

export const GET_POSTS = gql`
    query {
        posts(
            orderBy: createdAt_DESC
        ) {
            id
            user{twitterUsername}
            genderPreffer
            type{description}
        }
    }
`

export const GET_TYPES = gql`
    query {
        types {
            id
            description
        }
}
`