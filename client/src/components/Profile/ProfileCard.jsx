import { Box, Divider, Image, Spacer, Spinner, Grid, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie'

export default function ProfileCard() {
    const cookies = new Cookies();
    const userId = cookies.get('userId');

    const [profile, setProfile] = useState({});
    const [data, setData] = useState([]);

    const profilePic = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/posts/profilePost/${userId}`)
            
            console.log(res.data);
            setData(res.data);

        }
        catch (error) {
            console.log(error);
        }
    }


    





    useEffect(() => {
        
        profilePic();

    }, [])


    return (
        <Box>

            <Box w="80%" m="auto" mb="3%">
                <Divider border="1px solid #ccc" mb="2%" />
                <Box >
                    <Grid display="grid" templateColumns='repeat(3, 1fr)' gap={6} >
                        {data.length <= 0 ? null
                            : data.map((el, i) => {
                                return (
                                    <Box key={i.toString()}>
                                        <Image w="max-content" src={el.image} alt='Dan Abramov' />
                                    </Box>
                                )
                            })
                        }
                    </Grid>

                    {/* <Box display='flex' justifyContent="center" alignItems="center" >
                        <Button>{"<"}</Button>
                        <Box>1</Box>
                        <Button>{">"}</Button>
                    </Box> */}
                </Box>
            </Box>

        </Box>
    )
}
