import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login(props) {

    //アカウント名入力
    const [input_account, setAccount] = useState('');
    //パスワード入力
    const [input_password, setPassword] = useState('');

    //パスワード可視化 見えない'no' 見える'yes'
    const [pass_watch, setWatch] = useState('no')

    //ログイン選択中かどうか 選択login_yes 選択していないlogin_no 新規登録logup
    const [login, setLogin] = useState('login_no')
    
    //↑の状態を変更する
    const LoginChange = (login_change) => {

        //データをとってくる
        if (login_change == 'yes') {
            props.data_catch
        }

        //入力内容をリセットする
        setAccount('');
        setPassword('');
        setWatch('no');
        //注意書きをなくす
        props.mistake_erase();

        //状態変換
        setLogin(login_change);
        //色を変える
        if(login_change=='login_no'){
        props.set_login_click('no');
        }
        else{
            props.set_login_click('yes');
        }
    }

    //入力内容を変更する
    //input_what→どこが書き換えられたか　input_id→書き換えられたもののid
    const InputChange = (input_what, input_id) => {

        //idをもとにして書き換えられた値をとってくる
        const input_write = document.getElementById(input_id).value;

        //input_whatでどこが書き換えられたかを判別する
        if (input_what == 'input_account') {
            //表示内容を変更する
            setAccount(input_write)
            //注意書きをなくす
            props.mistake_erase();
        }
        else if (input_what == 'input_password') {
            //表示内容を変更する
            setPassword(input_write);
            //注意書きをなくす
            props.mistake_erase();
        }
    }

    //パスワードを見れるようにする
    const PassWatchChange = (e) => {
        if (pass_watch == 'no') {
            setWatch('yes');
        }
        else {
            setWatch('no');
        }
    }

    return (
        <div>
            {/* ログインボタン作成 */}
            {login == 'login_no' ?
                //ログインボタンが押されていない場合
                <button onClick={() => { LoginChange('login_yes') }} className="login_button">ログイン</button>
                :
                //ログインか新規登録か
                login == 'login_yes' ?
                    //ログインボタンが押されてから
                    <div>

                        <div className="login_input">
                            <p id="login_edit">ログイン</p>
                            {/* 閉じるボタン */}
                            <div className="close_button">
                                <button
                                    onClick={() => { LoginChange('login_no') }}
                                    className="button_frame_delete"
                                >
                                    ✕</button>
                            </div>

                            {/* 境界線を作成 */}
                            <div id="border_edit">
                                ＿＿＿＿＿＿＿＿＿＿
                            </div>

                            <ul className="liststyle_none">
                                {/* アカウント名を入力する */}
                                <li className="account_password">
                                    <div>
                                        <span>アカウント名:</span>
                                        <input
                                            type="text"
                                            value={input_account}
                                            onChange={() => { InputChange('input_account', "Account") }}
                                            className="login_input_fontsize"
                                            id="Account"
                                        />
                                        {/* 間違っていた時の注意を記載 */}
                                        <div>
                                            {props.mistake == 'アカウント名が間違っています！' ?
                                                <p className="attention">※{props.mistake}</p> :
                                                <div></div>
                                            }
                                        </div>
                                    </div>
                                </li>
                                {/* パスワードを入力する */}
                                <li className="account_password">
                                    <div>
                                        <span>パスワード　:</span>
                                        <input
                                            //パスワードが見えるかどうか変更 typeの値を変える
                                            type={pass_watch == 'no' ? "password" : "text"}
                                            value={input_password}
                                            onChange={() => { InputChange('input_password', "Password") }}
                                            className="login_input_fontsize"
                                            id="Password"
                                        />
                                        {/* パスワードを見れるようにするボタン */}
                                        <button onClick={PassWatchChange} className="button_frame_delete" id="eye">
                                            {pass_watch=='no'?<VisibilityIcon />:<VisibilityOffIcon />}
                                        </button>
                                        {/* 間違っていた時の注意を記載 */}
                                        <div>
                                            {props.mistake == 'パスワードが間違っています！' ?
                                                <p className="attention">※{props.mistake}</p> :
                                                <div></div>
                                            }
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            {/* 確認ボタン 何か値が入力されていたら表示する */}
                            {(input_account != '' && input_password != '') ?
                                <div>

                                    {/* 位置の調節 */}
                                    <span id="control_position_confirmation">　</span>

                                    <button onClick={() => {
                                        props.can_start(input_account, input_password)
                                    }
                                    }
                                        className="login_input_fontsize"
                                        id="confirmation_button"
                                    >確認</button>
                                </div>
                                :
                                <div id="please_input">※入力してください</div>
                            }

                            {/* 境界線を作成 */}
                            <div id="border_edit">
                                ＿＿＿＿＿＿＿＿＿＿
                            </div>

                            <p id="come_on">初めての方はこちら

                                {/* 位置調整 */}
                                <span>👉　</span>
                                <button onClick={() => { LoginChange('logup') }}
                                    className="login_input_fontsize"
                                    id="entry_account"
                                >アカウント登録</button>
                            </p>
                        </div>
                    </div>
                    :
                    //新規登録画面
                    <div>
                        {/* フレームを作成 */}
                        <div className="login_input">
                            <p id="account_create">アカウント作成</p>

                            {/* 閉じるボタン */}
                            <div className="close_button">
                                <button onClick={() => { LoginChange('login_no') }}
                                    className="button_frame_delete"
                                >
                                    ✕</button>
                            </div>

                            {/* 境界線を作成 */}
                            <div id="border_edit">
                                ＿＿＿＿＿＿＿＿＿＿
                            </div>

                            <ul className="liststyle_none">
                                {/* アカウント名を入力 */}
                                <li className="account_password">
                                    <div>
                                        アカウント名<input
                                            type="text"
                                            value={input_account}
                                            onChange={() => { InputChange('input_account', "Account") }}
                                            className="login_input_fontsize"
                                            id="Account"
                                        />

                                        {props.mistake != false ?
                                            <p className="attention">
                                                ※{props.mistake}
                                            </p>
                                            :
                                            <p></p>
                                        }
                                    </div>
                                </li>
                                {/* パスワードを入力 */}
                                <li className="account_password">
                                    <div>
                                        <span>パスワード　</span>
                                        <input
                                            //パスワードを見れるかどうか　typeの値を変更
                                            type={pass_watch == 'no' ? "password" : "text"}
                                            value={input_password}
                                            onChange={() => { InputChange('input_password', "Password") }}
                                            className="login_input_fontsize"
                                            id="Password"
                                        />
                                        {/* パスワードの可視化切り替え */}
                                        <button onClick={PassWatchChange} className="button_frame_delete" id="eye">
                                        {pass_watch=='no'?<VisibilityIcon />:<VisibilityOffIcon />}
                                        </button>

                                        {/* パスワードの文字数指定 */}
                                        <p
                                            className={input_password.length >= 8 && input_password.length <= 20 ? "" : "attention"}
                                        >※8文字以上20文字以下で設定してください</p>
                                    </div>
                                </li>
                            </ul>

                            {/* 登録ボタン */}
                            {/* 正しく入力されていたら */}

                            {/* 位置の調節 */}
                            <div id="control_position_entry">
                            {(input_account != '' && input_password != '' && input_password.length >= 8 && input_password.length <= 20) ?
                                <span>

                                    <button onClick={() => { props.entry(input_account, input_password) }}
                                    className="login_input_fontsize"
                                    id="entry_button"
                                    >登録</button>
                                </span>
                                :
                                <span>
                                    <button
                                    className="login_input_fontsize"
                                    id="entry_button_no"
                                    >登録</button>
                                </span>
                            }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}