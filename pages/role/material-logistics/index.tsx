import { RoleTemplate } from '../project';

export default function Home() {
  return (
    <RoleTemplate
    role='logistics'
      title="Material Request"
      content={['material checkout', 'purchase request', 'storage database']}
      slug={[
        'material-logistics/material-checkout',
        'material-logistics/purchase-request',
        'material-logistics/storage-database',
      ]}
    />  
  );
}
