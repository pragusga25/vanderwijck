import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';
import uniqid from 'uniqid';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const dataPost: {
      itemLogId: number;
      requestedBy: string;
      isCanceled: boolean;
      quantity: number;
      s;
      transactionCode: string;
    } = body.dataPost;

    try {
      if (!dataPost.isCanceled) {
        const transaction = await prisma.transaction.create({
          data: {
            status: Status.ISSUE_REQUEST_SENT,
            requestedBy: dataPost.requestedBy,
            projectId: 1367,
            id: uniqid(),
          },
        });

        await prisma.itemLog.update({
          where: {
            id: dataPost.itemLogId,
          },
          data: {
            transactionId: transaction.id,
            status: Status.ISSUE_REQUEST_SENT,
            quantity: {
              decrement: dataPost.quantity,
            },
          },
        });
      } else {
        await prisma.transaction.update({
          where: {
            id: dataPost.transactionCode,
          },
          data: {
            status: Status.BOOK_CANCELLED,
          },
        });

        const d = await prisma.itemLog.update({
          where: {
            id: dataPost.itemLogId,
          },
          data: {
            status: Status.BOOK_CANCELLED,
          },
        });

        await prisma.item.update({
          where: {
            id: d.itemId,
          },
          data: {
            booked: {
              decrement: dataPost.quantity,
            },
            avl: {
              increment: dataPost.quantity,
            },
            quantity: {
              increment: dataPost.quantity,
            },
          },
        });
      }

      res.status(200).json({
        message: 'success',
      });
    } catch (err) {
      res.status(500).json({
        object: err,
        message: 'Error',
      });
    }
  } else {
    // not allowed
    res.status(405).json({
      message: 'Method not allowed',
    });
  }
};

export default handler;
