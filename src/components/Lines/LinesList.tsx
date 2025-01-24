import React from 'react';
import { Plus } from 'lucide-react';
import LineCard from './LineCard';

const LinesList = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Líneas</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <LineCard
          number="55 1234 1234"
          plan="Plan 3GB"
          dataUsed={0.5}
          dataTotal={1}
          aiMinutesUsed={3}
          aiMinutesTotal={10}
          status="Activo"
          hasAIAgent={true}
          isAIConfigured={true}
        />
        <LineCard
          number="55 9876 5432"
          plan="Plan 5GB"
          dataUsed={2}
          dataTotal={5}
          aiMinutesUsed={0}
          aiMinutesTotal={10}
          status="Activo"
          hasAIAgent={true}
          isAIConfigured={false}
        />
      </div>
    </div>
  );
};

export default LinesList;
