//アカウントを追加する
import {prisma} from 'lib/prisma';

export default async function handler(req, res) {
    const json = JSON.parse(JSON.stringify(req.body));

    const result = await prisma.family.create({
      data: {
        name: json.E_account,
        password:json.E_password,
      },
    });

    //挿入出来たらOKを送る
    res.status(200).json({
      'result': 'OK'
    });
  }
  