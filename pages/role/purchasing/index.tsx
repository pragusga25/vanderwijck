import { RoleTemplate } from '../project';
export default function Home() {
  return (
    <RoleTemplate
      title="Purchasing"
      role='purchasing'
      content={['purchase list', 'status', 'supplier database']}
      slug={[
        'purchasing/purchase-list',
        'purchasing/status',
        'purchasing/supplier-database',
      ]}
    />
  );
}
