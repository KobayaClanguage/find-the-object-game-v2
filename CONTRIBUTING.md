# コントリビューションガイド

## 作業フロー

> `${XXX}`となっている部分はXXXの内容を入れてください。
> 例：`issue/${Issue番号}`となっている際にIssue番号が123であれば、`issue/123`を作ることになります。
> 不明点があればDiscordで気軽に聞いてください。

1. Issueを作成
    - テンプレートの内容を埋める。
        > 書き方は[既存のもの](https://github.com/KobayaClanguage/find-the-object-game-v2/pull/19)を真似る。
    - Assigneesに担当者を指定する
    - Labelを設定する。 [Labelの付け方](./CONTRIBUTING.md#labelの付け方)

1. `issue/${Issue番号}`でブランチを作成する。
    > [ブランチの切り方](./CONTRIBUTING.md#ブランチの切り方)

2. プルリクエストを作成
   - テンプレートの内容を埋める
        > 書き方は[既存のもの](https://github.com/KobayaClanguage/find-the-object-game-v2/pull/19)を真似る。
    - Assigneesに担当者を指定する
    - Labelを設定する。 [Labelの付け方](./CONTRIBUTING.md#labelの付け方)

3. Discordの`req-review-and-question`チャンネルに以下のフォーマットでレビュー依頼を投稿する。
    ```
    @${レビュー依頼先}
    Issue${Issue番号}: ${変更内容の簡潔な説明}
    レビューお願いします。
    ${プルリクエストURL}
    ```
  
---

### ブランチの切り方

**必ず`main`ブランチを更新した後、ブランチを切ること。**

```bash
git branch --contains # mainブランチにいるか確認
git pull              # リモートのmainブランチの内容をローカルに反映
git checkout -b issue/${Issue番号} # ブランチを切る
```

### Labelの付け方

- Backendタスクやロジックのタスクなら`Backend`、フロントエンドタスクなら`Frontend`のラベルをつけてください。
- 作業開始時に`In Progress`のラベルをつけてください。レビュー中には`Under Review`のラベルをつけてください。
- `main`ブランチへマージする前に、`In Progress`と`Under Review`のラベルはどちらも外してください。


### レビュー

かける時間は目安として1件**15分程度**としてください。
あくまで目安ではありますが、
15分以上になると、サイズの大きなプルリクエストを扱っているということになり、不健全です。
