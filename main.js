'use strict';
/**
 * 九九の読み上げ練習アプリケーション
 * 黒板風UIで九九を練習
 */
import { pi, set, alert, seikai1 } from './se.js';

(function() {
  // DOM要素の取得
  const TBL = document.getElementById('TBL');
  const hijousu = document.getElementById('hijousu');
  const jousu = document.getElementById('jousu');
  const seki = document.getElementById('seki');
  const yomi_a = document.getElementById('yomi_a');
  const yomi_b = document.getElementById('yomi_b');
  const dan_kazu = document.getElementById('dan_kazu');
  const renshu = document.getElementById('renshu');
  const startBtn = document.getElementById('start');
  const nextBtn = document.getElementById('next');
  const arrayToggle = document.getElementById('arrayToggle');
  const arrayContainer = document.querySelector('.array-container');
  const resetBtn = document.getElementById('reset');

  // 九九の読み上げデータ
  const kukua = ["いんいち　が", "いんに　が", "いんさん　が", "いんし　が", "いんご　が", "いんろく　が", "いんしち　が", "いんはち　が", "いんく　が",
    "にいち　が", "ににん　が", "にさん　が", "にし　が", "にご", "にろく", "にしち", "にはち（には）", "にく",
    "さんいち　が", "さんに　が", "さざん　が", "さんし", "さんご", "さぶろく", "さんしち", "さんぱ", "さんく",
    "しいち　が", "しに　が", "しさん", "しし", "しご", "しろく", "ししち", "しは（しわ）", "しく",
    "ごいち　が", "ごに", "ごさん", "ごし", "ごご", "ごろく", "ごしち", "ごはち", "ごっく",
    "ろくいち　が", "ろくに", "ろくさん", "ろくし", "ろくご", "ろくろく", "ろくしち", "ろくは", "ろっく",
    "しちいち　が", "しちに", "しちさん", "しちし", "しちご", "しちろく", "しちしち", "しちは", "しちく",
    "はちいち　が", "はちに", "はちさん（はっさん）", "はちし（はっし）", "はちご", "はちろく", "はちしち", "はっぱ", "はっく",
    "くいち　が", "くに", "くさん", "くし", "くご", "くろく", "くしち", "くはち", "くく"];

  const kukub = ["いち", "に", "さん", "し", "ご", "ろく", "しち", "はち", "く",
    "に", "し", "ろく", "はち", "じゅう", "じゅうに", "じゅうし", "じゅうろく", "じゅうはち",
    "さん", "ろく", "く", "じゅうに", "じゅうご", "じゅうはち", "にじゅういち", "にじゅうし", "にじゅうしち",
    "し", "はち", "じゅうに", "じゅうろく", "にじゅう", "にじゅうし", "にじゅうはち", "さんじゅうに", "さんじゅうろく",
    "ご", "じゅう", "じゅうご", "にじゅう", "にじゅうご", "さんじゅう", "さんじゅうご", "しじゅう", "しじゅうご",
    "ろく", "じゅうに", "じゅうはち", "にじゅうし", "さんじゅう", "さんじゅうろく", "しじゅうに", "しじゅうはち", "ごじゅうし",
    "しち", "じゅうし", "にじゅういち", "にじゅうはち", "さんじゅうご", "しじゅうに", "しじゅうく", "ごじゅうろく", "ろくじゅうさん",
    "はち", "じゅうろく", "にじゅうし", "さんじゅうに", "しじゅう", "しじゅうはち", "ごじゅうろく", "ろくじゅうし", "しちじゅうに",
    "く", "じゅうはち", "にじゅうしち", "さんじゅうろく", "しじゅうご", "ごじゅうし", "ろくじゅうさん", "しちじゅうに", "はちじゅういち"];

  // 初期化
  let i = 0;
  let arr = [];
  let nextListener = null;
  let isStarted = false; // スタートボタンが押されたかどうか

  /**
   * アレイ図を作る操作（kuku_arrayスタイルのドット表示）
   */
  function createArray() {
    // 既存の行をクリア
    TBL.innerHTML = '';

    for (let row = 0; row < 9; row++) {
      const tr = document.createElement('tr');
      for (let col = 0; col < 9; col++) {
        const td = document.createElement('td');

        // ドット要素を作成
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

  /**
   * アレイ図のドットを点灯/消灯
   */
  function lightArray(rows, cols) {
    const dots = TBL.querySelectorAll('.array-dot');

    // 全てのドットを消灯
    dots.forEach(dot => dot.classList.remove('lit'));

    // 指定された範囲のドットを点灯
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const dot = TBL.querySelector(`.array-dot[data-row="${row}"][data-col="${col}"]`);
        if (dot) {
          dot.classList.add('lit');
        }
      }
    }
  }

  /**
   * 上部のかける数ボタンを生成
   */
  function createTopButtons() {
    const topButtons = document.getElementById('topButtons');
    if (!topButtons) return;

    topButtons.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.type = 'button';
      topButtons.appendChild(btn);
    }
  }

  /**
   * 左側のかけられる数ボタンを生成
   */
  function createLeftButtons() {
    const leftButtons = document.getElementById('leftButtons');
    if (!leftButtons) return;

    leftButtons.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.type = 'button';
      leftButtons.appendChild(btn);
    }
  }

  // 初期表示のアレイ図作成
  createArray();
  createTopButtons();
  createLeftButtons();

  // トースト表示（リロード毎に表示）
  setTimeout(showToast, 1000);

  /**
   * トースト通知を表示する関数
   */
  function showToast() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <button class="toast-close">&times;</button>
      <h4>れんしゅうのしかた</h4>
      <p>「だんの数」と「れんしゅうのしかた」をえらびます。</p>
      <p>「スタート」をおして、「つぎ」をおすとこたえが表示されます。</p>
      <p>くり返し読み上げて、九九をおぼえましょう。</p>
      <p>アレイ図のチェックをはずすと、式だけれんしゅうできます。</p>
    `;

    document.body.appendChild(toast);

    // アニメーションで表示
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // 閉じるボタンのイベント
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    });

    // 8秒後に自動で閉じる
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.classList.remove('show');
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }
    }, 8000);
  }

  // 初期状態で「つぎ」ボタンにアラート表示を設定
  nextBtn.addEventListener('click', () => {
    if (!isStarted) {
      alert.play();
      window.alert('まず「スタート」ボタンをおしてください');
    }
  });

  // 「さいしょから」ボタンに確認アラートを設定
  resetBtn.addEventListener('click', () => {
    if (window.confirm('ページをよみこみなおしますか？\nいまのれんしゅうはリセットされます。')) {
      window.location.reload();
    }
  });

  /**
   * 設定変更時のリセット処理
   */
  function resetOnSettingChange() {
    // スタート状態をリセット
    isStarted = false;

    // カウンターリセット
    i = 0;

    // 表示をクリア
    jousu.innerHTML = "";
    yomi_a.innerHTML = "";
    yomi_b.innerHTML = "";
    seki.innerHTML = "";

    // アレイ図をリセット
    const dots = TBL.querySelectorAll('.array-dot');
    dots.forEach(dot => dot.classList.remove('lit'));

    // 古いイベントリスナーを削除
    if (nextListener) {
      nextBtn.removeEventListener('click', nextListener);
      nextListener = null;
    }
  }

  // セレクトボックスに効果音を追加（だんの数）
  dan_kazu.addEventListener('change', () => {
    set.play();
    resetOnSettingChange();
  });

  // セレクトボックスに効果音を追加（れんしゅうのしかた）
  renshu.addEventListener('change', () => {
    set.play();
    resetOnSettingChange();
  });

  // アレイ図の表示切り替え
  arrayToggle.addEventListener('change', () => {
    set.play();
    if (arrayToggle.checked) {
      arrayContainer.classList.remove('hidden');
    } else {
      arrayContainer.classList.add('hidden');
    }
  });

  /**
   * スタートボタンがおされたとき
   */
  startBtn.addEventListener('click', () => {
    // 効果音を再生
    set.play();

    // カウンターリセット
    i = 0;

    // 表示をクリア
    hijousu.innerHTML = Math.floor(dan_kazu.value);
    jousu.innerHTML = "";
    yomi_a.innerHTML = "";
    yomi_b.innerHTML = "";
    seki.innerHTML = "";

    // アレイ図をリセット
    createArray();

    // かける数のセット
    arr = [];
    switch (renshu.value) {
      case "1":
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        break;
      case "2":
        arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        break;
      case "3":
        const bara = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let index = 0; index < 9; index++) {
          arr.push(...bara.splice(Math.floor(Math.random() * bara.length), 1));
        }
        break;
    }

    // 古いイベントリスナーを削除
    if (nextListener) {
      nextBtn.removeEventListener('click', nextListener);
    }

    // 次を押したときの動作
    nextListener = () => {
      // スタートボタンが押されていない場合は何もしない
      if (!isStarted) {
        return;
      }

      // 効果音を再生
      pi.play();

      let a = parseInt(hijousu.innerHTML);
      let b = arr[parseInt(i / 2)];

      if (i % 2 === 0) {
        // 問題を表示（答えを隠す）とアレイ図を点灯
        lightArray(a, b);

        jousu.innerHTML = b;
        seki.innerHTML = "?";
        yomi_a.innerHTML = kukua[(a - 1) * 9 - 1 + b];
        yomi_b.innerHTML = "？";
      } else {
        // 答えを表示（アレイ図はそのまま）
        seki.innerHTML = a * b;
        yomi_b.innerHTML = kukub[(a - 1) * 9 - 1 + b];

        // 最後の答えを表示した場合
        if (i === 17) {
          // 完了メッセージを表示
          setTimeout(() => {
            seikai1.play();
            window.alert('おつかれさまでした！\nべつのだんをえらんで、もういちどれんしゅうしましょう');
          }, 500);
        }
      }

      i = i + 1;
      if (i > 17) i = 0;
    };

    nextBtn.addEventListener('click', nextListener);

    // スタート状態をtrueにして「つぎ」ボタンを有効化
    isStarted = true;
    nextBtn.disabled = false;
  });

})();