//アイテムの追加と削除
import { prisma } from 'lib/prisma';

export default async function handler(req, res) {
  const json = JSON.parse(JSON.stringify(req.body));

  if (json.which == 'add') {
    const result = await prisma.contents.create({
      data: {
        user_name: json.E_username,
        bag_name: json.E_bagname,
        item_id: Number(json.E_itemid),
        detail: json.E_detail,
        dead_line: Number(json.E_deadline),
        num: Number(json.E_num)
      },
    });
  }
  else if (json.which == 'delete') {
    //データを削除
    const result=await prisma.contents.deleteMany({
      where: {
        user_name: json.E_username,
        bag_name: json.E_bagname,
        item_id: Number(json.E_itemid),
        detail: json.E_detail,
        dead_line: Number(json.E_deadline),
        num: Number(json.E_num)
      }
    })

  }

  //挿入出来たらOKを送る
  res.status(200).json({
    'result': 'OK'
  });
}