import React from 'react';
import { Plus } from 'lucide-react';
import DeviceCard from './DeviceCard';

const DevicesList = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Equipos</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <DeviceCard
          name="SAMSUNG Galaxy A14 5G Negro"
          imageUrl="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Ff89a16b547d089fc90bb7c57f504561e.cdn.bubble.io%2Ff1733184532912x499022335313091600%2Fxiaomi-redmi-a3-img-1.png?w=256&h=256&auto=compress&dpr=1&fit=max"
          serialNumber="123412342123812352"
        />
      </div>
    </div>
  );
};

export default DevicesList;
