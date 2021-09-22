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
            linkedin
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const social = data.site.siteMetadata?.social

  const twitterLink = `https://twitter.com/${social.twitter}`
  const linkedinLink = `https://linkedin.com/in/${social.linkedin}`
  const githubLink = `https://github.com/${social.github}`

  const waveEmoji = String.fromCodePoint(0x1f44b)

  return (
    <div className="bio">
      <>
        <p>
          {`${waveEmoji} Hey I'm Devin, currently a Senior Frontend Developer at `}
          <a href="https://evolvtechnology.com">Evolv Technology</a>.
        </p>
        <p>
          {`Previously, I co-founded `}
          <a href="https://eversoundhq.com">Eversound</a>
          {`and made digital products at `}
          <a href="https://thoughtbot.com">thoughtbot</a>.
        </p>
        <p>
          {`Indeed, I have a `}
          <a href={githubLink}>GitHub</a>
          {`, `}
          <a href={twitterLink}>Twitter</a>
          {`, and `}
          <a href={linkedinLink}>LinkedIn</a>.
        </p>
      </>
    </div>
  )
}

export default Bio
