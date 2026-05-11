# q-league

九州女子サッカーリーグのチームおよび選手に関するオープンデータです。このリポジトリには、データを収集するためのスクレイパーと、選手一覧を表示するシンプルなウェブビューアーが含まれています。

## デモ

- [九州女子サッカーリーグ 選手一覧 (Player List Viewer)](https://code4fukui.github.io/q-league/)

## オープンデータ

- [**q-league.csv**](./q-league.csv): 全チームのリスト。所属リーグ、スタッフ、ユニフォームカラーなどの詳細情報を含みます。
- [**q-league-player.csv**](./q-league-player.csv): 全選手のリスト（ロースター）。氏名、ポジション、背番号、所属チームを含みます。

## 使い方

このプロジェクトでは、スクレイピングスクリプトの実行に [Deno](https://deno.land/) ランタイムを使用します。

1.  **チーム一覧の取得**

    このスクリプトは、メインのリーグ区分ページをスクレイピングして全チームのリストと各ページのURLを取得し、結果を `q-league-index.csv` に保存します。
    ```sh
    deno run -A scrape.js
    ```

2.  **チームおよび選手詳細の取得**

    このスクリプトは `q-league-index.csv` を読み込み、各チームのページにアクセスして詳細情報をスクレイピングします。最終的なデータセットとして `q-league.csv`（チーム詳細データ）と `q-league-player.csv`（選手データ）を生成します。
    ```sh
    deno run -A scrape2.js
    ```

3.  **データの表示**

    ウェブブラウザで `index.html` を開くと、選手データのインタラクティブでソート可能なテーブルを表示できます。

## データスキーマ

### `q-league.csv`

各チームの詳細情報を含みます。主な列は以下の通りです。
- `name`: チーム名
- `league`: 所属リーグ（例: 1部リーグ）
- `url`: 公式サイトのチームページURL
- `phrase`: チームのスローガン/フレーズ
- `director`: 監督/代表
- `coach`: コーチ
- `shirt_FP_main`, `shorts_FP_main`, `socks_FP_main`: フィールドプレーヤー（FP）のメインユニフォームカラー
- `shirt_FP_sub`, `shorts_FP_sub`, `socks_FP_sub`: フィールドプレーヤー（FP）のサブユニフォームカラー
- （ゴールキーパー（GK）のユニフォームカラーに対応する `_GK_` 列も存在します）

### `q-league-player.csv`

- `name`: 選手の氏名
- `position`: ポジション（例: GK, DF）
- `no`: 背番号
- `team_name`: 所属チーム名
- `team_league`: 所属チームのリーグ区分
- `url`: 選手のチームページURL

## 参考

- **データソース:** [九州女子サッカーリーグ公式サイト](https://q-league.net/)
- **スクレイピングライブラリ:** [scrapeutil.js](https://github.com/code4fukui/scrapeutil/)

## ライセンス

MIT
