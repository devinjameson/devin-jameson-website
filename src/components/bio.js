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
  const social = data.site.siteMetadata?.social

  const twitterLink = `https://twitter.com/${social.twitter}`
  const linkedInLink = `https://linkedin.com/in/${social.linkedIn}`

  return (
    <div className="bio">
      <>
        <p>
          {`Hey I'm Devin, currently a Senior Product Designer at `}
          <a href="https://thoughtbot.com">thoughtbot</a>.
        </p>
        <p className="small">
          {`Previously, I co-founded `}
          <a href="https://eversoundhq.com">Eversound</a>.
        </p>
        <p className="small">
          {`Indeed, I have a `}
          <a href={twitterLink}>Twitter</a>
          {` and `}
          <a href={linkedInLink}>LinkedIn</a>.
        </p>
      </>
    </div>
  )
}

export default Bio
