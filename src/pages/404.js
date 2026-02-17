import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../style/layout.scss";

const NotFoundPage = () => (
  <Layout>
    <SEO title="ページが見つかりません" />
    <div className="not-found-container">
      <h1 className="not-found-title">ページが見つかりません</h1>
      <p className="not-found-description">
        お探しのページは移動または削除された可能性があります。<br />
        URLをご確認いただくか、以下のリンクからお探しください。
      </p>
      <div className="not-found-links">
        <Link to="/" className="btn btn-primary back-link-design">
          ホームへ戻る
        </Link>
        <Link to="/information" className="btn btn-outline-primary not-found-btn-outline">
          記事一覧を見る
        </Link>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
