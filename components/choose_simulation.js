//自宅、学校、公園での避難訓練最中の画面

import { useState } from 'react';
import Image from 'next/image';

//各シチュエーションでの問題等のデータ
import { Simudata_Home } from 'components/simudata_home';
import { Simudata_School } from 'components/simudata_school';
import { Simudata_Park } from 'components/simudata_park';

//cssの使用
import styles from '../styles/simulation.module.css';

export default function Choose_Simulation(props) {

    //画面遷移に使う Play=選ぶ TF=解答表示
    const [PlayorTF, setPorTF] = useState('Play');
    //画面遷移する
    const PlayorTFchange = (change) => {
        setPorTF(change);
    }

    //使用するデータを判別する
    const data = (
        props.where == 'athome_simulation' ?
            Simudata_Home :
            props.where == 'atschool_simulation' ?
                Simudata_School :
                Simudata_Park
    )

    //データの値が何個あるか判別する
    const datanum = data.length;

    //避難訓練が問題何個目のシーンかを判定
    const [count, setCount] = useState(0);

    //正誤判定時に使用
    const [tf, setTF] = useState('');

    //正解数
    const [true_number,setTrueNumber]=useState(0);

    //選択問題が押された後の処理
    const ChooseClick = (choose) => {
        //正誤判定
        setTF(
            (data[count]['answer'] == choose ?
                'T' : 'F'
            )
        )

        if(data[count]['answer']==choose){
            setTrueNumber(true_number+1);
        }
        //画面遷移
        setPorTF('TF');
    }

    //次へが押された時
    const NextClick = (e) => {
        //count+1して次のデータの取得
        setCount(count + 1);
        //画面遷移
        setPorTF('Play');
    }

    //おわり
    const Finish_Scene=(e)=>{

        props.set_true_num(true_number);
        props.set_question_num(datanum);

        props.finish_scene();
    }

    //選ぶ画面
    if (PlayorTF == 'Play') {
        return (
            <div>
                {/* 一番上のとこ */}
                <div className={styles.choose_scene_title}>
                    <div className={styles.evacuation_font}>
                        避難中・・・
                    </div>
                    {/* 問題文表示 */}
                    <div className={styles.now_situ}>
                        {data[count]['now_situation'].map((value, key) => {
                            return (
                                <p key={key}>
                                    {value}
                                </p>
                            )
                        })}
                    </div>
                </div>

                {/* 選択ボタン表示 */}
                <div className={styles.choose_scene_back}>
                    {/* 第一選択ボタン */}
                    <button
                        //classNameは後で変更する
                        className={styles.button1}
                        onClick={() => {
                            ChooseClick(data[count]['choose1'])
                        }}
                    ><span>　</span>A,{data[count]['choose1']}</button>
                    {/* 第二選択ボタン */}
                    <button
                        //classNameは後で変更する
                        className={styles.button2}
                        onClick={() => {
                            ChooseClick(data[count]['choose2'])
                        }}
                    ><span>　</span>B,{data[count]['choose2']}</button>
                </div>
            </div>
        )
    }

    //解答表示画面
    else {
        return (
            <div
            className={styles.TF_scene_back}
            id={tf=='T'?styles.TF_scene_back_T:styles.TF_scene_back_F}
            >
                {/*正解不正解表示*/}
                {/* イラストを表示 */}
                {tf == 'T' ?
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
                <div className={styles.TF_font}>
                    {tf == 'T' ?
                        <p id={styles.T_font}>正解！</p> :
                        <p id={styles.F_font}>不正解</p>
                    }
                </div>
                {/* 答えを表示 */}
                <div className={styles.open_answer}>
                    <p id={styles.item_font}>＜答え＞</p>
                    <p id={styles.answer_font}>{data[count]['answer']}</p>
                </div>

                {/* 説明文記述 */}
                <div className={styles.explain}>
                    <p id={styles.item_font}>＜解説＞</p>
                    {data[count]['commentary'].map((value, key) => {
                        return (
                            <p id={styles.explain_font} key={key}>{value}</p>
                        )
                    })}
                </div>

                {/* 次へand避難完了 button */}
                <div>
                    {/* datanumの値とcount+1の値が＝かどうかで変更する */}
                    {datanum != (count + 1) ?
                        <button
                            //classNameは後で変更する
                            className={tf=='T' ?styles.situation_next_T:styles.situation_next_F}
                            //押されたら画面遷移とcount+1する
                            onClick={NextClick}
                        >次へ進む⇒
                        </button> :
                        <button
                            //classNameは後で変更する
                            className={tf=='T' ? styles.situation_complete_T:styles.situation_complete_F}
                            //押されたら避難完了画面表示
                            onClick={Finish_Scene}
                        >避難完了</button>
                    }
                </div>
            </div>
        )
    }
}

/* 
countの移動経路
最初 0
↓(※)
選ぶ
↓
TF画面でdatanumとcount+1が等しいかどうか 
↓
(等しくない場合)
countを+1する
↓
※まで戻る
*/