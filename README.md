# DevpediaCode

IT/AI の技術メモや最新情報を共有するブログサイトです。

**サイト:** https://devpediacode.com/

## 技術スタック

- **フレームワーク:** Gatsby (v2)
- **CMS:** microCMS
- **スタイリング:** Bootstrap 4 / Sass / Bootswatch
- **ホスティング:** Netlify
- **アナリティクス:** Google Analytics (gtag)

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/WaiWai9999/devpediacode.git
cd devpediacode

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run develop
```

## スクリプト

| コマンド | 説明 |
|---|---|
| `npm run develop` | 開発サーバーを起動 |
| `npm run build` | 本番ビルドを作成 |
| `npm run serve` | ビルド済みサイトをローカルで確認 |
| `npm run clean` | Gatsby キャッシュをクリア |
| `npm run format` | Prettier でコードを整形 |

## プロジェクト構成

```
src/
├── components/   # 共通コンポーネント (Header, Layout, SEO など)
├── images/       # 画像アセット
├── pages/        # ページコンポーネント (トップ, お問い合わせ, プライバシーポリシー など)
├── style/        # SCSS スタイル
└── templates/    # 記事テンプレート
```

## ライセンス

MIT
