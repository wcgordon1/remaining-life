import React, { useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import BirthDateInput from './components/BirthDateInput';
import StatCard from './components/StatCard';
import { calculateLifeStats } from './utils/lifeStats';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const stats = birthDate ? calculateLifeStats(new Date(birthDate)) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Remaining Life</h1>
          <p className="text-gray-600">You're either young or old, depending on how you look at it. It's probably time to do the thing you've been contemplating.</p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <BirthDateInput
            birthDate={birthDate}
            onChange={setBirthDate}
          />
        </div>

        {stats && (
          <div className="space-y-8">
            {stats.activities.map((activity) => (
              <StatCard
                key={activity.name}
                title={activity.name}
                description={activity.description}
                timesDone={activity.timesDone}
                timesLeft={activity.timesLeft}
                funFacts={activity.funFacts}
                impactLevel={activity.impactLevel}
                yearlyImpact={activity.yearlyImpact}
                birthDate={new Date(birthDate)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;