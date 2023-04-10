import { Box,  } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import Post from '../Post/Post'
import Suggestions from '../Suggestion/Suggestions'
import { useMediaQuery } from '@chakra-ui/react'

export default function Home() {
    const [isLargerThan1000] = useMediaQuery('(max-width: 1000px)', {
        ssr: true,
        fallback: false,
      })

    return (
        <Box  display="flex" flexDirection="row" gap="10%" pt="64px" ml={isLargerThan1000?"5%":"20%"} mr={isLargerThan1000?"5%":"10%"}>
            <Box w={isLargerThan1000?"70%":"60%"}>
                <Post/>
            </Box>
            <Box w="25%" maxH={400} position="fixed" right={20} >
                <Suggestions  />
            </Box>
        </Box>
    )
}
