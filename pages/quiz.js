//クイズ画面
import { useState } from 'react';
import styles from '../styles/quiz.module.css';
import Sidebar from '@/components/sidebar';
import Quizscene from 'components/quizscene';

export default function Quiz() {

    //クイズ中か否か判定するために使う
    const [play, setPlay] = useState('n')

    //クイズ中'y'　クイズ待機画面'n'
    const StartQuiz = (e) => {
        setPlay('y');
    }
    const FinishQuiz = (e) => {
        setPlay('n');
    }

    //最初の問題をランダムに選ぶために使う
    //20は問題数
    var number = Math.floor(Math.random() * 20);

    return (
        <div className="App">
            {/* サイドバー */}
            <Sidebar name="quiz" />

            {play == 'n' ?
                <div>
                    {/* クイズ始めるボタン */}
                    <div>
                        <button
                            className={styles.quizstart}
                            onClick={StartQuiz}
                        >
                            スタート
                        </button>
                    </div>
                </div>
                :
                <div>
                    <div>
                        {/* クイズの画面 */}
                        {/* start_numberで最初の問題指定 finishでクイズ待機画面へ移動できる */}
                        <Quizscene start_number={number} finish={FinishQuiz} />
                    </div>
                </div>
            }

        </div>
    )
}