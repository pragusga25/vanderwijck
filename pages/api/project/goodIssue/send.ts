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
          status: Status.ISSUE_REQUEST_SENT,
          requestedBy: body.requestedBy,
          approvedBy: body.approvedBy,
          projectId: 1367,
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
