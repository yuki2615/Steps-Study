import { prisma } from 'lib/prisma';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Login from 'components/login';

export default function App(props) {

  //利用するアカウントとパスワード(登録時も)
  const [myaccount, setMyaccount] = useState('');
  const [mypassword, setMypassword] = useState('');

  //アプリが利用できるか
  const [start, setStart] = useState('no');

  //注意書き アカウントorパスワードが間違っている
  const [mistake, setMistake] = useState('');
  //注意書きを変更 消す
  const MistakeErase = () => {
    setMistake('');
  }

  //user登録
  const UserEntry = (e) => {
    //登録するプログラムを書く
    fetch(
      '/api/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          E_account: myaccount,
          E_password: mypassword,
        })
      }
    )
      //resを受け取る    
      .then((res) => {
        return res.json();
      })
      //resを受け取ってからsetStartを実行
      .then((json) => {
        setStart('entry');
      });
  }

  //入力された値が登録されているかを確認する関数
  //Iはinputの略称
  const Can_Start = (I_account, I_password) => {

    //入力されたアカウント名が存在するかどうか
    const confirm_account = props.user_data.find((u) => u.name == [I_account]);

    if (confirm_account) {
      // データが存在した時の処理
      //そのアカウントのパスワードが正しいか
      if (confirm_account.password == I_password) {
        //正しい場合
        //使うアカウントを書き込む
        //アカウント:スタートボタンを表示させるときに名前として出力
        setMyaccount(I_account);

        //ログインボタンの表示の変化　indexのreturnの中身
        setStart('yes');
      }
      else {
        //正しくなかった場合
        //パスワードが間違っていることを注意する
        setMistake('パスワードが間違っています！')
      }
    } else {
      // データが存在しなかった時の処理
      // アカウント名が間違っていることを注意する
      setMistake('アカウント名が間違っています！')
    }
  }

  //登録できるか確認
  const CanEntry = (can_account, can_password) => {

    //データベースにそのアカウント名が登録されているか
    const exist = props.user_data.find((u) => u.name == [can_account]);

    if (exist) {
      //登録されていたら
      //アカウント名が登録されていることを伝える
      setMistake('このアカウント名は使用できません');
    }
    else {
      //登録されていなかったら
      //データをそれぞれ格納
      setMyaccount(can_account);
      setMypassword(can_password);

      //アカウントを登録するボタンの作成
      setStart('next');
    }

  }

  return (
    <div className="App">

      {/* ログイン機能 */}
      <div>
        <div>
          {start == 'no' ?
            //スタート機能
            <Login
              //アカウント等の確認の関数
              can_start={Can_Start}
              //注意書きを送る
              mistake={mistake}
              //注意書きを消すときに送る
              mistake_erase={MistakeErase}
              //登録
              entry={CanEntry}
            />
            :
            start == 'yes' ?
              <div className="login_input">
                <p id="login_complete">ログイン完了！</p>

                {/* 境界線を作成 */}
                <div id="border_edit">
                  ＿＿＿＿＿＿＿＿＿＿
                </div>

                <p className="account_password">このアカウントで始める</p>
                <p className="what_account">{myaccount} さん</p>
                {/* アプリのホームへ飛ばす */}
                {/* myIDを値として渡し、遷移先で誰が入ってきているかをわかるようにする */}
                
                {/* 位置の調節 */}
                <div id="control_position_loginstart">

                <Link href={{
                  pathname: "/home",
                  query: {
                    username: myaccount
                  }
                }}>
                  <button className="login_start">スタート</button>
                </Link>
                </div>

                {/* 閉じるボタン */}
                <div className="close_button">
                  <button
                    onClick={() => { setStart('no') }}
                    className="button_frame_delete"
                  >
                    ✕</button>
                </div>
              </div>
              :
              start == 'next' ?
                <div>
                  <p>登録完了しました！</p>
                  <p>アカウント:{myaccount}</p>
                  <p>パスワード:{mypassword}</p>

                  {/* ここでアカウントを登録する */}
                  <button onClick={UserEntry}>次へ</button>
                </div>
                :
                <div>
                  <p>{myaccount} さん</p>
                  <p>ご利用ありがとうございます！</p>
                  <Link href={{
                    pathname: "/home",
                    query: {
                      username: myaccount
                    }
                  }}>
                    <button>スタート</button>
                  </Link>
                </div>
          }
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {

  //familyテーブルから値を持ってくる
  const people = await prisma.family.findMany();

  return {
    props: {
      user_data: people
    }
  };
}