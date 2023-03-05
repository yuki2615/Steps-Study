//クイズplay中の画面表示

import styles from '../styles/quiz.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { Quizdata } from 'components/quizdata';
import TF_Quiz from '@/components/TF_quiz';
import { SportsGymnastics } from '@mui/icons-material';

//props.start_numberは最初の問題が何題目か
//props.finishはクイズ画面を終了できる
export default function Quizscene(props) {

    //ランダム
    let random = props.start_number;

    //画面遷移に使う
    //答える→choose_scene 解答表示→answer_scene 結果画面→result_scene
    const [scene, setScene] = useState('choose_scene');

    //クイズの問題をランダムで選ぶために使う
    const [num, setNum] = useState(props.start_number);

    //クイズに何回答えたか数える
    const [count, setCount] = useState(0);

    //クイズが正答かどうかを確かめるために使う
    const [true_false, setTF] = useState('');

    //クイズの正答数
    const [truenum, setTruenum] = useState(0);

    //出された問題を記録
    const [memory, setMemory] = useState(["問題記録"])

    //クイズ解答後
    const Ascertain = (answer) => {

        //今出された問題を記録する
        setMemory([...memory, num]);

        //クイズの答え合わせ
        //setTFで正解だったらT、不正解だったらFにする
        if (answer == Quizdata[num]['true_answer']) {
            setTF('T');
            //クイズの正答数+1
            setTruenum(truenum + 1);
            //画面のbackground-colorを変更
            props.change_scene('answer_scene_T')
        }
        else {
            setTF('F');
            //画面のbackground-colorを変更
            props.change_scene('answer_scene_F')
        }

        //クイズ回答数を＋１
        setCount(count + 1);

        //クイズの解答を表示する画面へ
        setScene('answer_scene');
    }

    //次の問題へ画面偏移
    const Nextquestion = (e) => {

        //ランダムに値を入れる　ただし、一回出された問題は出さないようにする
        //記録しているのはmemory
        //memoryにランダム選出の値があるかを判別し、あった場合もう一度ランダムに値を決める
        while (memory.indexOf(random) != (-1)) {
            random = Math.floor(Math.random() * 15);
        }
        setNum(random);
        //既出の問題を判別ここまで

        //選択画面に画面遷移する
        setScene("choose_scene");

        //画面のbackground-colorを変更する
        props.change_scene('choose_scene');
    }

    //クイズ解き終わりました→画面遷移
    const Result = (e) => {
        //画面のback-ground-colorを変更する
        props.change_scene('result_scene');
        //結果画面に画面遷移
        setScene("result_scene");
    }

    //答える画面
    if (scene == 'choose_scene') {
        return (
            <div>
                {/* css設定 */}
                <span className={styles.choose_top}>　</span>

                {/*「問題」表示*/}
                <div>
                    <h1 className={styles.theme}>第{count + 1}問</h1>
                </div>

                {/*問題文表示*/}
                <div className={styles.question}>

                    {Quizdata[num]['question'].map((value, key) => {
                        return (
                            <div key={key}>{value}</div>
                        )
                    })}

                </div>

                {/*解答ボタン表示*/}
                <div>
                    {/* answerbuttonA(B,C,D)で文字の位置等を指定 */}
                    <span className={styles.answerbuttonA}>
                        {/* answerbuttonでボタンの位置、大きさを指定 */}
                        {/* クリックしたらAscertainへ移動 */}
                        <button id={styles.answerA} onClick={() => Ascertain(Quizdata[num]['answerA'])}>
                            {/* buttonsentenceでボタンの文章を左に寄せる */}
                            <span id={styles.buttonsentence}>A,{Quizdata[num]['answerA']}</span>
                        </button>
                    </span>

                    <span className={styles.answerbuttonB}>
                        <button id={styles.answerB} onClick={() => Ascertain(Quizdata[num]['answerB'])}>
                            <span id={styles.buttonsentence}>B,{Quizdata[num]['answerB']}</span>
                        </button>
                    </span>

                    <span className={styles.answerbuttonC}>
                        <button id={styles.answerC} onClick={() => Ascertain(Quizdata[num]['answerC'])}>
                            <span id={styles.buttonsentence}>C,{Quizdata[num]['answerC']}</span>
                        </button>
                    </span>

                    <span className={styles.answerbuttonD}>
                        <button id={styles.answerD} onClick={() => Ascertain(Quizdata[num]['answerD'])}>
                            <span id={styles.buttonsentence}>D,{Quizdata[num]['answerD']}</span>
                        </button>
                    </span>
                </div>
                {/* 解答ボタン表示終了 */}
            </div>
        )
    }

    //解答が表示される画面
    else if (scene == 'answer_scene') {

        //クイズ問題を一定数といていない
        //一回につき10問解くとする
        return (

            <div>
                {/* 正解不正解を記述 */}
                <TF_Quiz tf={true_false} />

                {/* イラストを表示 */}
                {true_false == 'T' ?
                    <div>
                        <Image src="/cracker_left.png" alt="cracker_left" width={250} height={250} className={styles.illustration_left} />
                        <Image src="/cracker_right.png" alt="cracker_right" width={250} height={250} className={styles.illustration_right} />
                    </div>
                    :
                    <div>
                        <Image src="/shock_left.png" alt="shock_left" width={250} height={250} className={styles.illustration_left} />
                        <Image src="/shock_right.png" alt="shock_right" width={250} height={250} className={styles.illustration_right} />
                    </div>
                }

                {/* 問題文と答えを表示 */}
                <div className={styles.open_answer}>
                    <p id={styles.item_font}>＜答え＞</p>
                    <p id={styles.answer_font}>{Quizdata[num]["true_answer"]}</p>
                </div>

                {/* 説明文記述 */}
                <div className={styles.explain}>
                    <p id={styles.item_font}>＜解説＞</p>
                    {Quizdata[num]["explain"].map((value, key) => {
                        return (
                            <p id={styles.explain_font} key={key}>{value}</p>
                        )
                    })}
                </div>

                {/* 最後の問題か否か */}
                {count < props.what_count ?
                    <div>
                        {/* 次の問題へボタン */}
                        <div>
                            <button
                                className={styles.nextquestion}
                                onClick={Nextquestion}
                            >次へ⇒</button>
                        </div>

                        {/* クイズを中断 */}
                        <div>
                            <button
                                className={styles.break_button}
                                onClick={Result}
                            >
                                ✕
                                <span id={styles.break_font}> 中断</span>
                            </button>
                        </div>
                    </div> :
                    <div>
                        {/* 結果画面へ移動 */}
                        <div>
                            <button
                                /* classNameに変更する cssの名前も変える */
                                className={styles.nextquestion}
                                onClick={Result}
                            >結果へ</button>
                        </div>
                    </div>
                }
            </div>
        )
    }

    //結果を表示
    else if (scene == "result_scene") {
        return (
            <div>
                {/* css設定 */}
                <span className={styles.result_top}>　</span>
                <p className={styles.result_font}>結果は・・・</p>

                {/*正解数を表示*/}
                {/*あとでclassNameを変更する*/}
                <ul className={styles.result_open} id="liststyle_none">
                    <li>
                        <span className={styles.result_truenum_item}>正答数　</span>
                        <span className={styles.result_truenum}
                            id={(truenum / count) >= 0.5 ? styles.result_red : styles.result_blue}
                        >{truenum}</span>
                        <span className={styles.result_count}> 問/{count}問
                        </span>
                    </li>
                    <li>
                        {/* 正解率 */}
                        <span className={styles.result_truenum_item}>正答率　</span>
                        <span
                            className={styles.result_percent}
                            id={(truenum / count) >= 0.5 ? styles.result_red : styles.result_blue}
                        >{Math.floor((truenum / count) * 1000) / 10}</span>
                        <span className={styles.result_count}> %</span>
                    </li>
                </ul>
                <div>
                    <button className={styles.quiz_finish_button}
                        //押すとクイズを終了できる
                        onClick={props.finish}
                    >クイズを終了</button>
                </div>
            </div>
        )
    }
}