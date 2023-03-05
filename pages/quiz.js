//クイズ画面
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/quiz.module.css';
import Sidebar from '@/components/sidebar';
import Quizscene from 'components/quizscene';

export default function Quiz() {

    const router = useRouter();

    //クイズ中か否か判定するために使う
    const [play, setPlay] = useState('n')

    //何問挑戦するか
    const [what_count, setWhatCount] = useState(0);

    //どの画面にいるか
    const [what_scene, setWhatScene] = useState('first');
    const WhatScene_Change = (scene) => {
        setWhatScene(scene);
    }

    //クイズ中'y'　クイズ待機画面'n'
    const StartQuiz = (number) => {
        setPlay('y');
        setWhatCount(number);
        //background-colorを変更
        setWhatScene('choose_scene');
    }
    const FinishQuiz = (e) => {
        setPlay('n');
        //background-colorを変更
        setWhatScene('first');
    }

    //最初の問題をランダムに選ぶために使う
    //15は問題数
    var number = Math.floor(Math.random() * 15);

    return (
        <div className={
            what_scene == 'first' ?
                styles.quiz_app_first
                : what_scene == 'choose_scene' ?
                    styles.quiz_app_choose
                    : what_scene == 'answer_scene_T' ?
                        styles.quiz_app_T
                        : what_scene == 'answer_scene_F' ?
                            styles.quiz_app_F
                            :
                            styles.quiz_app_result
        }>
            {/* サイドバー */}
            <Sidebar name="quiz" username={router.query.username} />

            {play == 'n' ?
                <div>
                    {/* タイトル */}
                    <div className={styles.simple_font}>
                        ╲ カンタン！╱
                    </div>
                    <div className={styles.disaster_quiz}>
                        <span id={styles.Disaster_quiz}>防災</span><span id={styles.disaster_Quiz}>クイズ</span>
                    </div>

                    {/* 問題数を決める */}

                    {/* クイズ始めるボタン */}
                    <div>
                        <div>
                            <button
                                className={styles.quizstart5}
                                onClick={()=>{StartQuiz(5)}}
                            >
                                <div id={styles.quizstart_font}>おてがる</div>
                                <div id={styles.quizstart_num}>５問</div>
                            </button>
                        </div>
                        <div>
                            <button
                                className={styles.quizstart10}
                                onClick={()=>{StartQuiz(10)}}
                            >
                                <div id={styles.quizstart_font}>ふつう</div>
                                <div id={styles.quizstart_num}>10問</div>
                            </button>
                        </div>
                        <div>
                            <button
                                className={styles.quizstart15}
                                onClick={()=>{StartQuiz(15)}}
                            >
                                <div id={styles.quizstart_font}>じっくり</div>
                                <div id={styles.quizstart_num}>15問</div>
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div>
                        {/* クイズの画面 */}
                        {/* start_numberで最初の問題指定 finishでクイズ待機画面へ移動できる */}
                        <Quizscene
                        start_number={number}
                        finish={FinishQuiz}
                        change_scene={WhatScene_Change}

                        /* 問題数指定 */
                        what_count={what_count}
                        />
                    </div>
                </div>
            }

        </div>
    )
}