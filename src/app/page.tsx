import { loadUsesConfig } from '@/lib/uses';
import { UsesPage } from '@/components/uses/uses-page';

export default function Home() {
  const config = loadUsesConfig();
  
  return <UsesPage config={config} />;
}
