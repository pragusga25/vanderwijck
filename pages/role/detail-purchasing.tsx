import { RoleDetails } from './detail-business-process';

export default function Home() {
  return <RoleDetails title={Data.title} content={Data.content} />;
}

const Data = {
  title: 'Purchasing',
  content: 'In this business process, the purchasing division is responsible for receiving requests for purchasing goods from the logistics material division. This division has a role to make requests for quotations to vendors for the selection of goods and also the best prices. After this tender activity, the purchasing division will send a purchase order and ask the vendor or supplier to deliver the goods.',
};
