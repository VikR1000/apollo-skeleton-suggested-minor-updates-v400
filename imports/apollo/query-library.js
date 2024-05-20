import {gql} from "@apollo/client";

const GET_LINKS = gql`
    {
        links: getLinks {
            _id
            title
            url
        }
    }
`;

const GET_LINK = gql`
    query GetLink($id: ID!) {
        getLink(id: $id) {
            _id
            title
            url
        }
    }
`;

export {
    GET_LINKS,
    GET_LINK
}
