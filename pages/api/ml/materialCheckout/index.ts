import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const dataPost: {
      id: number;
      quantity: number;
      itemId: number;
      rejectedReason?: string;
    }[] = body.dataPost;
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
          rejectedReason: isDecline ? body.rejectedReason : null,
        },
      });

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
