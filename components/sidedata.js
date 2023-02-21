//material-uiを活用
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HelpIcon from '@mui/icons-material/Help';

//サイドバーの中身を記述
export const Sidedata=[
    {
        title:"ホーム",
        icon:<HomeIcon />,
        link:"/home",
        current:"home"
    },
    {
        title:"避難訓練",
        icon:<DirectionsRunOutlinedIcon />,
        link:"/simulation",
        current:"simulation"
    },
    {
        title:"バッグ",
        icon:<LocalMallIcon />,
        link:"/bag",
        current:"bag"
    },
    {
        title:"クイズ",
        icon:<QuestionAnswerIcon />,
        link:"/quiz",
        current:"quiz"
    },
    {
        title:"お金",
        icon:<MonetizationOnIcon />,
        link:"/money",
        current:"money"
    },
    {
        title:"使い方",
        icon:<HelpIcon />,
        link:"/explanation",
        current:"explanation"
    }
]