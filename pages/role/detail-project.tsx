import { RoleDetails } from './detail-business-process';

export default function Home() {
  return <RoleDetails title={Data.title} content={Data.content} />;
}

const Data = {
  title: 'Project',
  content: 'Project is the division that responsible for ship repair activities. Every activity will be controlled by working on the list given by the commercial division and the ship owner. In this business process, the role of the project is to make requests for goods to the material and logistics division and provide good issues for proof of use of goods.',
};
