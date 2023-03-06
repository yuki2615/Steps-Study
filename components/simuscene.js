//避難訓練開始後の画面

import { useState } from 'react';
import styles from '../styles/simulation.module.css';
import Choose_Simulation from 'components/choose_simulation';

export default function Simuscene(props) {

    //画面遷移に使う
    const [scene, setScene] = useState('athome_scene');

    //画面遷移をsceneの値を変えて実行
    const SceneChange = (change) => {
        setScene(change);
    }

    //避難完了時の画面遷移
    const SceneChange_Finish = (e) => {
        setScene('finish_scene');
    }

    //正答数
    const [true_num, setTrueNum] = useState(0);
    //問題数
    const [question_num, setQuestionNum] = useState(0);

    //どのような状況での避難かを選ぶ画面
    if (scene == 'athome_scene' || scene == 'atschool_scene' || scene == 'atpark_scene') {
        return (
            <div className={styles.first_scene}>

                <div className={styles.simulation_title}>
                    避難訓練
                </div>
                {/* 境界線 */}
                <div className={styles.simulation_first_border}>
                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                </div>
                <div className={styles.situation_choose_font}>
                    状況選択
                </div>

                {/* 家にいるときの避難訓練を選択するボタン */}
                <div>
                    <button /*classNameの内容は後で変更する*/
                        className={styles.choisebuttonH}
                        onClick={() => SceneChange('athome_simulation')}
                    >
                        自宅
                    </button>
                </div>
                {/* 公共施設にいるときの避難訓練を選択するボタン */}
                <div>
                    <button /*classNameの内容は後で変更する*/
                        className={styles.choisebuttonPu}
                        onClick={() => SceneChange('atschool_simulation')}
                    >
                        学校
                    </button>
                </div>
                {/* 遊んでいたときの避難訓練を選択するボタン */}
                <div>
                    <button /*classNameの内容は後で変更する*/
                        className={styles.choisebuttonPa}
                        onClick={() => SceneChange('atpark_simulation')}
                    >
                        外出先
                    </button>
                </div>
            </div>
        )
    }
    //避難訓練中の画面
    else if (scene == 'athome_simulation' || scene == 'atschool_simulation' || scene == 'atpark_simulation') {
        return (
            <div>
                <Choose_Simulation
                    where={scene}
                    finish_scene={SceneChange_Finish}
                    set_true_num={setTrueNum}
                    set_question_num={setQuestionNum}
                />
            </div>
        )
    }
    //避難完了画面
    else if (scene == 'finish_scene') {
        return (
            <div>
                <div className={styles.last_scene_top}>
                    <div className={styles.evacuation_complete_font}>
                        避難完了！
                    </div>
                </div>

                <div>

                    <div className={styles.last_main}>
                        <div className={styles.result}>
                            <span className={styles.result_font_other}>正答数:</span>
                            <span className={styles.result_main}>
                                <span
                                className={styles.result_font}
                                id={((true_num/question_num)*100)>=50?styles.result_font_red:styles.result_font_blue}
                                >{true_num}</span>
                                <span className={styles.result_font_other}>問/{question_num}問</span>
                            </span>
                        </div>

                        <div className={styles.result_commentary}>
                            {/* コメント */}
                        {true_num/question_num==1?
                        <div>
                            満点おめでとう！<br/>
                            これからも防災意識を高く持ちましょう！
                        </div>:
                        (true_num/question_num)>=0.8?
                        <div>
                            満点まであと少し！<br />
                            もう一回挑戦してみましょう！
                        </div>:
                        (true_num/question_num)>=0.5?
                        <div>
                            もういちど挑戦し、点数を上げてみましょう！
                        </div>:
                        (true_num/question_num)>=0.3?
                        <div>
                            日頃から災害について考えるようにしましょう！
                        </div>:
                        <div>
                            命にかかわることなのでもう少し頑張ってください！
                        </div>
                        }
                        </div>
                    </div>

                    {/* 初期画面へ移動できるボタン */}
                    <div>
                        <button
                            className={styles.finishbutton}
                            onClick={() => { setScene('athome_scene') }}
                        >
                        終了
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}