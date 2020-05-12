import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from '../styled';
import { mix, transparentize } from 'polished';

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMdx: {
    edges: {
      node: {
        excerpt: string;
        frontmatter: {
          title: string;
          date: string;
          description: string;
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
};

const Header = styled.h3`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.5rem;
  transition: color 200ms cubic-bezier(0.23, 1, 0.32, 1);
`;

const Date = styled.time`
  color: ${props => transparentize(0.2, props.theme.colors.text)};
  display: block;
  font-size: 0.8em;
  margin-bottom: 0.5rem;
`;

const Article = styled.article`
  background-color: rgba(20, 20, 20, 0.05);
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px ${props => transparentize(0.5, props.theme.colors.black)},
    0 15px 30px ${props => transparentize(1, props.theme.colors.primary)};
  margin-bottom: 3rem;
  overflow: hidden;
  padding: 1rem;
  position: relative;
  transition: box-shadow 200ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms cubic-bezier(0.23, 1, 0.32, 1);

  &:after {
    background: ${props => props.theme.colors.primary};
    bottom: 0;
    content: '';
    height: 1rem;
    left: 0;
    position: absolute;
    right: 0;
    transform: translateY(1rem);
    transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover {
    background-color: ${props => mix(0.95)('rgba(20, 20, 20, 0.05)', props.theme.colors.primary)};
    box-shadow: 0 1px 2px -2px ${props => transparentize(1, props.theme.colors.black)},
      0 15px 30px ${props => transparentize(0.7, props.theme.colors.primary)};

    h3 {
      color: ${props => props.theme.colors.primary};
    }

    &:after {
      transform: translateY(0);
    }
  }
`;

const IndexPage = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <Layout title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Link style={{ boxShadow: `none` }} to={node.fields.slug} key={node.fields.slug}>
            <Article>
              <header>
                <Header>{title}</Header>
                <Date>{node.frontmatter.date}</Date>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </Article>
          </Link>
        );
      })}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
