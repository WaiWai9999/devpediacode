import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../style/layout.scss";

const abouthis = () => (
  <Layout>
    <SEO title="About This Site" />
    <div className="about-container">
      <h1>DevpediaCodeについて</h1>
      <h3>当サイトについて</h3>
      <p>
        DevpediaCodeはWeb、AIなどプログラムに関する最新ITテーマの情報を発信するメディアです。
        システム開発で調査した情報を中心に、同じシステムエンジニアやシステムエンジニアを目指す人の一助になれば幸いです。
      </p>
      <h3>当サイトのコンテンツについて</h3>
      <p>
        当サイトのソースコードなどは、利用者の責任をおいて自由に改変・配布を行うことができます。
        しかし当サイトの情報を利用にするにあたって発生した損害に対しては当サイトは一切の責任を負わないものとします。
        また当サイトのコンテンツを直接的な形で再利用する場合は、出典の明記を推奨します。
      </p>
      <h3>プライバシーポリシーについて</h3>
      <p>
        当社のプライバシーポリシーについては以下のリンクからご確認ください。
      </p>
      <p>
        <Link to={"/privacypolicy"}>プライバシーポリシーについて</Link>
      </p>
      <h3>お問い合わせ</h3>
      <p>
        当サイトに関するご意見、ご要望、ご質問に関しては以下のお問合せフォームからご連絡ください。
        個人情報に関してはプライバシーポリシーに沿って管理させて頂きます。
        また当サイトは取得した個人情報に勧誘や営業などのご連絡は致しません。
      </p>
      <p>
        <Link to={"/contact"}>お問い合わせ</Link>
      </p>
    </div>
  </Layout>
);

export default abouthis;
