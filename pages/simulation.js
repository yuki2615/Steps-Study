//避難訓練の画面
import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import styles from '../styles/simulation.module.css';
import Simuscene from 'components/simuscene';

export default function Simulation() {

    //避難訓練中か否かを判別する
    const [play, setPlay] = useState('n');

    //避難訓練を始める
    const Simulation_start = (e) => {
        setPlay('y');
    }
    //避難訓練を終了する
    const Simulation_finish = (e) => {
        setPlay('n');
    }
    return (
        <div className="App">
            {/* サイドバーを表示する */}
            <Sidebar name="simulation" />

            {play == 'n' ?
                //避難訓練待機画面
                <div>
                    {/* 開始ボタンを追加する */}
                    <div>
                        <button
                            //後でcssの中身を変更する
                            className={styles.startbutton}
                            onClick={Simulation_start}
                        >開始</button>
                    </div>
                </div>
                :

                //避難訓練中の画面
                <div>
                    <div>
                        {/* finishで避難訓練待機画面へ移動できる */}
                        <Simuscene finish={Simulation_finish} />
                    </div>
                </div>}
        </div>
    )

}