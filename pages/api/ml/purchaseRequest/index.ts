import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Incoterms, Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const dataPost: { itemLogId: number; quantity: number; unit: string }[] =
      body.dataPost;

    try {
      await prisma.itemLog.updateMany({
        where: {
          id: {
            in: dataPost.map((d) => d.itemLogId),
          },
        },
        data: {
          status: Status.PURCHASE_REQUEST_SENT,
        },
      });

      const pr = await prisma.purchaseRequest.create({
        data: {},
      });

      const dataPostPrLog = dataPost.map((d) => ({
        parentItemLogId: d.itemLogId,
        purchaseRequestId: pr.id,
        status: Status.PURCHASE_REQUEST_SENT,
        unit: d.unit,
        incoterm: Incoterms.CIF,
        quantity: d.quantity,
      }));

      await prisma.priItemLog.createMany({
        data: dataPostPrLog,
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
