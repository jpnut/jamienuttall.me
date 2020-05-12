import React from 'react';
import Header from './header';
import './layout.css';
import { Container } from './container';
import styled from '../styled';

interface Props {
  location: Location;
  title: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled(Container)`
  flex: 1;
  width: 100%;
`;

const Footer = styled.footer`
  text-align: center;
  margin-bottom: 2rem;
`;

const Layout: React.SFC<Props> = ({ children, location: _location, title }) => {
  return (
    <Wrapper>
      <Header siteTitle={title} />
      <Content>
        <main>{children}</main>
      </Content>
      <Footer>
        <Container>© {new Date().getFullYear()} jamienuttall.me</Container>
      </Footer>
    </Wrapper>
  );
};

export default Layout;