import { Box,Flex } from '@chakra-ui/layout'
import React from 'react'
import ProfileCard from './ProfileCard'
import ProfileDetails from './ProfileDetails'
import { useMediaQuery } from '@chakra-ui/react'


export default function Profile() {
  const [isLargerThan850] = useMediaQuery('(max-width: 850px)', {
    ssr: true,
    fallback: false,
  })
  return (
    <Flex mt="20px">
      <Box >
          <ProfileDetails/>
          <ProfileCard/>
      </Box>
        
    </Flex>
   
  )
}
