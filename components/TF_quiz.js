//正解等を表示する場面

import styles from '../styles/quiz.module.css';
export default function TF_Quiz(props){
    //正誤判定
    if(props.tf=='T'){
        return(
            <div>
                <p className={styles.bigT}>正解！</p>
            </div>
        )
    }
    else{
        return(
            <div>
                <p className={styles.bigF}>不正解！</p>
            </div>
        )
    }
}