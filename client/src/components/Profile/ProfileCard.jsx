import { Box, Divider, Image,Grid, Button, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'

import { FiEdit } from 'react-icons/fi'
import axios from 'axios';
import Cookies from 'universal-cookie'
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
export default function ProfileCard() {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const toast = useToast()
    const [data, setData] = useState([]);

    const display = async () => {
        try {
            const res = await axios.get(`https://adobe-assignment-three.vercel.app/posts/profilePost/${userId}`)

            console.log(res.data);
            setData(res.data);

        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (postId)=>{
        try {
            const res = await axios.delete(`https://adobe-assignment-three.vercel.app/posts/${postId}`)


            toast({
                title: `You Deleted A Post`,
                position: 'top',
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
            display();

        }
        catch (error) {
            console.log(error);
        }
    }

    const [postid,setPostid] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [caption, setCaption] = useState("");
    const [imageLink, setImageLink] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (caption === ""  && imageLink === "") {
            alert("please enter specific details");
        }
        else {
            editPost(caption,imageLink);
        }
        setIsOpen(false);
        toast({
            title: 'Post Succesfully Updated',
            position: 'top',
            status: 'success',
            duration: 4000,
            isClosable: true,
        })

    }

    const editPost = async (caption, imageLink) => {

        try {
            const res = await axios.put(`https://adobe-assignment-three.vercel.app/posts/${postid}`,
                {
                    content: caption,
                    image: imageLink
                }
                )

            display();
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleEdit(id){
        setPostid(id);
        setIsOpen(true);
    }



    useEffect(() => {

        display();

    }, [])


    return (
        <Box>

            <Box w="80%" m="auto" mb="3%">
                <Divider border="1px solid #ccc" mb="2%" />
                <Box >
                    <Grid display="grid" templateColumns='repeat(3, 1fr)' gap={6} >
                        {data.length <= 0 ? <Text>No data Found</Text>
                            : data.map((el, i) => {
                                return (
                                    <Box key={i.toString()} >
                                        <Image w="max-content" src={el.image} alt='Dan Abramov' />
                                        <Text textAlign="center" m="5px 0">{el.content}</Text>
                                        <Box display="flex" gap="5%" justifyContent="center">
                                            <Button colorScheme='teal' variant='solid' onClick={() => handleEdit(el._id)}><FiEdit />
                                            </Button>
                                            <Button colorScheme='red' variant="outline" onClick={()=>handleDelete(el._id)}><AiFillDelete />
                                            </Button>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(30deg)' />
                <ModalContent>
                    <ModalHeader>Edit Post</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl id="imageLink">
                                <FormLabel>Image Link</FormLabel>
                                <Input
                                    type="text"
                                    value={imageLink}
                                    onChange={(event) => setImageLink(event.target.value)}
                                />
                            </FormControl>
                            <FormControl id="caption">
                                <FormLabel>Add Caption</FormLabel>
                                <Input
                                    type="text"
                                    value={caption}
                                    onChange={(event) => setCaption(event.target.value)}
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
                    </Grid>
                
                </Box>
            </Box>

        </Box>
    )
}
