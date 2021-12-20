import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const dataPost: { id: number; rejectedReason: string } = body.dataPost;
    const { id, rejectedReason } = dataPost;
    try {
      await prisma.itemLog.update({
        where: {
          id,
        },
        data: {
          status: Status.CANCELLED,
          rejectedReason,
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
