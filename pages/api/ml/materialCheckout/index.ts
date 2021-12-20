import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const dataPost: { id: number; quantity: number; itemId: number }[] =
      body.dataPost;
    const isDecline: boolean = body.isDecline;
    try {
      await prisma.itemLog.updateMany({
        where: {
          id: {
            in: dataPost.map((d) => d.id),
          },
        },
        data: {
          status: isDecline ? Status.DECLINED : Status.SELECTED_FOR_CHECKOUT,
        },
      });

      console.log(isDecline, 'ISCCDDD');

      if (!isDecline)
        Promise.all(
          dataPost.map((d) =>
            prisma.item.update({
              where: {
                id: d.itemId,
              },
              data: {
                avl: {
                  decrement: d.quantity,
                },
              },
            })
          )
        ).then(() => {
          console.log('Successfully');
        });

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        message: 'Error',
      });
    }

    // const data
  } else {
    // not allowed
    res.status(405).json({
      message: 'Method not allowed',
    });
  }
};

export default handler;
