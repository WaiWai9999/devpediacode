import React, { useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Link, graphql } from "gatsby";
import { uniqBy } from "lodash";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../style/layout.scss";

const InformationPage = ({ location, data }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    location.state && location.state.category ? location.state.category : null
  );

  const categories = uniqBy(
    data.allMicrocmsInformation.edges.map(({ node }) => node.category),
    "category"
  );

  const handleCategorySelect = category => {
    if (category === selectedCategory) {
      return;
    }
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <SEO title="記事一覧" />

      <div className="info-page-header">
        <Row>
          <Col>
            <h1 className="info-page-title">記事一覧</h1>
          </Col>
        </Row>
      </div>

      <div className="info-category-row info-button-row">
        <button
          className={`info-category-link ${
            selectedCategory === null ? "active" : ""
          }`}
          onClick={() => handleCategorySelect(null)}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.category}
            className={`info-category-link ${
              selectedCategory === category.category ? "active" : ""
            }`}
            onClick={() => handleCategorySelect(category.category)}
          >
            {category.category}
          </button>
        ))}
      </div>

      <Row className="info-row">
        {data.allMicrocmsInformation.edges
          .filter(
            ({ node }) =>
              !selectedCategory || node.category.category === selectedCategory
          )
          .map(({ node }) => (
            <Col xs={12} md={6} key={node.id}>
              <Card className="info-card">
                <Card.Body className="info-card-body">
                  <div style={{ flex: 1 }}>
                    <div className="info-card-title">
                      <Card.Title>
                        <Link
                          className="card-title-link"
                          to={`/information/${node.category.category}/${node.id}`}
                        >
                          {node.title}
                        </Link>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        <p className="post-date">{node.date}</p>
                      </Card.Subtitle>
                    </div>
                  </div>
                  <div>
                    <Card.Img
                      variant="top"
                      src={node.image.url}
                      alt={node.title}
                      className="info-card-img"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <div className="back-link-row">
        <Link to="/" className="btn btn-primary back-link-design">
          ホームへ戻る
        </Link>
      </div>
    </Layout>
  );
};

export default InformationPage;

export const query = graphql`
  query MyQuery {
    allMicrocmsInformation(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          exerpt
          body
          title
          date(formatString: "YYYY 年 MM 月 DD 日")
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
