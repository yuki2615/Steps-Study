//防災バッグの管理画面
import { prisma } from 'lib/prisma';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/bag.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CreateIcon from '@mui/icons-material/Create';
import Sidebar from '@/components/sidebar';
import Bag_contents from 'components/bag_contents';
import { Contents_Png } from 'components/contents_png';

export default function Bag(props) {

    const router = useRouter();

    //出力する順番を記述(おすすめバッグ中身*10+利用者オリジナル中身*1)
    //内訳             [調整,水等　 , 食べ物,バッテリー,簡易トイレ,ホイッスル,防寒具   ,靴　　 ,テープ,救急セット   ,オリジナルグッズ]
    const record_order = ['0', '飲料水', '食料', 'モバイルバッテリー', '簡易トイレ', 'ホイッスル', '防寒具', '靴(スリッパ)', 'ガムテープ・軍手', '救急セット', '利用者オリジナル']

    //バッグの中身表示するかどうかのリスト
    const [bag_list, setBagList] = useState([])
    //すべてのバッグ
    const [allbag, setAllBag] = useState(props.bag_name)

    //バッグが開かれているか
    const [bag_open, setBagOpen] = useState('no');
    //何のコンテンツが開かれているか
    const [contents_open, setContentsOpen] = useState(0);

    //新規バッグの内容入力
    const [create_bag, setCreateBag] = useState('no');
    //新規バッグ名
    const [new_bagname, setNewBag] = useState('');
    //新規バッグを登録できるか
    const [entry_bag, setEntryBag] = useState('no');

    //新規バッグを登録するときの注意
    const [bag_attention, setBagAttention] = useState('');

    //バッグ編集(追加、削除)後
    const [success_edit, setSuccessEdit] = useState({ 'add': 'no', 'delete': 'no' });
    //アイテム編集後(追加、削除)後
    const [success_item, setSuccessItem] = useState({ 'add': 'no', 'delete': 'no' });

    //削除したバッグ
    const [delete_bag, setDeleteBag] = useState('');
    //削除したアイテム
    const [delete_item_K, setDeleteItem_K] = useState(-1);
    const [delete_item_I, setDeleteItem_I] = useState(-1);

    //賞味期限一覧表の表示
    const [deadline_all, setDeadLineAll] = useState('no');

    //bag_listに全てのバッグを登録
    useEffect(() => {

        let bag_list_temp = []
        props.bag_name.map((value, key) => {
            bag_list_temp[key] = 'no'
            setBagList(bag_list_temp)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //新規バッグを登録するか
    const Create_Bag_Change = (e) => {
        {
            create_bag == 'no' ?
                setCreateBag('yes') :
                setCreateBag('no')
        }
        setNewBag('');
        setBagAttention('');
        setEntryBag('no');
    }



    //新規バッグ名入力された値に変更する
    const NewBagname_Change = (e) => {

        const new_bag = e.target.value;
        setNewBag(new_bag);
        setEntryBag('no');

        //その名前が20文字以内か
        if (new_bag.length > 20) {
            setBagAttention('バッグの名前は20文字以内で設定してください')
            setEntryBag('no');
        }

        let exist_bag = 'no';
        //そのバッグ名が既に存在するか
        {
            props.bag_name.map((value) => {
                if (value == new_bag) {
                    exist_bag = 'yes';
                }
            })
        }
        if (exist_bag == 'yes') {
            setEntryBag('no');
            setBagAttention('※その名前のバッグはすでに登録されています')
        }
        else if (new_bag.length > 0 && new_bag.length <= 20) {
            setEntryBag('yes');
            setBagAttention('');
        }
    }

    //新規バッグ追加完了
    const Success_Edit_Add = (e) => {
        setSuccessEdit({ ...success_edit, 'add': 'no' });
        //値を初期化
        setCreateBag('no');
        setNewBag('');
        setBagAttention('');
        setEntryBag('no');

        //bag_listに登録
        setBagList([...bag_list, 'no'])

        setAllBag(props.bag_name);
    }

    //バッグ削除完了
    const Success_Edit_Delete = (e) => {
        setSuccessEdit({ ...success_edit, 'delete': 'no' });
        setDeleteBag('');
        setAllBag(props.bag_name);
    }

    //アイテム追加or削除完了
    const Success_Edit_Item = (which) => {
        if (which == 'add') {
            setSuccessItem({ ...success_item, 'add': 'no' });
        }
        else {
            setSuccessItem({ ...success_item, 'delete': 'no' });
            setDeleteItem_K(1);
            setDeleteItem_I(-1);
        }
        setAllBag(props.mybag);
    }

    //bag_listの内容を変更する
    const BagList_Change = (bag_number) => {
        if (bag_list[bag_number] == 'no') {
            setBagList(bag_list.map((value, index) => (index == bag_number ? 'yes' : value)))
        }
        else {
            setBagList(bag_list.map((value, index) => (index == bag_number ? 'no' : value)))
        }

        if (bag_open == 'no') {
            setBagOpen('yes');
        }
        else {
            setBagOpen('no');
        }

        setContentsOpen(0);
    }

    //bagを編集する
    const Bag_Edit = (which, bagname) => {

        fetch(
            '/api/bag_edit',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    which: which,
                    E_username: router.query.username,
                    E_bagname: bagname,
                })
            }
        )
            //resを受け取る    
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (which == 'add') {
                    setSuccessEdit({ ...success_edit, 'add': 'yes' });
                }
                else if (which == 'delete') {
                    setSuccessEdit({ ...success_edit, 'delete': 'yes' });
                    setDeleteBag(bagname);
                }
            })

    }

    //アイテムを追加・削除する
    const Item_Add_Delete = (which, bagname, itemid, item_detail, item_deadline, item_num, key_number, index_number) => {

        fetch(
            '/api/item_add_delete',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    which: which,
                    E_username: router.query.username,
                    E_bagname: bagname,
                    E_itemid: itemid,
                    E_detail: item_detail,
                    E_deadline: item_deadline,
                    E_num: item_num
                })
            }
        )
            //resを受け取る    
            .then((res) => {
                return res.json();
            })
            .then((json) => {

                console.log(key_number, 'a', index_number)
                if (which == 'add') {
                    setSuccessItem({ ...success_item, 'add': 'yes' });
                }
                else {
                    console.log(itemid)
                    console.log(key_number)
                    setSuccessItem({ ...success_item, 'delete': 'yes' });
                }
                setDeleteItem_K(key_number);
                setDeleteItem_I(index_number);
            })

    }

    //賞味期限一覧表の表示
    const DeadLineAll_Change = (e) => {
        if (deadline_all == 'no') {
            setDeadLineAll('yes');
        }
        else {
            setDeadLineAll('no');
        }
    }

    //バッグの内容を更新
    const Bag_Updata=(e)=>{
        setAllBag(props.mybag);
    }

    return (

        <div className={styles.bag_app}>
            <Sidebar
                name="bag"
                username={router.query.username}
            />
            {/* バッグの画面を作成する */}
            {/* バッグ一覧 */}

            <div>

                {/* 右サイド */}
                <div className={styles.bag_side}>
                    <div>
                        <ul
                            className={styles.information_position}
                            id="liststyle_none"
                        >
                            {/* タイトル */}
                            <div
                                className={styles.bag_information_title}
                            >バッグ内情報
                            </div>

                            {/* 境界線 */}
                            <div className={styles.information_title_border}>
                                ＿＿＿＿＿＿＿＿＿＿＿＿＿
                            </div>
                            <li className={styles.information_list}>
                                <button
                                    onClick={DeadLineAll_Change}
                                    className={styles.deadline_all_open}>
                                    賞味期限一覧表
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.bag_main_basic}>　</div>

                <ul
                    /*cssの設定*/
                    className={styles.bag_main}
                    id="liststyle_none"
                >
                    <li>
                        <div>
                            <ul /* バッグ一覧 */ className={styles.second_item_position}>

                                {bag_open == 'no' ?
                                    <div className={styles.main_item}>
                                        バッグ一覧
                                        <span className={styles.new_bag_input}>
                                            {create_bag == 'no' ?
                                                <button
                                                    onClick={Create_Bag_Change}
                                                    className={styles.new_bag}
                                                    id={styles.new_bag_back}
                                                >
                                                    <CreateIcon />　新規バッグ作成
                                                </button> :
                                                success_edit['add'] == 'no' ?
                                                    <span className={styles.new_bag_input}>新規バッグ名
                                                        <input type={"text"}
                                                            value={new_bagname}
                                                            onChange={NewBagname_Change}
                                                            className={styles.new_bag_input}
                                                        >

                                                        </input>
                                                        {/*登録できるか*/}
                                                        {entry_bag == 'yes' ?
                                                            <button onClick={() => { Bag_Edit('add', new_bagname) }}
                                                                className={styles.new_bag_input}
                                                            >追加</button> :
                                                            <span></span>
                                                        }
                                                        {/* バッグを追加しない */}
                                                        <button onClick={Create_Bag_Change} className={styles.new_bag_input}>✕ 閉じる</button>
                                                        {/* 注意書きを書く */}
                                                        <p className={styles.attention}>{bag_attention}</p>
                                                    </span> :
                                                    /*<Link href={{ pathname: '/bag', query: { username: router.query.username } }}>*/
                                                    <button onClick={Success_Edit_Add}
                                                        className={styles.new_bag_input}
                                                    >追加完了！</button>
                                                /*</Link>*/
                                            }
                                        </span>
                                    </div> :
                                    <div></div>
                                }

                                {props.bag_name.map((value, key) => {
                                    return (
                                        <li key={key} id="liststyle_none">
                                            {/* userのバッグ一覧 */}
                                            {bag_list[key] == 'no' ?


                                                bag_open == 'yes' ?
                                                    <div>
                                                        {/* 他のバッグが開かれているとき */}
                                                    </div>
                                                    :

                                                    success_edit['delete'] == 'no' ?
                                                        <div>

                                                            <div className={styles.second_item_font}>
                                                                {/* バッグの絵 */}
                                                                <Image
                                                                    src='/hijouyou_mochidashi_bag.png'
                                                                    alt='hijouyou_mochidashi_bag'
                                                                    width={70}
                                                                    height={70}
                                                                    className={styles.bag_illustration}
                                                                />

                                                                <button
                                                                    onClick={() => { BagList_Change(key) }}
                                                                    className={styles.bag_name_button}
                                                                >
                                                                    {value}
                                                                </button>
                                                                {/* 削除ボタン */}
                                                                <button
                                                                    className={styles.bag_delete_button}
                                                                    onClick={() => { Bag_Edit('delete', value) }}
                                                                >
                                                                    <DeleteIcon />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        :
                                                        delete_bag == value ?
                                                            <div>


                                                                <button onClick={Success_Edit_Delete}
                                                                    className={styles.delete_complete_button}
                                                                >削除しました</button>

                                                            </div> :
                                                            <div className={styles.second_item_font}>
                                                                <Image
                                                                    src='/hijouyou_mochidashi_bag.png'
                                                                    alt='hijouyou_mochidashi_bag'
                                                                    width={70}
                                                                    height={70}
                                                                    className={styles.bag_illustration}
                                                                />
                                                                {value}
                                                            </div> :

                                                <div>
                                                    <div className={styles.main_item}>
                                                        {/* 今開かれているバッグ名を表示 */}
                                                        <button
                                                            onClick={() => BagList_Change(key)}
                                                            className={styles.other_place}
                                                        >
                                                            バッグ一覧
                                                        </button>
                                                        <KeyboardArrowRightIcon />
                                                        <button
                                                            className={contents_open == 0 ? styles.now_place : styles.other_place}
                                                            onClick={() => { setContentsOpen(0) }}
                                                        >
                                                            <Image
                                                                src='/hijouyou_mochidashi_bag.png'
                                                                alt='hijouyou_mochidashi_bag_now'
                                                                width={contents_open == 0 ? 70 : 40}
                                                                height={contents_open == 0 ? 70 : 40}
                                                                className={contents_open == 0 ? styles.bag_illustration : styles.other_bag_place}
                                                            />
                                                            {value}
                                                        </button>
                                                        {contents_open == 0 ?
                                                            <span></span> :
                                                            <span>
                                                                <KeyboardArrowRightIcon />
                                                                <span className={styles.now_place}>
                                                                    <Image
                                                                        src={Contents_Png[contents_open].contents_src}
                                                                        alt={Contents_Png[contents_open].contents_alt}
                                                                        width={Contents_Png[contents_open].contents_width}
                                                                        height={Contents_Png[contents_open].contents_height}
                                                                        className={styles.bag_illustration}
                                                                    />
                                                                    {record_order[contents_open]}
                                                                </span>
                                                            </span>
                                                        }
                                                    </div>
                                                    <div>
                                                        {/* 中身を表示 */}
                                                        <Bag_contents
                                                            //開かれているバッグ
                                                            open_bag={value}
                                                            //内容説明
                                                            order={record_order}
                                                            //バッグの中身
                                                            bag={props.mybag[value]}
                                                            //アイテムを追加・削除
                                                            item_add_delete={Item_Add_Delete}
                                                            //アイテム追加削除完了
                                                            success_item={success_item}
                                                            success_edit_item={Success_Edit_Item}
                                                            //routerの値
                                                            router_user={router.query.username}
                                                            //削除したアイテム
                                                            delete_item_number_key={delete_item_K}
                                                            delete_item_number_index={delete_item_I}
                                                            //何のコンテンツが開かれているか
                                                            contents_open={contents_open}
                                                            set_contents_open={setContentsOpen}
                                                            //バッグの更新
                                                            bag_updata={Bag_Updata}
                                                        />

                                                    </div>
                                                </div>
                                            }
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    //queryからusernameを受け取る
    const User_Name = context.query.username;

    //usernameが同じのバッグの中身を引き出す
    const mybag = await prisma.contents.findMany({
        where: {
            user_name: User_Name
        }
    });
    //userが同じのbag_idとともにbag_nameを取り出す
    const users_bag_name = await prisma.bag_management.findMany({
        where: {
            user: User_Name
        }
    })

    //mybagの中身を整理する
    let bag_separation = {
        'bag_memory': []
    }

    //バッグの登録できるアイテム一覧
    const entry_item = ['0', '飲料水', '食料', 'モバイルバッテリー', '簡易トイレ', 'ホイッスル', '防寒具', '靴(スリッパ)', 'ガムテープ・軍手', '救急セット', '利用者オリジナル']
    //それぞれの登録回数
    //let entry_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let entry_count = [{}]

    //bag_separationに項目を追加
    {
        users_bag_name.map((value, key) => {
            bag_separation.bag_memory[key] = value.bags_name
            bag_separation[value.bags_name] = []
            entry_count[value.bags_name] = []
            entry_count[value.bags_name] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            //bag_separation[value.bags_name][key] = []
        })
    }

    //バッグにアイテムの配列追加
    {
        users_bag_name.map((value) => {
            {
                entry_item.map((content, index) => {
                    bag_separation[value.bags_name][index] = []
                })
            }
        })
    }

    //バッグの中身を追加
    {
        mybag.map((value) => {
            bag_separation[value.bag_name][value.item_id][entry_count[value.bag_name][value.item_id]] = {
                "detail": value.detail,
                "dead_line": value.dead_line,
                "num": value.num
            }
            entry_count[value.bag_name][value.item_id] = entry_count[value.bag_name][value.item_id] + 1
        })
    }

    return {
        props: {
            mybag: bag_separation,
            bag_name: bag_separation.bag_memory
        }
    };
}