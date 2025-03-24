import { Avatar, AvatarGroup, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

const UserPost = ({ postImg, postTitle, postLikes, postReplies }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={"/:username/post/:uid"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Mark Zuckerberg" src="/castorice.webp" />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <AvatarGroup size={"xs"} max={3}>
              <Avatar name="John Doe" />
              <Avatar name="Donald Trump" src="/zuck-avatar.png" />
              <Avatar name="Joe Biden" />
              <Avatar name="Elon Musk" />
            </AvatarGroup>
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                zuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} align={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                5m
              </Text>
              <BsThreeDots size={20} />
            </Flex>
          </Flex>
          <Text whiteSpace={"pre-line"} fontSize={"sm"}>
            {postTitle}
          </Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"transparent"}
          >
            <Image src={postImg} w={"full"} objectFit={"cover"} />
          </Box>
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {postReplies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {postLikes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
