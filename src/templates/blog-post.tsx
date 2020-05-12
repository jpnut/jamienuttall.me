import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '../styled';
import { transparentize } from 'polished';

interface Props {
  data: any;
  pageContext: any;
  location: Location;
}

const Title = styled.h1`
  margin: 1rem 0;
`;

const Date = styled.time`
  color: ${props => transparentize(0.2, props.theme.colors.text)};
  display: block;
  font-size: 0.8em;
  margin-bottom: 2rem;
`;

const Article = styled.article`
  font-size: 1.25em;
  line-height: 1.75;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.primary};
  }

  p {
    margin-bottom: 2rem;
  }

  h2 {
    margin-top: 5rem;
  }

  hr {
    margin: 5rem;
  }
`;

const BlogPostTemplate: React.SFC<Props> = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <Article>
        <header>
          <Title>{post.frontmatter.title}</Title>
          <Date>{post.frontmatter.date}</Date>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr />
      </Article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
