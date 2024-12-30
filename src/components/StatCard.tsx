import React, { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Info } from 'lucide-react';
import { calculateAgeStats } from '../utils/dateCalculations';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

interface StatCardProps {
  title: string;
  description: string;
  timesDone: number;
  timesLeft: number;
  funFacts: string[];
  yearlyImpact: string;
  impactLevel: number;
  birthDate: Date;
}

export default function StatCard({
  title,
  description,
  timesDone,
  timesLeft,
  funFacts,
  yearlyImpact,
  impactLevel,
  birthDate
}: StatCardProps) {
  const [showFacts, setShowFacts] = useState(false);
  const { earlyDeathAge, futureDeathAge } = calculateAgeStats(birthDate);

  const total = timesDone + timesLeft;
  const earlyDeathTotal = Math.floor((timesDone / total) * total * 0.9); // 90% of times done
  const futureDeathTotal = Math.floor((timesDone / total) * total * 1.1); // 110% of times done

  const data = {
    labels: ['Time Lived', 'Time Remaining', `RIP age ${earlyDeathAge}`, `RIP age ${futureDeathAge}`, 'Impact Level'],
    datasets: [
      {
        data: [timesDone, timesLeft, earlyDeathTotal, futureDeathTotal, impactLevel * (total / 10)],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',   // dark blue - time lived
          'rgba(147, 197, 253, 0.7)',  // light blue - time remaining
          'rgba(147, 51, 234, 0.7)',   // purple - early death point
          'rgba(239, 68, 68, 0.7)',    // red - future death point
          'rgba(34, 197, 94, 0.7)',    // green - impact level
        ],
        borderWidth: 1,
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(147, 197, 253, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: Math.max(total, earlyDeathTotal, futureDeathTotal) * 1.2,
        ticks: {
          display: false,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          generateLabels: (chart: any) => [{
            text: 'Time Lived',
            fillStyle: 'rgba(59, 130, 246, 0.7)',
            strokeStyle: 'rgba(59, 130, 246, 1)',
            lineWidth: 1,
            hidden: false,
            index: 0
          }, {
            text: 'Time Remaining',
            fillStyle: 'rgba(147, 197, 253, 0.7)',
            strokeStyle: 'rgba(147, 197, 253, 1)',
            lineWidth: 1,
            hidden: false,
            index: 1
          }, {
            text: `RIP age ${earlyDeathAge}`,
            fillStyle: 'rgba(147, 51, 234, 0.7)',
            strokeStyle: 'rgba(147, 51, 234, 1)',
            lineWidth: 1,
            hidden: false,
            index: 2
          }, {
            text: `RIP age ${futureDeathAge}`,
            fillStyle: 'rgba(239, 68, 68, 0.7)',
            strokeStyle: 'rgba(239, 68, 68, 1)',
            lineWidth: 1,
            hidden: false,
            index: 3
          }, {
            text: 'Impact Level',
            fillStyle: 'rgba(34, 197, 94, 0.7)',
            strokeStyle: 'rgba(34, 197, 94, 1)',
            lineWidth: 1,
            hidden: false,
            index: 4
          }]
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw.toLocaleString();
            if (context.datasetIndex === 0 && context.dataIndex === 4) {
              return `Impact Level: ${impactLevel}/10`;
            }
            return `${context.label}: ${value} times`;
          },
        },
      },
    },
  };

  const percentageDone = (timesDone / total) * 100;
  const percentageLeft = (timesLeft / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => setShowFacts(!showFacts)}
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          <Info size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      {showFacts && (
        <div className="absolute top-16 right-4 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <h4 className="font-semibold mb-2">Fun Facts</h4>
          <ul className="text-sm space-y-2">
            {funFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
          <div className="mt-2 pt-2 border-t">
            <p className="text-sm font-semibold">Yearly Impact:</p>
            <p className="text-sm text-gray-600">{yearlyImpact}</p>
          </div>
        </div>
      )}

      <div className="h-80 w-full mb-6">
        <PolarArea data={data} options={options} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-600 font-medium">Time Lived</span>
            <span className="text-gray-600">{timesDone.toLocaleString()} ({percentageDone.toFixed(1)}%)</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${percentageDone}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-400 font-medium">Time Remaining</span>
            <span className="text-gray-600">{timesLeft.toLocaleString()} ({percentageLeft.toFixed(1)}%)</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-400 rounded-full"
              style={{ width: `${percentageLeft}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Time Lived</p>
          <p className="font-semibold text-blue-600">{timesDone.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Time Remaining</p>
          <p className="font-semibold text-blue-400">{timesLeft.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">RIP age {earlyDeathAge}</p>
          <p className="font-semibold text-purple-600">{earlyDeathTotal.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">RIP age {futureDeathAge}</p>
          <p className="font-semibold text-red-600">{futureDeathTotal.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Impact Level</p>
          <p className="font-semibold text-green-600">{impactLevel}/10</p>
        </div>
      </div>
    </div>
  );
}