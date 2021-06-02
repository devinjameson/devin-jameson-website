import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, summary, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{summary}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="global-footer">
        <p>© {new Date().getFullYear()} Devin Jameson</p>
        <a href="https://github.com/devinjameson/devin-jameson-website">
          Here's the source code for this website.
        </a>{" "}
      </footer>
    </div>
  )
}

export default Layout
