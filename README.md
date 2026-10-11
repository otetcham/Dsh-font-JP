# dsh-plugin-font-line-seed-jp

DeepSeek Harness (`dsh`) の Web GUI において、アプリケーション全体の表示フォントを **[LINE Seed JP](https://seed.line.me/index_jp.html)** に固定・統一する拡張プラグインです。

Google Fonts 経由で公式 Web フォント（LINE Seed JP）を読み込み、DSH の Web サーバー seam（`webServer.tapIndex`）を介して `index.html` の初回レンダリング時から適用されるため、フォントのちらつき（FOUT）なく美しいタイポグラフィを実現します。

---

## ✨ 特長

- **アプリ全体への一括適用**: UI 全体（ボタン、入力欄、サイドバー、モーダル等）のフォントファミリを `LINE Seed JP` に上書き
- **高速な Web フォント配信**: Google Fonts の最適化・サブセット配信（wght: 100, 400, 700, 900）を利用
- **非侵入的設計**: コアファイルを直接改変せず、DSH 公式のプラグインシステムおよび Cordis プラグインアーキテクチャに準拠
- **柔軟な設定**: フォントのウェイト指定やコードブロック（`pre`, `code`）への適用有無を設定可能

---

## 📦 インストール方法

### DSH CLI を使用する場合

DeepSeek Harness のプロファイル（通常は `web` プロファイル）にプラグインを追加します：

```bash
# GitHub リポジトリから直接追加
dsh plugin --profile web add github:otetcham/Dsh-font-JP
```

またはローカルディレクトリから直接リンク・追加する場合：

```bash
dsh plugin --profile web add ./path/to/Dsh-font-JP
```

### `cordis.patch.yml` に手動で追加する場合

DSH のプロファイル設定（`~/.dsh/profiles/web/cordis.patch.yml`）に以下を追記します：

```yaml
- insert:
  - id: dsh-plugin-font-line-seed-jp
    name: 'dsh-plugin-font-line-seed-jp'
    config:
      enabled: true
```

---

## ⚙️ オプション設定 (Configuration)

`cordis.patch.yml` 内の `config` で以下のオプションをカスタマイズできます：

| 設定項目 | 型 | デフォルト値 | 説明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | プラグインの有効/無効フラグ |
| `fontFamily` | `string` | `"LINE Seed JP", -apple-system, ...` | 適用するフォントスタック |
| `weights` | `number[]` | `[100, 400, 700, 900]` | Google Fonts から読み込むウェイト一覧 |
| `includeCodeBlocks` | `boolean` | `false` | `code`, `pre` 等のコードブロックも LINE Seed JP に統一するかどうか |

### 設定例 (`cordis.patch.yml`)

```yaml
- insert:
  - id: dsh-plugin-font-line-seed-jp
    name: 'dsh-plugin-font-line-seed-jp'
    config:
      enabled: true
      includeCodeBlocks: false
      weights:
        - 400
        - 700
```

---

## 🛠️ 開発・ビルド

```bash
# 依存パッケージのインストール
npm install

# TypeScript コンパイル
npm run build

# 監視ビルド
npm run watch
```

---

## 📄 ライセンス

- プラグインソースコード: [MIT License](LICENSE)
- フォントライセンス: [LINE Seed JP (OFL - SIL Open Font License 1.1)](https://seed.line.me/index_jp.html)
