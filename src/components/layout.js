import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Header from "./header";
import "../style/layout.scss";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const pageTitle = `${data.site.siteMetadata.title} | DevpediaCode`;
  const logoSrc = require("../images/favicon200.png");

  return (
    <div className="layout-container">
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="icon" type="image/png" href={logoSrc} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1134938100904308"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />

      <div className="content-container">
        <main className="main-content">
          <Container className="p-3">{children}</Container>
        </main>
      </div>

      <footer className="footer mt-auto py-3">
        <div className="footer-links">
          <Link to="/abouthis">サイトについて</Link>
          <Link to="/information">記事一覧</Link>
          <Link to="/contact">お問い合わせ</Link>
          <Link to="/privacypolicy">プライバシーポリシー</Link>
          <Link to="/termsofservice">利用規約</Link>
        </div>
        <div className="footer-copyright">
          © 2025 DevpediaCode. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
