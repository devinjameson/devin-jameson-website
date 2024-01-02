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
          {`${waveEmoji} Hey I'm Devin, currently a freelance hybrid developer
          and designer. I have several years of experience using React,
          React Native, and TypeScript to build digital products for companies
          of all shapes and sizes, from pre-seed startups to publicly traded
          corporations.
        </p>
        <p>
          {`Previously, I co-founded `}
          <a href="https://eversoundhq.com">Eversound</a>
          {` and made digital products at `}
          <a href="https://thoughtbot.com">thoughtbot</a>
          {`,`}
          <a href="https://evolvtechnology.com">Evolv Technology</a>
          {`, and`}
          <a href="https://poly.cam">Polycam</a>.
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
