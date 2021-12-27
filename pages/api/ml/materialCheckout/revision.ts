import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const data: {
      itemLogId: number;
      itemId: number;
      remarkId: number;
      quantity: number;
      oldQty: number;
    }[] = body.dataPost;

    try {
      Promise.all(
        data.map((d) =>
          prisma.itemLog.update({
            where: {
              id: d.itemLogId,
            },
            data: {
              status: Status.CHECKOUT,
              remarkId: d.remarkId,
              quantity: d.quantity,
            },
          })
        )
      );

      Promise.all(
        data.map((d) =>
          prisma.item.update({
            where: {
              id: d.itemId,
            },
            data: {
              avl: {
                decrement: d.quantity - d.oldQty,
              },
            },
          })
        )
      );

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      res.status(500).json({
        object: err,
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
