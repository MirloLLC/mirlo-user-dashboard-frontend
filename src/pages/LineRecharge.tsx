import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { cn } from '../utils/cn';
import Header from '../components/Header';
import RechargeOption from '../components/Recharge/RechargeOption';

interface RechargePackage {
  id: number;
  data: number;
  days: number;
  minutes: number;
  sms: number;
  price: number;
  color: string;
  isBestValue?: boolean;
  savings?: number;
}

const LineRecharge: React.FC = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | '7' | '15' | '30'>('all');

  const packages: RechargePackage[] = [
    {
      id: 1,
      data: 2,
      days: 7,
      minutes: 100,
      sms: 50,
      price: 79,
      color: '#339999',
    },
    {
      id: 2,
      data: 3,
      days: 7,
      minutes: 150,
      sms: 75,
      price: 99,
      color: '#4B5563',
    },
    {
      id: 3,
      data: 5,
      days: 15,
      minutes: 200,
      sms: 100,
      price: 199,
      color: '#FF5C1C',
      isBestValue: true,
      savings: 15,
    },
    {
      id: 4,
      data: 8,
      days: 15,
      minutes: 250,
      sms: 125,
      price: 249,
      color: '#6366f1',
    },
    {
      id: 5,
      data: 10,
      days: 30,
      minutes: 350,
      sms: 150,
      price: 299,
      color: '#059669',
    },
    {
      id: 6,
      data: 15,
      days: 30,
      minutes: 500,
      sms: 200,
      price: 399,
      color: '#7C3AED',
      savings: 10,
    }
  ];

  const filteredPackages = packages.filter(pkg => 
    filter === 'all' || pkg.days.toString() === filter
  );

  const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);

  const handleProceedToCheckout = () => {
    if (selectedPackage) {
      navigate(`/checkout/${number}/${selectedPackage}`);
    }
  };

  return (
    <div className="lg:ml-64 p-4 md:p-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <div className="flex justify-between items-center mb-8">
        <Header 
          title="Recargar línea" 
          subtitle={`Número: ${number}`}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2 -mx-2 px-2">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <div className="flex gap-2 flex-nowrap">
            {['all', '7', '15', '30'].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option as typeof filter)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  filter === option
                    ? 'bg-brand text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {option === 'all' ? 'Todos' : `${option} días`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <RechargeOption
              key={pkg.id}
              data={pkg.data}
              days={pkg.days}
              minutes={pkg.minutes}
              sms={pkg.sms}
              price={pkg.price}
              color={pkg.color}
              selected={selectedPackage === pkg.id}
              onSelect={() => setSelectedPackage(pkg.id)}
              isBestValue={pkg.isBestValue}
              savings={pkg.savings}
            />
          ))}
        </div>

        {selectedPkg && (
          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <div>
              <p className="text-sm text-gray-600">Total a pagar</p>
              <p className="text-2xl font-semibold">${selectedPkg.price} MXN</p>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-orange-600 transition-colors text-lg font-medium"
            >
              Ir a pagar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineRecharge;