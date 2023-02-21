//避難訓練開始後の画面

import { useState } from 'react';
import styles from '../styles/simulation.module.css';
import Choose_Simulation from 'components/choose_simulation';

export default function Simuscene(props){

    //画面遷移に使う
    const [scene,setScene]=useState('athome_scene');

    //画面遷移をsceneの値を変えて実行
    const SceneChange=(change)=>{
        setScene(change);
    }

    //避難完了時の画面遷移
    const SceneChange_Finish=(e)=>{
        setScene('finish_scene');
    }

    //どのような状況での避難かを選ぶ画面
    if(scene=='athome_scene' || scene=='atschool_scene' ||scene=='atpark_scene'){
        return(
            <div>
                {/* 家にいるときの避難訓練を選択するボタン */}
                <div>
                    <button /*classNameの内容は後で変更する*/
                    className={styles.choisebuttonH}
                    onClick={()=>SceneChange('athome_scene')}
                    >
                        自宅での被災
                    </button>
                </div>
                {/* 公共施設にいるときの避難訓練を選択するボタン */}
                <div>
                    <button /*classNameの内容は後で変更する*/
                    className={styles.choisebuttonPu}
                    onClick={()=>SceneChange('atschool_scene')}
                    >
                        学校での被災
                    </button>
                </div>
                {/* 遊んでいたときの避難訓練を選択するボタン */}
                <div>
                    <button /*classNameの内容は後で変更する*/
                    className={styles.choisebuttonPa}
                    onClick={()=>SceneChange('atpark_scene')}
                    >
                        公園での被災
                    </button>
                </div>
                {/* 状況を確認してスタートボタンを表示 */}
                <div>
                    {/* 状況確認 */}
                    {/* classNameの中身は後で変更する */}
                    <span className={styles.situation}>
                        {scene=='athome_scene'?
                        "自宅":
                        scene=='atschool_scene'?
                        "学校":
                        "公園"
                        }
                        での避難訓練
                    </span>
                    <button
                    // classNameは後で変更する
                    className={styles.situation_start}
                    onClick={()=>SceneChange(
                        scene=='athome_scene'?
                        'athome_simulation':
                        scene=='atschool_scene'?
                        'atschool_simulation':
                        'atpark_simulation'
                    )}
                    >
                        スタート！！！
                    </button>
                </div>
            </div>
        )
    }
    //避難訓練中の画面
    else if(scene=='athome_simulation' || scene=='atschool_simulation' || scene=='atpark_simulation'){
        return(
            <div>
                <Choose_Simulation where={scene} finish_scene={SceneChange_Finish}/>
            </div>
        )
    }
    //避難完了画面
    else if(scene=='finish_scene'){
        return(
            <div>
                {/* 初期画面へ移動できるボタン */}
                <div>
                    <button
                    className={styles.finishbutton}
                    onClick={props.finish}
                    >
                        終了
                    </button>
                </div>
            </div>
        )
    }
}