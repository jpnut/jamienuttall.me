import { Link } from 'gatsby';
import React from 'react';
import styled from '../styled';
import { Container } from './container';

interface Props {
  siteTitle: string;
}

const Wrapper = styled.header`
  background: ${props => props.theme.colors.secondary};
`;

const Title = styled.h1`
  margin: 0;
  padding: 0 0.5rem;
`;

const Header: React.SFC<Props> = ({ siteTitle }) => (
  <Wrapper>
    <Container>
      <Title>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Title>
    </Container>
  </Wrapper>
);

export default Header;
