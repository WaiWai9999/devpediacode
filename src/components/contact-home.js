import React, { useState } from "react";
import { Link } from "gatsby";
import SEO from "../components/seo";
import "../style/layout.scss";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert("送信に失敗しました。もう一度お試しください。"));
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <SEO title="お問い合わせ" />
        <div className="contact-form-container">
          <h1>お問い合わせ</h1>
          <div className="contact-success">
            <h3>送信が完了しました</h3>
            <p>お問い合わせいただきありがとうございます。内容を確認の上、ご連絡いたします。</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <SEO title="お問い合わせ" />
      <div className="contact-form-container">
        <h1>お問い合わせ</h1>
        <p className="contact-description">
          下記フォームに必要事項をご記入の上、送信してください。
        </p>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              <input name="bot-field" />
            </label>
          </p>

          <div className="contact-field">
            <label htmlFor="name">お名前 <span className="contact-required">必須</span></label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="contact-field">
            <label htmlFor="company">会社名</label>
            <input type="text" id="company" name="company" />
          </div>

          <div className="contact-field">
            <label htmlFor="email">メールアドレス <span className="contact-required">必須</span></label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="contact-field">
            <label htmlFor="phone">電話番号</label>
            <input type="tel" id="phone" name="phone" />
          </div>

          <div className="contact-field">
            <label htmlFor="category">お問い合わせ種別 <span className="contact-required">必須</span></label>
            <select id="category" name="category" required>
              <option value="">選択してください</option>
              <option value="プログラミングに関する相談「WEB」">プログラミングに関する相談「WEB」</option>
              <option value="プログラミングに関する相談「AI」">プログラミングに関する相談「AI」</option>
              <option value="仕事の相談">仕事の相談</option>
            </select>
          </div>

          <div className="contact-field">
            <label htmlFor="message">お問い合わせ内容 <span className="contact-required">必須</span></label>
            <textarea id="message" name="message" rows="6" required></textarea>
          </div>

          <div className="contact-field contact-privacy">
            <label>
              個人情報の取り扱い <span className="contact-required">必須</span>
            </label>
            <label className="contact-checkbox-label">
              <input type="checkbox" name="privacy-agreement" required />
              <span>
                <Link to="/privacypolicy" className="contact-privacy-link">個人情報の取り扱い</Link>について同意します。
              </span>
            </label>
          </div>

          <div className="contact-submit">
            <button type="submit">送信する</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
