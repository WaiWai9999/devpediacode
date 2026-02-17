import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Helmet from "react-helmet";
import Prism from "prismjs";
import "../style/layout.scss";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-haxe";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-ini";
import "prismjs/components/prism-json";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-stylus";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactHtmlParser from "react-html-parser";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const customDarcula = {
  ...darcula,
  'code[class*="language-"]': {
    ...darcula['code[class*="language-"]'],
    textShadow: "none",
    fontSize: "16px",
    background: "#1E1E2E",
  },
  "@media (max-width: 767px)": {
    'code[class*="language-"]': {
      fontSize: "12px",
      backgroundColor: "#1E1E2E",
    },
  },
};

const CustomSyntaxHighlighter = ({ language, children }) => {
  return (
    <SyntaxHighlighter language={language} style={customDarcula}>
      {children}
    </SyntaxHighlighter>
  );
};

const InformationPost = ({ data }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
    Prism.highlightAll();
  }, []);

  const getCodeElements = htmlString => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const codeElement = doc.querySelector("code");
    const classAttribute = codeElement?.getAttribute("class") || "";
    let language = classAttribute?.replace("language-", "") ?? "javascript";
    const codeContent = doc.documentElement.textContent;

    return {
      language: language,
      codeContent: codeContent,
    };
  };

  const parseContent = bodyContents => {
    const tableClass = "postTable";

    const options = {
      transform: (node, index) => {
        if (
          node.type === "text" &&
          node.parent &&
          node.parent.name !== "code"
        ) {
          return <React.Fragment key={index}>{node.data}</React.Fragment>;
        }
      },
      replace: domNode => {
        if (domNode.name === "pre") {
          const codeElement = domNode.children.find(
            child => child.name === "code"
          );

          if (codeElement) {
            const htmlString = codeElement.children[0].data;
            const elements = getCodeElements(htmlString);

            if (
              elements.language === "routeros" ||
              elements.language === "reasonml" ||
              elements.language === "" ||
              elements.language === " " ||
              elements.language === undefined
            ) {
              elements.language = "javascript";
            }

            return (
              <CustomSyntaxHighlighter language={elements.language}>
                {elements.codeContent}
              </CustomSyntaxHighlighter>
            );
          }
        } else if (domNode.name === "code") {
          const htmlString = domNode.children[0].data;
          const elements = getCodeElements(htmlString);

          return (
            <CustomSyntaxHighlighter language={elements.language}>
              {elements.codeContent}
            </CustomSyntaxHighlighter>
          );
        } else if (domNode.name === "p") {
          const codeMatches = domNode.children.filter(
            child =>
              child.type === "tag" &&
              child.name === "code" &&
              child.children.length > 0 &&
              child.children[0].type === "text"
          );

          if (codeMatches.length > 0) {
            const codeContent = codeMatches
              .map(codeMatch => codeMatch.children[0].data)
              .join("\n");

            return (
              <CustomSyntaxHighlighter language="javascript">
                {codeContent}
              </CustomSyntaxHighlighter>
            );
          }

          // Check if paragraph contains code-like patterns (starts with # or contains assignments)
          const paragraphText = domNode.children
            .filter(child => child.type === "text")
            .map(child => child.data)
            .join("")
            .trim();

          if (
            paragraphText.includes("\n") ||
            paragraphText.match(/^#\s/) ||
            paragraphText.match(/^(npx|npm|yarn|pip|python|node|ruby|java|gcc|mvn)\s/) ||
            (paragraphText.includes("=") &&
              (paragraphText.includes("(") || paragraphText.includes("[")))
          ) {
            return (
              <CustomSyntaxHighlighter language="bash">
                {paragraphText}
              </CustomSyntaxHighlighter>
            );
          }
        } else if (domNode.name === "table") {
          const tableContent = ReactHtmlParser(domNode.outerHTML);
          return React.cloneElement(tableContent, {
            className: tableClass,
          });
        } else if (domNode.name === "br") {
          return <div dangerouslySetInnerHTML={<br />} />;
        } else if (domNode.name.match(/^h[1-6]/i)) {
          const headingLevel = Number(domNode.name.charAt(1));
          return (
            <React.Fragment key={domNode.index}>
              <br key={"break"} />
              {React.createElement(`h${headingLevel}`, {
                key: domNode.index,
                dangerouslySetInnerHTML: { __html: domNode.innerHTML },
              })}
            </React.Fragment>
          );
        } else if (
          domNode.name === "div" &&
          domNode.attribs.class === "iframely-embed"
        ) {
          const iframeDiv = domNode.querySelector(".iframely-responsive");
          if (iframeDiv) {
            const anchorElement = iframeDiv.querySelector(
              "a[data-iframely-url]"
            );
            if (anchorElement) {
              const iframeUrl = anchorElement.getAttribute("data-iframely-url");
              return (
                <div key={domNode.index} className="iframe-container">
                  <iframe src={iframeUrl} className="iframeStyle" />
                </div>
              );
            }
          }
        } else if (domNode.name === "figure") {
          const srcAttribute = domNode.srcAttribute || "";
          const altAttribute = domNode.altAttribute || "";
          return (
            <div className="imgContainer">
              <img
                className="imgStyle"
                key={domNode.index}
                src={srcAttribute}
                alt={altAttribute}
              />
            </div>
          );
        }
      },
    };

    const parsedContent = ReactHtmlParser(bodyContents, options);

    return (
      <div className="post-details-body">
        {parsedContent.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>
    );
  };

  const post = data.microcmsInformation;
  const emailBody = `記事を共有します。\n`;

  return (
    <Layout>
      <SEO title={post.title} />
      <Helmet>
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image.url} />
        <meta
          property="og:url"
          content={`https://devpediacode.com/information/${post.category.category}/${post.id}`}
        />
      </Helmet>

      <div className="post-container">
        <article className="post-article">
          <header className="post-header">
            <h1 className="post-details-title-font">{post.title}</h1>
            <p className="dateStyle">{`Posted at ${post.date}`}</p>
          </header>

          <div className="post-content">
            {parseContent(post.body)}
          </div>

          <div className="editorial">
            <h3>
              <b>DevpediaCode編集部</b>
            </h3>
            <p>
              DevpediaCodeはWeb、AIなどプログラムに関する最新ITテーマの情報を発信するメディアです。
            </p>
            <p>お問合せ下記のURLからお願いします。</p>
            <a href="https://devpediacode.com/contact" target="_blank" rel="noopener noreferrer">
              https://devpediacode.com/contact
            </a>
          </div>

          <div className="back-link-row">
            <Row>
              <Col>
                <Link to="/information" className="btn btn-primary back-link-design">
                  記事一覧へ戻る
                </Link>
              </Col>
              <Col className="d-flex justify-content-end">
                <div className="details-share-button-container d-flex align-items-center">
                  <span style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>
                    Share:
                  </span>
                  <FacebookShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                    quote={post.title}
                    hashtag="#DevpediaCode"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} hashtag="#DevpediaCode">
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LineShareButton url={shareUrl}>
                    <LineIcon size={32} round />
                  </LineShareButton>
                  <EmailShareButton
                    url={shareUrl}
                    subject="Devpediacodeの記事一覧共有"
                    body={emailBody}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              </Col>
            </Row>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default InformationPost;

export const query = graphql`
  query($id: String!) {
    microcmsInformation(id: { eq: $id }) {
      id
      title
      date(formatString: "YYYY 年 MM 月 DD 日")
      image {
        url
      }
      author {
        author
      }
      body
      category {
        category
      }
    }
  }
`;
