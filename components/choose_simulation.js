//自宅、学校、公園での避難訓練最中の画面

import { useState } from 'react';

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

    //選択問題が押された後の処理
    const ChooseClick = (choose) => {
        //正誤判定
        setTF(
            (data[count]['answer'] == choose ?
                'T' : 'F'
            )
        )

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

    //選ぶ画面
    if (PlayorTF == 'Play') {
        return (
            <div>
                {/* 問題文表示 */}
                <div className={styles.now_situ}>
                    {data[count]['now_situation'].map((value)=>{
                        <p>
                            {value}
                        </p>
                    })}
                </div>

                {/* 選択ボタン表示 */}
                <div>
                    {/* 第一選択ボタン */}
                    <button
                        //classNameは後で変更する
                        className={styles.button1}
                        onClick={() => {
                            ChooseClick(data[count]['choose1'])
                        }}
                    >{data[count]['choose1']}</button>
                    {/* 第二選択ボタン */}
                    <button
                        //classNameは後で変更する
                        className={styles.button2}
                        onClick={() => {
                            ChooseClick(data[count]['choose2'])
                        }}
                    >{data[count]['choose2']}</button>
                </div>
            </div>
        )
    }

    //解答表示画面
    else {
        return (
            <div>
                {/*正解不正解表示*/}
                <div>
                    {tf == 'T' ?
                        <p>正解</p> :
                        <p>不正解</p>
                    }
                </div>
                {/*説明文表示*/}
                <div>
                    {data[count]['commentary']}
                </div>

                {/* 次へand避難完了 button */}
                <div>
                    {/* datanumの値とcount+1の値が＝かどうかで変更する */}
                    {datanum != (count + 1) ?
                        <button
                            //classNameは後で変更する
                            className={styles.situation_next}
                            //押されたら画面遷移とcount+1する
                            onClick={NextClick}
                        >次へ</button> :
                        <button
                            //classNameは後で変更する
                            className={styles.situation_complete}
                            //押されたら避難完了画面表示
                            onClick={props.finish_scene}
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