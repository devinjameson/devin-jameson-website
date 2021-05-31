const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const createPagesForContent = (contents, component, createPage) => {
  if (contents.length > 0) {
    contents.forEach((content, index) => {
      const previousPostId = index === 0 ? null : contents[index - 1].id
      const nextPostId =
        index === contents.length - 1 ? null : contents[index + 1].id

      createPage({
        path: content.fields.slug,
        component,
        context: {
          id: content.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const work = path.resolve(`./src/templates/work.js`)

  const result = await graphql(
    `
      {
        blogPosts: allMarkdownRemark(
          filter: { fields: { slug: { regex: "/blog/" } } }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        works: allMarkdownRemark(
          filter: { fields: { slug: { regex: "/work/" } } }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your content`,
      result.errors
    )
    return
  }

  const blogPosts = result.data.blogPosts.nodes
  const works = result.data.works.nodes

  // Create contents pages
  // But only if there's at least one markdown file found
  // `context` is available in the template as a prop and as a variable in
  // GraphQL

  createPagesForContent(blogPosts, blogPost, createPage)
  createPagesForContent(works, work, createPage)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter This way the
  // "MarkdownRemark" queries will return `null` even when no contents are
  // stored inside "content/blog" or "content/work" instead of returning an
  // error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
