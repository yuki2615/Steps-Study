import { useRouter } from 'next/router';
import styles from '../styles/explanation.module.css';
import Sidebar from '@/components/sidebar';

export default function Explanation() {

    const router = useRouter();

    return (
        <div>
            <Sidebar name="explanation" username={router.query.username} />

            <div className={styles.E_scene}>　</div>

            <div className={styles.all_background}>
                <ul id="liststyle_none">
                    <h1>
                        楽しく学ぶ！
                    </h1>
                    <li>
                        <ul id="liststyle_none">
                        <h2>
                            防災クイズ
                        </h2>
                        <li>
                            <p>役に立つ防災クイズを4択形式で出題！</p>
                        </li>
                        <li>

                        </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}