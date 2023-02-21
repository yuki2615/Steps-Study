//クイズplay中の画面表示

import styles from '../styles/quiz.module.css';
import { useState } from 'react';
import { Quizdata } from 'components/quizdata';
import TF_Quiz from '@/components/TF_quiz';

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
        }
        else {
            setTF('F');
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
            random = Math.floor(Math.random() * 20);
            console.log(memory)
        }
        setNum(random);
        //既出の問題を判別ここまで

        //選択画面に画面遷移する
        setScene("choose_scene");
    }

    //クイズ解き終わりました→画面遷移
    const Result = (e) => {
        //結果画面に画面遷移
        setScene("result_scene");
    }

    //答える画面
    if (scene == 'choose_scene') {
        return (
            <div>

                {/*「問題」表示*/}
                <div>
                    <h1 className={styles.theme}>問題</h1>
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
                        A,<button id={styles.answerbutton} onClick={() => Ascertain(Quizdata[num]['answerA'])}>
                            {/* buttonsentenceでボタンの文章を左に寄せる */}
                            <span id={styles.buttonsentence}>{Quizdata[num]['answerA']}</span>
                        </button>
                    </span>

                    <span className={styles.answerbuttonB}>
                        B,<button id={styles.answerbutton} onClick={() => Ascertain(Quizdata[num]['answerB'])}>
                            <span id={styles.buttonsentence}>{Quizdata[num]['answerB']}</span>
                        </button>
                    </span>

                    <span className={styles.answerbuttonC}>
                        C,<button id={styles.answerbutton} onClick={() => Ascertain(Quizdata[num]['answerC'])}>
                            <span id={styles.buttonsentence}>{Quizdata[num]['answerC']}</span>
                        </button>
                    </span>

                    <span className={styles.answerbuttonD}>
                        D,<button id={styles.answerbutton} onClick={() => Ascertain(Quizdata[num]['answerD'])}>
                            <span id={styles.buttonsentence}>{Quizdata[num]['answerD']}</span>
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
        if (count < 10) {
            return (
                <div>
                    {/* 正解不正解を記述 */}
                    <TF_Quiz tf={true_false} />

                    {/* 次の問題へボタン */}
                    <div>
                        <button
                            /* classNameに変更する cssの名前も変える */
                            id={styles.answerbutton}
                            onClick={Nextquestion}
                        >次の問題へ</button>
                    </div>

                    {/* クイズを中断 */}
                    <div>
                        <button
                            /* classNameを変更する */
                            className={styles.answerbuttonA}
                            onClick={Result}
                        >
                            クイズを中断
                        </button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    {/* 正解不正解を記述 */}
                    <TF_Quiz tf={true_false} />

                    {/* 結果画面へ移動 */}
                    <div>
                        <button
                            /* classNameに変更する cssの名前も変える */
                            id={styles.answerbutton}
                            onClick={Result}
                        >結果へ</button>
                    </div>
                </div>
            )
        }
    }

    //結果を表示
    else if (scene == "result_scene") {
        return (
            <div>
                {/*正解数を表示*/}
                {/*あとでclassNameを変更する*/}
                <div className={styles.bigT}>
                    {truenum}
                </div>
                <div>
                    {/*あとでclassNameを変更する*/}
                    <button className={styles.answerbuttonA}
                        //押すとクイズを終了できる
                        onClick={props.finish}
                    >クイズを終了する</button>
                </div>
            </div>
        )
    }
}