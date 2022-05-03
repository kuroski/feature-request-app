import { Box, Container } from "@chakra-ui/react";
import Header from "@/components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box>
    <Header />
    <Container maxW="container.lg">
      <main>{children}</main>
    </Container>
  </Box>
);

export default Layout;
