//避難訓練の画面
import { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/sidebar';
import styles from 'styles/simulation.module.css';
import Simuscene from 'components/simuscene';

export default function Simulation() {

    const router=useRouter();

    return (
        <div className="App">
            {/* サイドバーを表示する */}
            <Sidebar name="simulation" username={router.query.username}/>

            {/*避難訓練中の画面*/}
                <div>
                    <div>
                        {/* finishで避難訓練待機画面へ移動できる */}
                        <Simuscene />
                    </div>
                </div>
        </div>
    )

}