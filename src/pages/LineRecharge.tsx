import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { cn } from '../utils/cn';
import Header from '../components/Header';
import RechargeOption from '../components/Recharge/RechargeOption';

interface RechargePackage {
  id: string;
  name: string;
  altanOfferId: string;
  mirloFinalPrice: number;
  data: number;
  days: number;
  minutes: number;
  sms: number;
  color: string;
  isBestValue?: boolean;
  savings?: number;
}

const VALID_OFFER_IDS = [
  "1809904534",
  "1809904535",
  "1809904537",
  "1809904536",
  "1809904538"
];

const PACKAGE_COLORS: { [key: string]: string } = {
  "1809904534": "#339999",
  "1809904535": "#4B5563",
  "1809904537": "#FF5C1C",
  "1809904536": "#6366f1",
  "1809904538": "#059669",
};

const LineRecharge: React.FC = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | '7' | '15' | '30'>('all');
  const [packages, setPackages] = useState<RechargePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://devapi.mirlo.mx/api/v1/client/network-provider-line/offers?limit=999", {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm1pcmxvLm14LyJ9..dzaBNWhbQrgiyost.7n0diYuB_P686gwR-d7hfBrI0OmW3y6LYmV3cn8U7c1VaIEzsVV-U1YU3zeICazbXOXcefmYtVL5iDyt6dJ030ZG-VUgQhoCCiyA49WEBdNiQis-J6f_r7Zx1vD7Y46PgbdJl3iYc8aRzII0U70ZavIiKYJmRDshZISxUW9qzFlJDOESFiak3S4SrLQ9Yk3RvgNXmP7WXen12SShCkSQzfgv_0NwyX2EgJp3CdwATu_55c_0DN1Mm-Cnn04rf0NmtclPm805o88-NtI6ezBP84Jlew-ViHFUKeBj-5FKV4HJCinyWd-90SXLOWV8MCo5OHCFtll4-qad4xycAhNZLz_uDXlaUwRaR7WvvJe5q6Sz1lQvJtAYEMJGYPs2bMm9QdkdfMg.f9MLxB_i39TSmwbxsFu8mg"
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }

        const responseData = await response.json();
        
        // Filter and transform the packages
        const filteredPackages = responseData.data.items
          .filter((pkg: any) => VALID_OFFER_IDS.includes(pkg.altanOfferId))
          .map((pkg: any) => ({
            id: pkg.id,
            name: pkg.name,
            altanOfferId: pkg.altanOfferId,
            mirloFinalPrice: pkg.mirloFinalPrice,
            data: 5, // Static values as per current implementation
            days: pkg.altanOfferId === "1809904534" ? 7 : 
                  pkg.altanOfferId === "1809904535" ? 7 : 
                  pkg.altanOfferId === "1809904537" ? 15 :
                  pkg.altanOfferId === "1809904536" ? 15 : 30,
            minutes: 200,
            sms: 100,
            color: PACKAGE_COLORS[pkg.altanOfferId],
            isBestValue: pkg.altanOfferId === "1809904537",
            savings: pkg.altanOfferId === "1809904537" ? 15 : undefined
          }));

        setPackages(filteredPackages);
      } catch (err) {
        setError('Error loading packages. Please try again later.');
        console.error('Error fetching packages:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(pkg => 
    filter === 'all' || pkg.days.toString() === filter
  );

  const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);

  const handleProceedToCheckout = () => {
    if (selectedPackage) {
      navigate(`/checkout/${number}/${selectedPackage}`);
    }
  };

  if (isLoading) {
    return (
      <div className="lg:ml-64 p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:ml-64 p-4 md:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

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
              name={pkg.name}
              data={pkg.data}
              days={pkg.days}
              minutes={pkg.minutes}
              sms={pkg.sms}
              price={pkg.mirloFinalPrice}
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
              <p className="text-2xl font-semibold">${selectedPkg.mirloFinalPrice} MXN</p>
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