import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';
import { LogisticsGoodReceiptData } from '@components/Logistics/Table/LogisticsGoodReceiptTable';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const dataPost: LogisticsGoodReceiptData[] = body.dataPost;
    try {
      const items = dataPost.map((d) => ({
        id: d.itemId,
        quantity: d.qty,
      }));

      const prLogIds = dataPost.map((d) => d.prItemLogId);
      const itemLogIds = dataPost.map((d) => d.itemLogId);

      await Promise.all(
        items.map((it) =>
          prisma.item.update({
            where: {
              id: it.id,
            },
            data: {
              quantity: {
                increment: Number(it.quantity),
              },
              avl: {
                increment: Number(it.quantity),
              },
            },
          })
        )
      );

      await prisma.itemLog.updateMany({
        where: {
          id: {
            in: itemLogIds,
          },
        },
        data: {
          status: Status.DELIVERED,
        },
      });

      await prisma.priItemLog.updateMany({
        where: {
          id: {
            in: prLogIds,
          },
        },
        data: {
          status: Status.DELIVERED,
        },
      });

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
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
