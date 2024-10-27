"use client"; // Add this directive at the top

import Image from "next/image";
import { useState } from 'react';
import FCFSScheduler from './components/FCFS';
import RRScheduler from './components/RR'; // Example for Round Robin
import SJFScheduler from './components/SJF'; // Example for Shortest Job First
import SRTFScheduler from './components/SRTF'; // Example for Shortest Job First
import PriorityScheduler from './components/Priority'; // Example for Shortest Job First
import HRRNScheduler from './components/HRRN'; // Example for Shortest Job First
import MLQFScheduler from './components/MLQF'; // Example for Shortest Job First

const algorithms = [
  { name: 'FCFS', component: FCFSScheduler },
  { name: 'Round Robin', component: RRScheduler },
  { name: 'SJF - Shortest Job First', component: SJFScheduler },
  { name: 'SRTF - Shortest Remaining Time First', component: SRTFScheduler },
  { name: 'Priority', component: PriorityScheduler },
  { name: 'HRRN', component: HRRNScheduler },
  { name: 'Multilevel Queue with Feedback', component: MLQFScheduler },
];

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);

  const handleAlgorithmChange = (event) => {
    const selected = algorithms.find(alg => alg.name === event.target.value);
    setSelectedAlgorithm(selected);
  };

  const SelectedScheduler = selectedAlgorithm.component;

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-24 border-0">
      <div className="flex items-center justify-around w-7/12 rounded-lg border-0 bg-card">
        <div className="border-0 w-8/12"></div>
        <select
          onChange={handleAlgorithmChange}
          value={selectedAlgorithm.name}
          className="mb-2 p-2 border border-gray-300 rounded w-40"
        >
          {algorithms.map(alg => (
            <option key={alg.name} value={alg.name}>
              {alg.name}
            </option>
          ))}
        </select>
      </div>
      <SelectedScheduler />
    </main>
  );
}
