# 九九の読み上げ練習アプリ

小学生向けの**九九の読み上げ練習**を楽しく学べるWebアプリケーションです。アレイ図（配列図）で視覚的に理解しながら、音声読み上げ機能で正しい読み方を学習できます。

![九九の読み上げ練習アプリ](https://img.shields.io/badge/算数-九九の読み上げ-blue) ![対象学年](https://img.shields.io/badge/対象-小学2〜3年生-green) ![ライセンス](https://img.shields.io/badge/license-MIT-orange)

## 🎯 対象

- **小学2〜3年生**を主な対象とした算数学習アプリ
- 九九を覚えたい、または定着させたい児童
- 学校や家庭での自主学習、宿題サポートに最適
- タブレット（iPad等）での使用を推奨

## ✨ 主な機能

### 📚 3つの練習モード

1. **上がり九九** - 1×段から9×段まで順番に練習
2. **下がり九九** - 9×段から1×段まで逆順に練習
3. **バラバラ九九** - ランダムな順序で練習（定着度確認に最適）

### 🔢 段の選択

- **1の段から9の段まで全対応**
- お子様のレベルに合わせて自由に選択可能
- 苦手な段を集中的に練習できる

### 👁️ アレイ図（配列図）による視覚的理解

- 九九の構造を視覚的に表現
- かけられる数（ピンク）とかける数（青）で色分け
- ドットが光ることで答えの個数が一目でわかる
- アレイ図の表示/非表示を切り替え可能

### 🔊 音声読み上げ機能

- 問題の読み上げ（例：「にさん　が」）
- 答えの読み上げ（例：「ろく」）
- 正しい九九の読み方を耳で学習
- 効果音でフィードバック

### 🎓 学習サポート機能

- **スタート→つぎ**の簡単な操作
- 問題を見る→答えを見る のサイクルで反復学習
- 設定変更時に自動リセットで安心

## 🚀 使い方

### 基本的な流れ

1. **段の数を選択**
   - 1の段から9の段までから選択

2. **れんしゅうのしかたを選択**
   - 上がり九九・下がり九九・バラバラ九九から選択

3. **「スタート」ボタンをクリック**
   - 選択した段と練習方法で準備完了

4. **「つぎ」ボタンで進める**
   - 1回目：問題表示（答えは「?」）
   - 2回目：答え表示
   - 繰り返して9問を練習

### チェックボックス

| 項目 | 機能 |
|------|------|
| **アレイ図** | アレイ図の表示/非表示を切り替え |

### ボタン説明

| ボタン | 機能 |
|--------|------|
| **さいしょから** | ページを読み込み直してリセット |
| **スタート** | 選択した段と練習方法で開始 |
| **つぎ** | 次の問題または答えを表示 |

## 🛠️ 技術仕様

### 使用技術

#### フロントエンド
- **HTML5** - セマンティックマークアップ、構造化データ
- **CSS3** - レスポンシブデザイン、Flexbox、Grid Layout、色弱対応の配色
- **JavaScript (ES6+)** - モジュール、アロー関数、テンプレートリテラル

#### ライブラリ
- **Howler.js** - Web Audio API ベースの音声ライブラリ

### ファイル構成

```
kuku_yomiage/
├── index.html              # メインHTML（SEO対策済み）
├── style.css               # スタイルシート（レスポンシブ対応）
├── main.js                 # メインロジック
├── se.js                   # 効果音管理
├── howler.min.js           # Howler.js ライブラリ
├── Sounds/
│   ├── pi.mp3              # 操作音
│   ├── set.mp3             # 設定音
│   ├── seikai.mp3          # 正解音
│   └── alert.mp3           # アラート音
└── README.md               # このファイル
```

### 主な機能の実装

#### 1. アレイ図の生成

```javascript
function createArray() {
  TBL.innerHTML = '';
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 9; col++) {
      const td = document.createElement('td');
      const dot = document.createElement('div');
      dot.className = 'array-dot';
      dot.setAttribute('data-row', row + 1);
      dot.setAttribute('data-col', col + 1);
      td.appendChild(dot);
      tr.appendChild(td);
    }
    TBL.appendChild(tr);
  }
}
```

#### 2. ドットの点灯制御

```javascript
function lightArray(rows, cols) {
  const dots = TBL.querySelectorAll('.array-dot');
  dots.forEach(dot => dot.classList.remove('lit'));

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const dot = TBL.querySelector(`.array-dot[data-row="${row}"][data-col="${col}"]`);
      if (dot) {
        dot.classList.add('lit');
      }
    }
  }
}
```

#### 3. 九九の読み上げデータ

- 配列に全ての読み方を格納
- 段と位置から適切な読み方を取得
- 音声再生と連動

#### 4. 色弱対応

- 青（#2563eb）とオレンジ（#f57c00）の組み合わせ
- 明度差と彩度差を確保
- 赤緑色弱の方でも区別しやすい配色

### レスポンシブブレークポイント

- **〜480px**: スマホ
- **768px〜1024px**: タブレット（最適化）
- **1025px〜**: デスクトップ

### ブラウザ対応

- Google Chrome (推奨)
- Safari (iOS Safari含む)
- Microsoft Edge
- Firefox

## 📦 インストール・起動方法

### 1. クローン

```bash
git clone https://github.com/yourusername/kuku-yomiage.git
cd kuku-yomiage
```

### 2. ローカルサーバーで起動

```bash
# Python 3の場合
python -m http.server 8000

# Node.jsのhttp-serverの場合
npx http-server
```

### 3. ブラウザでアクセス

```
http://localhost:8000
```

または、`index.html`を直接ブラウザで開くことも可能です。

## 🎨 カスタマイズ

### 効果音の変更

`Sounds/` フォルダ内のmp3ファイルを差し替え

### アレイ図のサイズ調整

`style.css` の `.array-display td` を編集：

```css
.array-display td {
  height: 40px;  /* お好みの値に変更 */
  width: 40px;
}
```

### 色の変更

`style.css` で以下の色を変更：

```css
#hijousu { color: #ec4899; }  /* 被乗数（ピンク） */
#jousu { color: #2563eb; }    /* 乗数（青） */
#seki { color: #f57c00; }     /* 答え（オレンジ） */
```

## 🔧 トラブルシューティング

### 音が鳴らない

- ブラウザの音声がミュートになっていないか確認
- モバイルブラウザでは初回タップ後に音声が有効化されます

### アレイ図が表示されない

- 「アレイ図」チェックボックスがオンになっているか確認
- ブラウザを最新版に更新してください

## 🌟 今後の改善予定

- [ ] 達成度の記録・グラフ表示
- [ ] タイマー機能
- [ ] 複数ユーザー対応
- [ ] PWA化（オフライン対応）
- [ ] 英語版の追加

## 📄 ライセンス

MIT License

## 👨‍💻 開発者

開発者: Jimitas
GitHub: [https://github.com/jimitas](https://github.com/jimitas)
Website: [https://jimitas.com](https://jimitas.com)

## 🙏 謝辞

- Howler.js - 音声ライブラリ
- Claude (Anthropic) - コード生成支援

---

## 📈 SEO キーワード

九九 アプリ, 九九 練習, 九九 読み上げ, 九九 覚え方, 九九表, かけ算 九九, 小学生 九九, 算数 九九, 九九 暗記, アレイ図, 配列図, 上がり九九, 下がり九九, バラバラ九九, 小学2年生 算数, 小学3年生 算数, 算数 学習アプリ, 無料 教育アプリ, オンライン学習, jimitas.com

**Keywords**: multiplication tables, times tables, Japanese education app, array diagram, elementary school math, learning app, tablet learning

---

⭐ このプロジェクトが役に立った場合は、GitHubでスターをお願いします！
