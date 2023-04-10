import React, { useEffect } from 'react';
import './post.css';
import { FaRegHeart } from "react-icons/fa"
import {AiFillHeart} from "react-icons/ai"
import { useState } from 'react';
import PostLoading from '../PostLoading/PostLoading';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'


const InstagramPost = () => {
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  console.log(userId)
  const [data, setData] = useState([]);
  const toast = useToast()

  const display = async () => {
    try {
      const res = await fetch('http://localhost:8080/analytics/posts/')
      const data = await res.json();
      console.log(data);
      setData(data);
    }
    catch (err) {
      console.log(err);
    }
  }
  

  const handleLikeClick = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:8080/posts/${postId}/like`,
          {
            userId:cookies.get('userId')
          }
      )
      toast({
          title: `You Liked A Post`,
          position: 'top',
          status: 'success',
          duration: 1000,
          isClosable: true,
      })
      display();
      
  } catch (error) {
      alert(error.message);
  }

  };

  const handleUnlikeClick = async (postId) => {
    
    try {
      const res = await axios.post(`http://localhost:8080/posts/${postId}/unlike`,
          {
            userId:cookies.get('userId')
          }
      )
      toast({
          title: `Like Removed`,
          position: 'top',
          status: 'success',
          duration: 1000,
          isClosable: true,
      })
      display();
      
  } catch (error) {
      alert(error.message);
  }

  };

  useEffect(() => {
    display();
  }, [])

  return (

    <>
      {data.length > 0 ?
        data.map((el, i) => {
          return (
            <div key={i.toString()} className="InstagramPost">
              <div className="InstagramPost__header">
                <img src={el.user_id.dp} alt="" className="InstagramPost__profile-image" />
                <p className="InstagramPost__username">{el.user_id.name}</p>
              </div>
              <img src={el.image} alt="" className="InstagramPost__post-image" />
              

              <div className="InstagramPost__actions">
                {el.likes.filter(r => r.userId === userId).length > 0
                  ?
                  <button onClick={() => handleUnlikeClick(el._id)}><AiFillHeart size={30} style={{ color: 'red' }} /></button>
                  :
                  <button onClick={() => handleLikeClick(el._id)}><FaRegHeart size={30} /></button>
                  
                  
                }
                <p className="InstagramPost__likes">{el.likes.length}</p>
              </div>
              
              <p className="InstagramPost__time">3 hours ago</p>
            </div>
          )
        })
        :
        <div className="InstagramPost">
          <PostLoading />
        </div>
      }

    </>
  )
};

export default InstagramPost;
