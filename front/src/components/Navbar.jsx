import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";

export const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxH={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        background={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
          {/* # left */}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <img src='/react.png' alt='React Logo' width={50} height={50} />
            <Text fontSize={"40px"}>+</Text>
            <img
              src='/programming-language-flask.512x457.png'
              alt='Flask Logo'
              width={50}
              height={50}
            />
          </Flex>
          {/* # right */}
          <Flex gap={3} alignItems={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "block" }}
            >
              Being solidarity 👊
            </Text>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
