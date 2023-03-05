//サイドバー
//css 125~169

import { Sidedata } from 'components/sidedata';
import Link from 'next/link';

export default function Sidebar(props){
    return(
        <div className="sideback">
            <ul className="sidelist">
                <li>{props.username}</li>
                {Sidedata.map((value,key)=>{
                    return(
                        <Link href={{pathname:value.link,query:{username:props.username}}}
                        key={key}
                        >
                            <li 
                            key={key}
                            id={props.name==value.current ? "active":""}
                            className="row"
                            >
                                <div id="icon">{value.icon}</div>
                                <div id="title">{value.title}</div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    )
}