import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      {author?.summary && (
        <>
          <p>
            {`Currently a Senior Product Designer at `}
            <a href="https://thoughtbot.com">thoughtbot</a>.
          </p>
          <p className="small">
            {`Previously co-founded `}
            <a href="https://eversoundhq.com">Eversound</a>.
          </p>
        </>
      )}
    </div>
  )
}

export default Bio
