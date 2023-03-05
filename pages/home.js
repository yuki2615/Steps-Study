import Sidebar from '@/components/sidebar';
import {useRouter} from 'next/router';

export default function Home(){

    const router=useRouter();

    return(
        <div className="App">
            {/* サイドバー */}
            <Sidebar name="home" username={router.query.username}/>

            {/* アプリ名記載 */}
            <div></div>
            {/* 各アプリ機能へ飛ぶ */}
            <div>
                {/* 項目 */}
                {/* 画像 */}
                {/* 軽く説明的なもの */}
            </div>
        </div>
    )
}