//変数の初期化
let untyped = "";
let typed = ""; //入力済み文字列を入れる
let score = 0;

//必要なHTML要素の取得
const untypedfield = document.getElementById("untyped");
const typefield = document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");
const typeCount = document.getElementById("typecount");

//複数のテキストを格納する配列
const textLists = [
  "Hello World",
  "this is my App",
  "How are you?",
  "Today is sunny",
  "I love JavaScript!",
  "Good morning",
  "I am Japanese",
  "Let it be",
  "Samurai",
  "Typing Game",
  "Information Technology",
  "I want to be a programmer",
  "What day is today?",
  "I want to build a web app",
  "Nice to meet you",
  "Chrome Firefox Edge Safari",
  "machine learning",
  "Brendan Eich",
  "John Resig",
  "React Vue Angular",
  "Netscape Communications",
  "undefined null NaN",
  "Thank you very much",
  "Google Apple Facebook Amazon",
  "ECMAScript",
  "console.log",
  "for while if switch",
  "var let const",
  "Windows Mac Linux iOS Android",
  "programming",
];

//ランダムなテキストを表示------------------
const createText = () => {
  //正タイプした文字列をクリア
  typed = "";
  typefield.textContent = typed;

  //Math.floor()で小数点以下を切り捨てて０～２の整数値をランダムで取得する。
  let random = Math.floor(Math.random() * textLists.length); //textLists.lengthで配列のインデックス数を取得

  //配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

//キーの入力判定-------------------------------
const keyPress = (e) => {
  //誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add("mistyped"); //誤タイプしたらmistypedを追加して背景色を変更する

    //100ms後に背景色をもとに戻す
    setTimeout(() => {
      wrap.classList.remove("mistyped");
    }, 100);
    return;
  }

  //正タイプの場合
  score++; //スコアのインクリメント
  typed += untyped.substring(0, 1); //先頭文字を取得し、typedの末尾に追加
  untyped = untyped.substring(1); //2文字目以降の文字列を再代入する
  typefield.textContent = typed; //typefieldのtextContentプロパティに代入
  untypedfield.textContent = untyped; //unfieldのtextContentプロパティに代入

  typeCount.textContent = "入力回数:" + score;

  //テキストがなくなったら新しいテキストを表示
  if (untyped === "") {
    createText();
  }
};

//キーの入力された回数を表示する

//タイピングスキルのランクを判定
const rankCheck = (score) => {
  //テキストを格納する変数の作成
  let text = "";

  //スコアに応じて異なるメッセージをtextに格納
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nAランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }
  //生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

//ゲーム終了
const gameOver = (id) => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  //OKボタンをクリックされたらリロードする
  if (result == true) {
    window.location.reload();
  }
};

//カウントダウンタイマー
const timer = () => {
  //タイマー部分のHTML要素（ｐ要素）を取得
  let time = count.textContent;

  const id = setInterval(() => {
    //カウントダウン
    time--;
    count.textContent = time;

    //カウントが０になったらタイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

//ゲームスタート時の処理
start.addEventListener("click", () => {
  //カウントダウンタイマーを開始する
  timer();

  //ランダムなテキストを表示する
  createText();

  //スタートボタンを非表示にする
  start.style.display = "none";

  //キーボードのイベント処理
  document.addEventListener("keypress", keyPress);
});

untypedfield.textContent = "スタートボタンで開始";
