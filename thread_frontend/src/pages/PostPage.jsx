import { Avatar, Box, Divider, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";

const PostPage = () => {
  const { colorMode } = useColorMode();
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/castorice.webp" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              zuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            5m
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>My Valentine post</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"transparent"}
      >
        <Image src={"/firefly_valentine.webp"} w={"full"} objectFit={"cover"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          21 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {100 +  (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider borderColor={colorMode === "dark" ? "gray.light" : "gray"} my={3}/>
    </>
  );
};

export default PostPage;
