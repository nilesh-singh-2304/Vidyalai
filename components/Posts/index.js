import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';

//importing cont from common folder
import cont from '../common/cont';
//importing cont from common folder

import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      setPosts(posts);
    };

    fetchPost();
  }, [isSmallerDevice]);




//Adding functionality of loading more posts

useEffect(() => {
    loadMorePost();
  },[])

  const loadMorePost = async () => {
    setIsLoading(true);

    const {data: post} = await axios.get('/api/v1/posts' , {
      params : {start:posts.length , limit: 5}
    });
    setPosts((posts)=> [...posts, ...post])

    setIsLoading(false)
  }

//Addition of loading more posts




  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };



//Showing name , email and initial letters of names
const [showDetail , setshowDetail] = useState([]);

  async function pullJson() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const responseData = await response.json()
    console.log(responseData)

    setshowDetail(responseData)
  }


  useEffect(()=>{

   pullJson();

  },[])

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');
    return initials;
  };
//Showing name , email and initial letters of names





  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <>
           <cont>
              <div>{showDetail.map(function(user){
                       if(user.id == post.userId){
                         return <p key = {user.id}> {getInitials(user.name)} {user.name} <br/> {user.email} </p>
                       }
                })}</div>
              <Post post={post} />
            <cont>
          </>
      ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>
    </Container>
  );
}
