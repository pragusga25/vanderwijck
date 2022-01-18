import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';
import uniqid from 'uniqid';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    try {
      const transaction = await prisma.transaction.create({
        data: {
          status: Status.BOOK_REQUEST,
          requestedBy: body.requestedBy,
          projectId: 1367,
          approvedBy: body.approvedBy,
          id: uniqid(),
        },
      });

      const transactionId = transaction.id;
      // const transactionId = 123;

      const dataFix = body?.dataPost.map((d) => ({
        ...d,
        transactionId,
      }));

      await prisma.itemLog.createMany({
        data: dataFix,
      });

      await Promise.all(
        dataFix.map((d) =>
          prisma.item.update({
            where: {
              id: d.itemId,
            },
            data: {
              booked: {
                increment: d.quantity,
              },
              avl: {
                decrement: d.quantity,
              },
            },
          })
        )
      ).then(() => {});

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      res.status(500).json({
        message: 'Error',
        object: err,
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
