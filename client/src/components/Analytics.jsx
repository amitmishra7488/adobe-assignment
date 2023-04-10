import React, { useState,useEffect } from 'react'
import { Box,Text } from "@chakra-ui/react"

export default function Analytics() {
    const [totalPosts,setTotalPosts] = useState(0);
    const [totalUsers,setTotalUsers] = useState(0);

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
      }, [])

    return (
        <Box mt="64px" textAlign="center">
            <Box>
                <Text fontSize={40}>Total Post</Text>
                <Text>{totalPosts.length}</Text>
            </Box>

            <Box>
                <Text>Top Five Post</Text>
                <Text></Text>
            </Box>

            <Box>
                <Text>Total User</Text>
                <Text>{totalUsers.length}</Text>
            </Box>

            <Box>
                <Text>Top Five User</Text>
                <Text></Text>
            </Box>

        </Box>
    )
}
