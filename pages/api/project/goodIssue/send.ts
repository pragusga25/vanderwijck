import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    console.log(body, 'BODYYY');
    try {
      const transaction = await prisma.transaction.create({
        data: {
          status: Status.ISSUE_REQUEST_SENT,
          requestedBy: body.requestedBy,
          approvedBy: body.approvedBy,
          projectId: 1367,
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
