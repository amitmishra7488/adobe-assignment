import React, { useState, useEffect } from 'react'
import { Box, Divider, Image,Grid, Button, Text } from '@chakra-ui/react';

import { AiFillDelete } from 'react-icons/ai'

import { FiEdit } from 'react-icons/fi'
export default function Analytics() {
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [topPosts, setTopPosts] = useState([]);

    const displayPost = async () => {
        try {
            const res = await fetch('https://adobe-assignment-three.vercel.app/analytics/posts/')
            const data = await res.json();
            console.log(data);
            setTotalPosts(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const displayTopFivePost = async () => {
        try {
            const res = await fetch('https://adobe-assignment-three.vercel.app/analytics/posts/top-liked')
            const data = await res.json();
            console.log(data);
            setTopPosts(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const displayUsers = async () => {
        try {
            const res = await fetch('https://adobe-assignment-three.vercel.app/analytics/users/')
            const data = await res.json();
            console.log(data);
            setTotalUsers(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        displayPost();
        displayUsers();
        displayTopFivePost();
    }, [])

    return (
        <Box mt="10%" textAlign="center">
            <Box display="flex" w="80%" m="auto"gap="10%" justifyContent="center" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px">
                <Box>
                    <Text fontSize={40} frontWeight="700" fontFamily="cursive" >Total Post</Text>
                    <Text fontSize={25} frontWeight="500" fontFamily="cursive">{totalPosts.length}</Text>
                </Box>


                <Box>

                    <Text fontSize={40} frontWeight="700" fontFamily="cursive" >Total User</Text>
                    <Text fontSize={25} frontWeight="500" fontFamily="cursive">{totalUsers.length}</Text>
                </Box>
            </Box>


            <Box  w="80%" m="auto" mt="5%" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px">
                <Text fontSize={40} >Top Five Post</Text>
                <Box>
                {topPosts.length <= 0 ? <Text>No data Found</Text>

                            : 
                            <Box w="60%" m="auto"mt="5%" display="grid" gridTemplateColumns="repeat(3,1fr)">
                                {topPosts.map((el, i) => {
                                    return (
                                        
                                            <Box key={i.toString()}   >
                                                <Image w="150px" src={el.image} alt='Dan Abramov' />
                                                <Text textAlign="center" m="5px 0">{el.content}</Text>
                                            </Box>
                                        
                                    )
                                })}
                            </Box>
                        }
                </Box>
            </Box>

        </Box>
    )
}
