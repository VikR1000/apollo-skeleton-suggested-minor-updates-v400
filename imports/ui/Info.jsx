import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {GET_LINK, GET_LINKS} from "../apollo/query-library";


export const Info = () => {
  const { loading, error, data } = useQuery(GET_LINKS);

  const {loading: loading2, error: error2, data: data2} = useQuery(GET_LINK, {
      variables: {
          id: '1',
      }
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ⁉️</p>;

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{data?.links?.map(
        link => <li key={link._id}>
          <a href={link.url} target="_blank">{link.title}</a>
        </li>
      )}</ul>
    </div>
  );
};
