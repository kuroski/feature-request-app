import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      bg={useColorModeValue("white", "blue.900")}
      borderTop="10px solid"
      borderColor={useColorModeValue("blue.400", "blue.700")}
      px={4}
      roundedBottom={4}
      boxShadow="base"
    >
      <Container maxW="container.lg">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap={2}>
            <Button
              onClick={toggleColorMode}
              size="sm"
              colorScheme="blue"
              variant="ghost"
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {session && (
              <Link href={{ pathname: "/admin/spaces" }} passHref>
                <Button as="a" cursor="pointer">
                  Home
                </Button>
              </Link>
            )}
          </Flex>

          <Flex alignItems="center">
            {!session && (
              <Button
                as="a"
                colorScheme="blue"
                variant="outline"
                href="/api/auth/signin"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
                _hover={{
                  bg: "blue.300",
                }}
              >
                Sign In
              </Button>
            )}

            {session?.user && (
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  size="sm"
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                  colorScheme="blue"
                >
                  <HStack>
                    <Avatar
                      size="xs"
                      src={
                        session.user.image ??
                        "https://avatars.dicebear.com/api/bottts/feature-request-app.svg"
                      }
                    />
                    <span>{session.user.name ?? session.user.email}</span>
                  </HStack>
                </MenuButton>
                <MenuList alignItems="center">
                  <MenuItem
                    as="a"
                    href="/api/auth/signout"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
