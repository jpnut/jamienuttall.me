import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: '2.5rem',
      }}
    >
      <p>
        Written by <strong>{author}</strong>
      </p>
    </div>
  );
};

export default Bio;
