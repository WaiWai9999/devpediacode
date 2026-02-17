import React from "react";
import { Link, graphql, navigate } from "gatsby";
import { Card } from "react-bootstrap";
import SEO from "../components/seo";
import Layout from "../components/layout";
import homeImg from "../images/home.png";
import "../style/layout.scss";

const IndexPage = ({ data }) => {
  const handleCategoryClick = category => {
    navigate("/information", {
      state: { category: category },
    });
  };

  const renderArticleCards = (articles, category) => {
    return (
      <div className="article-grid">
        {articles.map(({ node }) => (
          <Link
            key={node.id}
            to={`/information/${category}/${node.id}`}
            className="article-card-link"
          >
            <Card className="article-card">
              <div className="article-card-img-wrapper">
                <Card.Img
                  variant="top"
                  src={node.image.url}
                  className="article-card-img"
                />
              </div>
              <Card.Body className="article-card-body">
                <Card.Title className="article-card-title">
                  {node.title}
                </Card.Title>
                <span className="article-read-btn">
                  記事を読む →
                </span>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <SEO title="Home" />

      {/* Hero Section */}
      <section className="hero-section">
        <img src={homeImg} className="hero-img" alt="DevpediaCode" />
        <div className="hero-overlay">
          <h1 className="hero-title">DevpediaCode</h1>
          <p className="hero-subtitle">IT / AI の最新技術情報をお届け</p>
        </div>
      </section>

      {/* Category Sections */}
      <section className="category-section">
        <div className="category-header">
          <h2 className="category-label">WEB</h2>
          <button
            className="category-view-all"
            onClick={() => handleCategoryClick("WEB")}
          >
            すべて見る →
          </button>
        </div>
        {renderArticleCards(data.web.edges, "WEB")}
      </section>

      <section className="category-section">
        <div className="category-header">
          <h2 className="category-label">AI</h2>
          <button
            className="category-view-all"
            onClick={() => handleCategoryClick("AI")}
          >
            すべて見る →
          </button>
        </div>
        {renderArticleCards(data.ai.edges, "AI")}
      </section>

      {/* AdSense */}
      <div className="adsense-container">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1134938100904308"
          data-ad-slot="2867513240"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </script>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    ai: allMicrocmsInformation(
      limit: 4
      sort: { fields: date, order: DESC }
      filter: { category: { category: { eq: "AI" } } }
    ) {
      edges {
        node {
          id
          date
          title
          category {
            category
          }
          image {
            url
            height
            width
          }
        }
      }
    }
    web: allMicrocmsInformation(
      limit: 4
      sort: { fields: date, order: DESC }
      filter: { category: { category: { eq: "WEB" } } }
    ) {
      edges {
        node {
          id
          date
          title
          category {
            category
          }
          image {
            url
            height
            width
          }
        }
      }
    }
  }
`;
