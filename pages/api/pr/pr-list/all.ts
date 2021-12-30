import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;
    try {
      const newStatus = Status.CREATING_PURCHASE_ORDER;

      await prisma.priItemLog.updateMany({
        where: {
          id: {
              in: body.datas as number[]
          }
        },
        data: {
          status: newStatus,
        },
      });

      await prisma.itemLog.updateMany({
        where: {
          PriItemLog:{
              every:{
                  id: {
                      in: body.datas as number[]
                  }
              }
          },
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
