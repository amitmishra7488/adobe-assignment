import { Box,Flex,Text } from '@chakra-ui/layout'
import React from 'react'
import ProfileCard from './ProfileCard'
import ProfileDetails from './ProfileDetails'
import {Image, useMediaQuery } from '@chakra-ui/react'
import Cookies from 'universal-cookie'

export default function Profile() {
  const cookies = new Cookies();
    const userId = cookies.get('userId');
  const [isLargerThan850] = useMediaQuery('(max-width: 850px)', {
    ssr: true,
    fallback: false,
  })
  return (
    <Flex mt="20px">
      
      { userId
      ?
        <Box >
          <ProfileDetails/>
          <ProfileCard/>
      </Box>
      :
      <Box m="10% 40%" h="300px" w="300px" >
        <Image
            borderRadius='full'
            
            src='https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif'
            alt='Login Caution'
          />
        <Text textAlign="center" fontSize={30} color="red">PlEASE LOGIN FIRST</Text>
      </Box>
      }
        
    </Flex>
   
  )
}
