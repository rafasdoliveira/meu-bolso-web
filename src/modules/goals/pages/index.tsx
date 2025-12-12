import { ModuleHeader } from '@components/moduleHeader';
import { GoalsLayout } from '../components/layout';

function GoalsPage() {
  return (
    <GoalsLayout>
      <ModuleHeader
        title='Objetivos'
        subtitle='Adicione seus objetivos financeiros'
      />
    </GoalsLayout>
  );
}

export { GoalsPage };
