import React, { useEffect, useState } from 'react'

import { Box, Button, Image, Text, useMediaQuery } from '@chakra-ui/react'

import { BiUser } from 'react-icons/bi'
import { BsFillCloudUploadFill } from 'react-icons/bs'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'


export default function Suggestions() {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const [isLargerThan800] = useMediaQuery('(max-width: 800px)', {
        ssr: true,
        fallback: false,
    })
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});

    const profileDetails = async () => {

        try {
            const res = await axios.get(`https://adobe-assignment-flame.vercel.app/users/${userId}`)
            console.log(res.data);
            setUserData(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        if (userId) {
            profileDetails();
        }

    }, [])



    return (
        <Box display="flex" flexDirection="column" gap="10px" maxH={400}>
            <Box display="flex" flexDirection="column" alignItems="center" gap="10px" mt="10%" boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px">
                {
                    userId ?
                        <>
                            <Box>
                                <Image
                                    boxSize='150px'
                                    borderRadius='50%'
                                    src={Object.keys(userData).length <= 0 ? "Loading..." : userData.dp}
                                    alt='Profile Image'
                                />
                            </Box>
                            <Box>
                                <Text>{Object.keys(userData).length <= 0 ? "Loading..." : userData.name}</Text>
                            </Box>
                            <Box display="flex" flexDirection={isLargerThan800 ? "column" : "row"} padding={5}>
                                <Box m={isLargerThan800 ? "0 0 10% 0" : "0 10% 0 0"} >
                                    <Button size="sm" leftIcon={<BsFillCloudUploadFill />} color="#fff" border="none" padding="4px 6px" backgroundImage="linear-gradient(to right,#e052a0,#f15c41)" borderRadius={3} onClick={() => { navigate("/profile") }}
                                        _hover={{
                                            backgroundColor: "#e6375a",
                                            backgroundImage: "none!important"
                                        }}
                                    >
                                        UPLOAD
                                    </Button>
                                </Box>

                                <Box>
                                    <Button size="sm" leftIcon={<BiUser />} color="#fff" border="none" padding="4px 6px" backgroundImage="linear-gradient(to right,#e052a0,#f15c41)" borderRadius={3} onClick={() => { navigate("/profile") }}
                                        _hover={{
                                            backgroundColor: "#e6375a",
                                            backgroundImage: "none!important"
                                        }}
                                    >
                                        PROFILE
                                    </Button>
                                </Box>

                            </Box>
                        </>
                        :
                        <><Box>
                            <Image
                                boxSize='150px'
                                borderRadius='50%'
                                src="https://www.town.winthrop.ma.us/sites/g/files/vyhlif8421/f/styles/news_image/public/pages/alert.png?itok=W-Aw0JnZ"
                                alt='Profile Image'
                            />
                        </Box>
                            <Text color="red" fontSize={30}>No User Logged In</Text>
                        </>

                }
            </Box>
        </Box>
    )
}
