import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, HStack, Text } from '@chakra-ui/layout'
import { Tooltip } from '@chakra-ui/tooltip';
import React, { useEffect, useState } from 'react'

import { Icon, Spinner } from '@chakra-ui/react'

import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import Cookies from 'universal-cookie'

export default function ProfileDetails() {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const toast = useToast()
    const [profile, setProfile] = useState({});


    const display = async () => {

        try {
            const res = await axios.get(`https://adobe-assignment-flame.vercel.app/users/${userId}`
                )

            console.log(res.data);
            setProfile(res.data);
            console.log(profile)
        }
        catch (error) {
            console.log(error);
        }

    }

    const [isOpen, setIsOpen] = useState(false);
    const [bio, setBio] = useState("");
    const [dpLink, setDpLink] = useState("");
    const [userName, setUserName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (bio === ""  && userName === "") {
            alert("please enter specific details");
        }
        else {
            editProfile(bio,userName);
        }
        setIsOpen(false);
        toast({
            title: 'Profile Succesfully Updated',
            position: 'top',
            status: 'success',
            duration: 4000,
            isClosable: true,
        })

    }

    const editProfile = async (bio, userName) => {

        try {
            const res = await axios.put(`https://adobe-assignment-flame.vercel.app/users/${userId}`,
                {
                    bio: bio,
                    name: userName
                }
                )

            display();
        }
        catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        display();
    }, [])
    return (
        <Box className='profileMainDiv' >
            {Object.keys(profile).length <= 0 ? <Spinner textAlign="center" size='xl' />
                : <Box className='profileContainer' display="flex" w="60%" m="auto" mt={50}>
                    <Box w='30%'>
                        <Box><Image borderRadius='full' boxSize='75%' border="2px solid #ccc" objectFit='cover' src={profile.dp} alt='profile' /></Box>
                    </Box>
                    <Box w='70%'>
                        <Box display="flex" flexDirection="column" >

                            {/* 1st row */}
                            <HStack spacing='4%' ml='20px' mb="2%">
                                <Tooltip hasArrow label='Edit' >
                                    <Button size="sm" onClick={() => setIsOpen(true)}>Edit Profile</Button>
                                </Tooltip>
                            </HStack>



                            <HStack spacing='8%' ml='20px' mb="2%">
                                {/* <Text>{profile.posts.length} posts</Text> */}
                                
                            </HStack>

                            <Box ml='20px'>
                                <Text p={0} fontSize="20px">{profile.name}</Text>
                                <Text p={0}>{profile.bio}</Text>

                            </Box>

                        </Box>
                    </Box>

                </Box>}

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(30deg)' />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl id="userName">
                                <FormLabel>Change Your Name</FormLabel>
                                <Input
                                    type="text"
                                    value={userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </FormControl>
                            <FormControl id="bio">
                                <FormLabel>Add Your Bio</FormLabel>
                                <Input
                                    type="text"
                                    value={bio}
                                    onChange={(event) => setBio(event.target.value)}
                                />
                            </FormControl>
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Save
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}
