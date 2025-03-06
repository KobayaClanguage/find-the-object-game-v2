# オブジェを探せゲーム

## 背景
<!-- 開発背景 -->
金沢市額地区における地域の発展を目標として額振興会と共同し、金沢工業大学額プロジェクトが「オブジェを探せゲーム」を提案した。本システムはゲーム内におけるオブジェを発見したことをQRコードを用いて記録する機能やエリア内のマップを表示するなどの役割を担うWebアプリケーションとして開発する。

## Usage
<!-- ローカルサーバーの起動方法等 -->
```bash
# bunのインストール
npm install bun
# bunで依存関係のインストール
bun install
# サーバー立ち上げ
bun dev
```

## 開発者向け
<!-- APIキーの管理方法等 -->
APIキーは`.env.local`に書き込んでください。
内容は`.env.exmaple`を参照してください。

## その他