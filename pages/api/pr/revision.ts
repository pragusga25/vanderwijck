import prisma from '@lib/prisma';
import { NextApiHandler } from 'next';
import { Incoterms, Status } from '@prisma/client';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const datas: {
      prItemLogId: number;
      itemLogId: number;
      date: Date;
      delTerm: Incoterms;
      sentTo: string;
      quantity: number;
      supplierName: string;
    }[] = body.datas;

    try {
      Promise.all(
        datas.map(async (data) => {
          const loc = await prisma.location.findFirst({
            where: {
              name: data.sentTo,
            },
          });
          const sup = await prisma.supplier.findFirst({
            where:{
              name: data.supplierName
            }
          })

          if (loc) {
            await prisma.itemLog.update({
              where: {
                id: data.itemLogId,
              },
              data: {
                status: Status.DELIVERY,
                locationId: loc.id,
                quantity: data.quantity,
              },
            });

            await prisma.priItemLog.update({
              where: {
                id: data.prItemLogId,
              },
              data: {
                status: Status.DELIVERY,
                date: data.date,
                incoterm: data.delTerm,
                quantity: data.quantity,
                supplierId: sup.id,
              },
            });
          }
        })
      ).catch(() => {
        throw new Error('Gagal memproses data');
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
