//防災バッグの中身を出力する
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/bag.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

//水などのイラスト集
import { Contents_Png } from 'components/contents_png';
//各アイテムの説明
import { Contents_Explanation } from 'components/contents_explanation';

export default function Bag_contents(props) {

    //props.order=内容(0,飲料水,食料...)
    //props.bag=登録したバッグの中身

    //追加するときの書き換えを表示するか否か
    const [open_input, setOpenInput] = useState([
        'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'
    ])

    //入力する
    const [input_detail, setDetail] = useState('');
    const [input_date, setDate] = useState(0);
    const [input_date_kind, setDateKind] = useState({
        'year': 0,
        'month': 0,
        'day': 0
    })
    const [input_itemnum, setItemNum] = useState(1);
    //日にちの制限
    const day_limit = [
        0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ]

    //賞味期限を設定するか
    const [dead_line_add, setDeadLineAdd] = useState('yes');

    //内容を表示するか
    const WatchContents_Change = (item_number) => {
        if (props.contents_open == 0) {
            props.set_contents_open(item_number);
        }
        else {
            props.set_contents_open(0);
        }
    }

    //inputを表示するかどうか
    const OpenInput_Change = (item_number, please) => {

        //他に開いているinputを閉じる
        if (please == 'open') {
            setOpenInput(open_input.map((open, index) => (
                index == item_number ? 'yes' : 'no'
            )))
        }
        else if (please == 'close') {
            setOpenInput(open_input.map((open, index) => (index == item_number ? 'no' : 'no')))
        }

        //入力内容を初期値に変換
        setDetail('');
        setDate(0);
        setDateKind({
            'year': 0,
            'month': 0,
            'day': 0
        })
        setItemNum(1);

    }

    //賞味期限を設定しない
    const DeadLineAdd_Change = (e) => {
        if (dead_line_add == 'yes') {
            setDeadLineAdd('no');
        }
        else {
            setDeadLineAdd('yes');
        }
        setDateKind({ ...input_date_kind, 'year': 0 });
        setDateKind({ ...input_date_kind, 'month': 0 });
        setDateKind({ ...input_date_kind, 'day': 0 });
        setDate(0);
    }

    //入力された値を変更
    const Input_Change = (input_what, input_id) => {

        const input_write = document.getElementById(input_id).value;

        //input_whatでどこが書き換えられたかを判別する
        if (input_what == 'input_detail') {
            //表示内容を変更する
            setDetail(input_write)
        }
        else if (input_what == 'input_date_y' || input_what == 'input_date_m' || input_what == 'input_date_d') {

            if (input_what == 'input_date_y') {
                setDateKind({ ...input_date_kind, 'year': input_write });
                //例:2023年03月07日→20230307のようにする
                setDate(Number(input_write * 10000) + Number(input_date_kind['month'] * 100) + Number(input_date_kind['day']));
            }
            else if (input_what == 'input_date_m') {
                setDateKind({ ...input_date_kind, 'month': input_write });
                //例:2023年03月07日→20230307のようにする
                setDate(Number(input_date_kind['year'] * 10000) + Number(input_write * 100) + Number(input_date_kind['day']));
            }
            else {
                setDateKind({ ...input_date_kind, 'day': input_write });
                //例:2023年03月07日→20230307のようにする
                setDate(Number(input_date_kind['year'] * 10000) + Number(input_date_kind['month'] * 100) + Number(input_write));
            }

        }
        else {
            //表示内容を変更する
            setItemNum(input_write);
        }

    }

    //アイテム追加完了
    const Complete_Add_Item = (num) => {
        setOpenInput(open_input.map((value, key) => (key == num ? 'no' : 'no')));

        //入力内容を初期値に変換
        setDetail('');
        setDate(0);
        setDateKind({
            'year': 0,
            'month': 0,
            'day': 0
        })
        setItemNum(1);

        props.success_edit_item('add');

        props.bag_updata(props.open_bag,props.contents_open);
    }

    return (
        <div className={styles.position_move_third}>
            <ul className={styles.third_item_position} id={styles.third_list_position}>
                {props.order.map((value, key) => {
                    if (key > 0) {

                        const contents_explanation = Contents_Explanation[key];

                        return (
                            <li key={key} className={styles.list_limit_third} id="liststyle_none">

                                {/* 中身を表示 */}
                                {props.contents_open == 0 ?
                                    <div
                                        //水の高さに非常食の高さを合わせる
                                        id={key == 2 ? styles.food_font_place : {}}
                                    >
                                        <div
                                            className={styles.third_padding}
                                        >
                                            {/* それぞれのイラストを表示 */}
                                            <Image
                                                src={Contents_Png[key].contents_src}
                                                alt={Contents_Png[key].contents_alt}
                                                width={Contents_Png[key].contents_width}
                                                height={Contents_Png[key].contents_height}
                                                className={styles.contents_illustration}
                                            />

                                            <button
                                                onClick={() => { WatchContents_Change(key) }}
                                                className={styles.third_item_font}
                                            >
                                                {value}
                                            </button>
                                        </div>
                                        {/* 各アイテムの説明 */}
                                        <div>

                                            {[contents_explanation].map((explanation, index) => {
                                                console.log(explanation)
                                                return (
                                                    <span key={index}>
                                                        {explanation.map((explain, number) => {
                                                            return (
                                                                <div key={number}>
                                                                    {explain}
                                                                </div>
                                                            )
                                                        })}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div> :
                                    props.contents_open == key ?
                                        <div className={styles.contents_goods}>
                                            <ul>
                                                <li className={styles.goods_items} id="liststyle_none">
                                                    <span className={styles.goods_items_name}>グッズ名</span>
                                                    <span className={styles.goods_items_deadline}>賞味期限</span>
                                                    <span className={styles.goods_items_num}>個数</span>
                                                </li>
                                                {/* 境界線 */}
                                                <div className={styles.goods_items_border}>
                                                    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                                                </div>
                                                {/* 登録しているアイテムの表示 */}
                                                {props.bag[key].map((content, index) => {
                                                    const key_num = key;
                                                    const index_num = index;

                                                    return (
                                                        <li key={index}>
                                                            {props.success_item.delete == 'yes' && props.delete_item_number_key == key_num && props.delete_item_number_index == index_num ?
                                                                <div>
                                                                    
                                                                        <button onClick={() => {
                                                                            props.success_edit_item('delete',props.open_bag,props.contents_open);
                                                                        }}>削除完了</button>
                                                                    
                                                                </div>
                                                                :
                                                                <div className={styles.display_goods}>
                                                                    <span className={styles.mygoods_name}>{props.bag[key][index].detail}</span>

                                                                    {props.bag[key][index].dead_line != 0 ?
                                                                        <span className={styles.mygoods_deadline}>
                                                                            {Math.floor((props.bag[key][index].dead_line) / 10000)}年
                                                                            {Math.floor(((props.bag[key][index].dead_line) - Math.floor((props.bag[key][index].dead_line) / 10000) * 10000) / 100)}月
                                                                            {((props.bag[key][index].dead_line) - (Math.floor((props.bag[key][index].dead_line) / 100) * 100))}日
                                                                        </span> :
                                                                        <span className={styles.mygoods_deadline}>設定していません</span>}
                                                                    <span className={styles.mygoods_num}>{props.bag[key][index].num}</span>
                                                                    {/* このアイテムを削除 */}
                                                                    <button
                                                                        className={styles.icon_button}
                                                                        onClick={() => {
                                                                            props.item_add_delete(
                                                                                'delete', props.open_bag, key, props.bag[key][index].detail, props.bag[key][index].dead_line, props.bag[key][index].num, key_num, index_num
                                                                            )
                                                                        }}

                                                                    >
                                                                        <DeleteIcon />
                                                                    </button>

                                                                    {/* 境界線 */}
                                                                    <div className={styles.goods_border}>
                                                                        ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
                                                                    </div>
                                                                </div>
                                                            }
                                                        </li>
                                                    )
                                                })}

                                                {/* アイテムを追加 */}
                                                <li id="liststyle_none">
                                                    {open_input[key] == 'no' ?
                                                        <button onClick={() => { OpenInput_Change(key, 'open') }}
                                                            className={styles.third_button_font}
                                                        >＋追加</button> :

                                                        props.success_item.add == 'yes' ?
                                                            <div>
                                                                
                                                                    <button onClick={() => { Complete_Add_Item(key) }}
                                                                    >追加完了！</button>
                                                                
                                                            </div>
                                                            :
                                                            <div className={styles.add_goods_back}>
                                                                <div className={styles.goods_create_input} id={styles.input_goods_position}>
                                                                    <div className={styles.add_goods_font}>
                                                                        ＜追加するグッズ＞
                                                                    </div>
                                                                    <div>
                                                                        グッズ名
                                                                        <div>
                                                                            <input
                                                                                type={"text"}
                                                                                value={input_detail}
                                                                                onChange={() => { Input_Change('input_detail', "I_detail") }}
                                                                                className={styles.input_goods_name}
                                                                                id="I_detail"
                                                                            ></input>
                                                                        </div>
                                                                        <br />
                                                                        {dead_line_add == 'yes' ?
                                                                            <span>
                                                                                賞味期限/
                                                                                <button
                                                                                    onClick={DeadLineAdd_Change}
                                                                                    className={styles.input_date_size}
                                                                                    id={styles.not_input_date}
                                                                                >設定しない</button>
                                                                                <div>
                                                                                    <input
                                                                                        type={"number"}
                                                                                        onChange={() => { Input_Change('input_date_y', "I_date_y") }}
                                                                                        value={input_date_kind.year}
                                                                                        className={styles.input_date_size}
                                                                                        id="I_date_y"
                                                                                    />年
                                                                                    <input
                                                                                        type={"number"}
                                                                                        onChange={() => { Input_Change('input_date_m', "I_date_m") }}
                                                                                        value={input_date_kind.month}
                                                                                        className={styles.input_date_size}
                                                                                        id="I_date_m"
                                                                                    />月
                                                                                    <input
                                                                                        type={"number"}
                                                                                        onChange={() => { Input_Change('input_date_d', "I_date_d") }}
                                                                                        value={input_date_kind.day}
                                                                                        className={styles.input_date_size}
                                                                                        id="I_date_d"
                                                                                    />日
                                                                                </div>
                                                                            </span>
                                                                            :
                                                                            <span>
                                                                                賞味期限/
                                                                                <button
                                                                                    onClick={DeadLineAdd_Change}
                                                                                    className={styles.input_date_size}
                                                                                    id={styles.not_input_date}
                                                                                >設定する</button>
                                                                                <br />
                                                                            </span>
                                                                        }
                                                                        <br />
                                                                        <span>個数</span>
                                                                        <div>
                                                                            <input
                                                                                type={"number"}
                                                                                value={input_itemnum}
                                                                                onChange={() => { Input_Change('input_num', "I_num") }}
                                                                                className={styles.input_date_size}
                                                                                id="I_num"
                                                                            ></input>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        {/* 条件を満たしていれば表示 */}
                                                                        {(
                                                                            input_detail.length >= 1
                                                                            && input_detail.length <= 20
                                                                            &&
                                                                            ((
                                                                                input_date_kind['year'] >= 2023
                                                                                && input_date_kind['month'] >= 1 && input_date_kind['month'] <= 12
                                                                                && input_date_kind['day'] >= 1 && input_date_kind['day'] <= day_limit[input_date_kind['month']]
                                                                            ) || dead_line_add == 'no'
                                                                            )
                                                                            && input_itemnum > 0
                                                                        ) ?
                                                                            <button
                                                                                onClick={() => {
                                                                                    props.item_add_delete(
                                                                                        'add', props.open_bag, key, input_detail, input_date, input_itemnum, -1, -1
                                                                                    )
                                                                                }}
                                                                                className={styles.add_button}
                                                                            >追加</button>
                                                                            :
                                                                            <span>
                                                                                <br />※アイテム名は1文字以上20文字以下<br />　賞味期限は2023年以降<br />　個数は0以上
                                                                            </span>
                                                                        }
                                                                        {/* 追加しない */}
                                                                        <button
                                                                        className={styles.add_goods_close}
                                                                        onClick={() => { OpenInput_Change(key, 'close') }}
                                                                        >✕</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                </li>
                                            </ul>
                                        </div> :
                                        <div></div>
                                }
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}