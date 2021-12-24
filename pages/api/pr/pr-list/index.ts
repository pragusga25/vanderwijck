import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const {
      prItemLogId,
      isDeclined,
    }: {
      prItemLogId: number;
      isDeclined: boolean;
    } = body;

    try {
      const newStatus = isDeclined
        ? Status.DECLINED
        : Status.CREATING_PURCHASE_ORDER;

      const d = await prisma.priItemLog.update({
        where: {
          id: prItemLogId,
        },

        data: {
          status: newStatus,
        },
      });

      await prisma.itemLog.update({
        where: {
          id: d.parentItemLogId,
        },
        data: {
          status: newStatus,
        },
      });

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
