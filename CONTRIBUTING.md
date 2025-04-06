# コントリビューションガイド

## 作業フロー

1. Issueを作成
    - 既にある場合はテンプレートをよく読み、埋めるべき場所は埋める
    - Assigneesに担当者を指定する
    - Labelを設定する。 [Labelの付け方](./CONTRIBUTING.md#labelの付け方)
2. `issue/${Issue番号}`でブランチを作成する。
    > **必ず`main`ブランチを更新した後、ブランチを切ること。**
    > 
    > [ブランチの切り方](./CONTRIBUTING.md#ブランチを切る)

3. プルリクエストを作成し、テンプレートの内容を埋める.　書き方は[既存のもの](https://github.com/KobayaClanguage/find-the-object-game-v2/pull/19)を真似る。

4. Discordの`req-review-and-question`チャンネルに以下のフォーマットでレビュー依頼を投稿する。
    ```
    @${レビュー依頼先}
    Issue${Issue番号}: ${変更内容の簡潔な説明}
    レビューお願いします。
    ${プルリクエストURL}
    ```
  

## ブランチを切る

ブランチの切り方
```bash
git branch --contains # mainブランチにいるか確認
git pull              # リモートのmainブランチの内容をローカルに反映
git checkout -b issue/${Issue番号} # ブランチを切る
```

## Labelの付け方

- Backendタスクやロジックのタスクなら`Backend`、フロントエンドタスクなら`Frontend`のラベルをつけてください。
- 作業開始時に`In Progress`のラベルをつけてください。レビュー中には`Under Review`のラベルをつけてください。
- `main`ブランチへマージする前に、`In Progress`と`Under Review`のラベルはどちらも外してください。


## レビュー

かける時間は目安として1件**15分程度**としてください。
あくまで目安ではありますが、
15分以上になると、サイズの大きなプルリクエストを扱っているということになり、不健全です。
