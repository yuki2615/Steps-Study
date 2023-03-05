//防災バッグの中身を出力する
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/bag.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Bag_contents(props) {

    //props.order=内容(0,飲料水,食料...)
    //props.bag=登録したバッグの中身

    //内容表示切替
    const [watch_contents, setWatchContents] = useState([
        'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'
    ]);

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
        31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ]

    //賞味期限を設定するか
    const [dead_line_add, setDeadLineAdd] = useState('yes');

    //内容を表示するか
    const WatchContents_Change = (item_number) => {
        if (watch_contents[item_number] == 'no') {
            setWatchContents(watch_contents.map((watch, index) => (index == item_number ? 'yes' : watch)))
        }
        else {
            setWatchContents(watch_contents.map((watch, index) => (index == item_number ? 'no' : watch)))
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
            }
            else if (input_what == 'input_date_m') {
                setDateKind({ ...input_date_kind, 'month': input_write });
            }
            else {
                setDateKind({ ...input_date_kind, 'day': input_write });
            }

            //例:2023年03月07日→20230307のようにする
            setDate((input_date_kind['year'] * 10000) + (input_date_kind['month'] * 100) + input_date_kind['day']);

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
    }

    return (
        <div>
            <ul className={styles.third_item_position}>
                {props.order.map((value, key) => {
                    if (key > 0) {
                        return (
                            <li key={key} className={styles.list_limit_third} id="liststyle_none">
                                <div className={styles.third_padding}>
                                    <Image
                                    src='/drink_petbottle.png'
                                    alt='drink_petbottle'
                                    width={50}
                                    height={70}
                                    />
                                    <span className={styles.third_item_font}>
                                    {value}　
                                    </span>

                                    <button onClick={() => { WatchContents_Change(key) }}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </button>
                                </div>

                                {/* 中身を表示 */}
                                {watch_contents[key] == 'no' ?
                                    <div></div> :
                                    <div>
                                        <ul>
                                            {/* 登録しているアイテムの表示 */}
                                            {props.bag[key].map((content, index) => {
                                                const key_num=key;
                                                const index_num=index;

                                                return (
                                                    <li key={index}>
                                                        {props.success_item.delete == 'yes' && props.delete_item_number_key == key_num && props.delete_item_number_index ==index_num ?
                                                            <div>
                                                                <Link href={{ pathname: '/bag', query: { username: props.router_user } }}>
                                                                    <button onClick={() => {
                                                                        props.success_edit_item('delete');
                                                                    }}>削除完了</button>
                                                                </Link>
                                                            </div>
                                                            :
                                                            <div>{props.bag[key][index].detail}

                                                                /賞味期限
                                                                {props.bag[key][index].dead_line != 0 ?
                                                                    <span>{props.bag[key][index].dead_line}
                                                                    </span> :
                                                                    <span>設定していません</span>}
                                                                /個数{props.bag[key][index].num}
                                                                {/* このアイテムを削除 */}
                                                                <button onClick={() => {
                                                                    props.item_add_delete(
                                                                        'delete', props.open_bag, key, props.bag[key][index].detail, props.bag[key][index].dead_line, props.bag[key][index].num, key_num, index_num
                                                                    )
                                                                }}>削除</button>
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
                                                    >追加</button> :

                                                    props.success_item.add == 'yes' ?
                                                        <div>
                                                            <Link href={{ pathname: '/bag', query: { username: props.router_user } }}>
                                                                <button onClick={() => { Complete_Add_Item(key) }}
                                                                >追加完了！</button>
                                                            </Link>
                                                        </div>
                                                        :

                                                        <div>
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
                                                                        >追加</button>
                                                                    :
                                                                    <span>※アイテム名は1文字以上20文字以下,個数は0以上
                                                                    </span>
                                                                }
                                                                {/* 追加しない */}
                                                                <button onClick={() => { OpenInput_Change(key, 'close') }}>✕</button>
                                                            </div>
                                                            <div>
                                                                アイテム名/賞味期限/個数
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type={"text"}
                                                                    value={input_detail}
                                                                    onChange={() => { Input_Change('input_detail', "I_detail") }}
                                                                    id="I_detail"
                                                                ></input>
                                                                /
                                                                {dead_line_add == 'yes' ?
                                                                    <span>
                                                                        <input
                                                                            type={"number"}
                                                                            onChange={() => { Input_Change('input_date_y', "I_date_y") }}
                                                                            value={input_date_kind.year}
                                                                            id="I_date_y"
                                                                        />年
                                                                        <input
                                                                            type={"number"}
                                                                            onChange={() => { Input_Change('input_date_m', "I_date_m") }}
                                                                            value={input_date_kind.month}
                                                                            id="I_date_m"
                                                                        />月
                                                                        <input
                                                                            type={"number"}
                                                                            onChange={() => { Input_Change('input_date_d', "I_date_d") }}
                                                                            value={input_date_kind.day}
                                                                            id="I_date_d"
                                                                        />日
                                                                        <button onClick={DeadLineAdd_Change}>設定しない</button>
                                                                    </span>
                                                                    :
                                                                    <button onClick={DeadLineAdd_Change}>設定する</button>
                                                                }
                                                                /
                                                                <input
                                                                    type={"number"}
                                                                    value={input_itemnum}
                                                                    onChange={() => { Input_Change('input_num', "I_num") }}
                                                                    id="I_num"
                                                                ></input>
                                                            </div>
                                                        </div>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}