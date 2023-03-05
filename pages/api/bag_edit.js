//防災バッグの追加や削除
import { prisma } from 'lib/prisma';

export default async function handler(req, res) {
    const json = JSON.parse(JSON.stringify(req.body));

    //データを追加
    if (json.which=='add') {
        const result = await prisma.bag_management.create({
            data: {
                user: json.E_username,
                bags_name: json.E_bagname
            },
        });
    }
    //データの削除
    else if(json.which=='delete'){
        //バッグ内のアイテムの削除
        const item=await prisma.contents.deleteMany({
            where:{
                bag_name:json.E_bagname
            }
        })
        //バッグの削除
        const result =await prisma.bag_management.deleteMany({
            where:{
                user:json.E_username,
                bags_name:json.E_bagname
            },
        })
    }

    //挿入出来たらOKを送る
    res.status(200).json({
        'result': 'OK'
    });
}
