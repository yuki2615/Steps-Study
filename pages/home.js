import Sidebar from '@/components/sidebar';
import {useRouter} from 'next/router';
import styles from '../styles/home.module.css';

export default function Home(){

    const router=useRouter();

    return(
        <div className="App">
            {/* サイドバー */}
            <Sidebar name="home" username={router.query.username}/>

            {/* アプリ名記載 */}
            <div className={styles.home_Steps_Study}>
                <span className={styles.home_title_S}>S</span>
                <span className={styles.home_title_noS}>teps-</span>
                <span className={styles.home_title_S}>S</span>
                <span className={styles.home_title_noS}>tudy</span>

            </div>
            <div className={styles.welcom}>
                へようこそ！
            </div>

            {/* 境界線の作成 */}
            <div className={styles.home_border}>
                ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
            </div>
            {/* 各アプリ機能へ飛ぶ */}
            <div>
                {/* 項目 */}
                {/* 画像 */}
                {/* 軽く説明的なもの */}
            </div>
        </div>
    )
}