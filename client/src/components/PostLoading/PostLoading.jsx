import React from 'react'
import { Box, Skeleton ,Stack} from '@chakra-ui/react'

export default function PostLoading() {
    return (
        <Box>
            <Stack>
                <Skeleton startColor='hsl(200, 20%, 95%)' endColor='hsl(200, 20%, 80%)' height='500px' />
            </Stack>
        </Box>
    )
}
