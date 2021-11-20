import { RoleDetails } from './detail-business-process';

export default function Home() {
  return <RoleDetails title={Data.title} content={Data.content} />;
}

const Data = {
  title: 'Material & Logistics',
  content: 'Materials and Logistics is the division responsible for connecting two stakeholders in the procurement process. In addition to making a purchase request, the material and logistics division can also remove goods from their inventory to be given to the project department to carry out a ship repair activity.',
};
