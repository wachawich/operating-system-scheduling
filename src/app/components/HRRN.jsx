'use client';  // This is important for Next.js client-side components

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const HRRNScheduler = () => {
    const [processes, setProcesses] = useState([
        { id: "P1", burstTime: 10, arrivalTime: 0 },
    ]);

    const [lastProcessId, setLastProcessId] = useState(2);
    const [schedule, setSchedule] = useState({});
    const [newProcess, setNewProcess] = useState({
        id: "",
        burstTime: "",
        arrivalTime: ""
    });

    useEffect(() => {
        const newSchedule = calculateSchedule(processes);
        setSchedule(newSchedule);
    }, [processes]);

    const calculateSchedule = (processes) => {
        const n = processes.length;
        const waitingTime = new Array(n).fill(0);
        const turnaroundTime = new Array(n).fill(0);
        const completionTime = new Array(n).fill(0);
        const remainingProcesses = [...processes];
        const scheduleBlocks = [];
        let currentTime = 0;
        
        while (remainingProcesses.length > 0) {
            let highestResponseRatio = -1;
            let selectedIndex = -1;

            for (let i = 0; i < remainingProcesses.length; i++) {
                const process = remainingProcesses[i];
                const waitingTimeForProcess = currentTime - process.arrivalTime;
                const responseRatio = (waitingTimeForProcess + process.burstTime) / process.burstTime;
                
                if (process.arrivalTime <= currentTime) {
                    if (responseRatio > highestResponseRatio) {
                        highestResponseRatio = responseRatio;
                        selectedIndex = i;
                    }
                }
            }

            if (selectedIndex === -1) {
                currentTime++;
                continue;
            }

            const process = remainingProcesses[selectedIndex];
            currentTime += process.burstTime;

            scheduleBlocks.push({
                id: process.id,
                start: currentTime - process.burstTime,
                end: currentTime
            });

            const completionIdx = processes.findIndex(p => p.id === process.id);
            completionTime[completionIdx] = currentTime;
            turnaroundTime[completionIdx] = completionTime[completionIdx] - process.arrivalTime;
            waitingTime[completionIdx] = turnaroundTime[completionIdx] - process.burstTime;

            remainingProcesses.splice(selectedIndex, 1);
        }

        const avgWaitingTime = waitingTime.reduce((a, b) => a + b, 0) / n;
        const avgTurnaroundTime = turnaroundTime.reduce((a, b) => a + b, 0) / n;

        return {
            waitingTime,
            turnaroundTime,
            avgWaitingTime,
            avgTurnaroundTime,
            scheduleBlocks,
            totalTime: currentTime
        };
    };

    const addProcess = () => {
        if (newProcess.id && newProcess.burstTime && newProcess.arrivalTime) {
            setProcesses([...processes, {
                id: newProcess.id,
                burstTime: parseInt(newProcess.burstTime),
                arrivalTime: parseInt(newProcess.arrivalTime)
            }]);
            setNewProcess({ id: "", burstTime: "", arrivalTime: "" });
        }
    };

    const addRandomProcess = () => {
        const randomProcess = {
            id: `P${lastProcessId}`,
            burstTime: Math.floor(Math.random() * 20) + 1,
            arrivalTime: Math.floor(Math.random() * 10)
        };

        setLastProcessId(lastProcessId + 1);
        
        setProcesses([...processes, randomProcess]);
    };

    const removeProcess = (index) => {
        setProcesses(processes.filter((_, i) => i !== index));
    };

    const colorPalette = {
        P1: 'bg-red-500',
        P2: 'bg-green-500',
        P3: 'bg-blue-500',
        P4: 'bg-yellow-500',
        P5: 'bg-purple-500',
        P6: 'bg-pink-500',
        P7: 'bg-teal-500',
        P8: 'bg-orange-500',
        P9: 'bg-indigo-500',
        P10: 'bg-gray-500',
        P11: 'bg-red-600',
        P12: 'bg-green-600',
        P13: 'bg-blue-600',
        P14: 'bg-yellow-600',
        P15: 'bg-purple-600',
        P16: 'bg-pink-600',
        P17: 'bg-teal-600',
        P18: 'bg-orange-600',
        P19: 'bg-indigo-600',
        P20: 'bg-gray-600',
    };
    
    const getProcessColor = (processId) => {
        return colorPalette[processId] || 'bg-gray-500';
    };

    return (
        <Card className="w-full max-w-4xl shadow-none border-0">
            <CardHeader>
                <CardTitle>Highest Response Ratio Next (HRRN) Scheduler</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4 shadow-none border-0 mt-4 w-full justify-end">
                    <Input
                        placeholder="Process ID"
                        value={newProcess.id}
                        onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
                        className="w-32"
                    />
                    <Input
                        placeholder="Burst Time"
                        type="number"
                        value={newProcess.burstTime}
                        onChange={(e) => setNewProcess({ ...newProcess, burstTime: e.target.value })}
                        className="w-32"
                    />
                    <Input
                        placeholder="Arrival Time"
                        type="number"
                        value={newProcess.arrivalTime}
                        onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: e.target.value })}
                        className="w-32"
                    />
                    <Button onClick={addProcess}>Add Process</Button>
                    <Button onClick={addRandomProcess}>Random Process</Button>
                </div>

                <div className="mb-6 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Process</th>
                                <th className="text-left p-2">Burst Time</th>
                                <th className="text-left p-2">Arrival Time</th>
                                <th className="text-left p-2">Waiting Time</th>
                                <th className="text-left p-2">Turnaround Time</th>
                                <th className="text-left p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((process, index) => (
                                <tr key={process.id}>
                                    <td className="p-2">{process.id}</td>
                                    <td className="p-2">{process.burstTime}</td>
                                    <td className="p-2">{process.arrivalTime}</td>
                                    <td className="p-2">{schedule.waitingTime?.[index]}</td>
                                    <td className="p-2">{schedule.turnaroundTime?.[index]}</td>
                                    <td className="p-2 w-2">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeProcess(index)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mb-6 shadow-none border-0">
                    <p className="mb-2 shadow-none border-0">Average Waiting Time: <span className='border-0 text-2xl font-bold'>{schedule.avgWaitingTime?.toFixed(2)}</span></p>
                    <p className='shadow-none border-0'>Average Turnaround Time: <span className='border-0 text-2xl font-bold'>{schedule.avgTurnaroundTime?.toFixed(2)}</span></p>
                </div>

                <div className="mb-4 border-0">
                    <h3 className="text-lg font-semibold mb-2 border-0">Gantt Chart</h3>
                    <div className="relative h-16 border rounded border-0">
                        {schedule.scheduleBlocks?.map((block, index) => {
                            const widthPercentage = ((block.end - block.start) / schedule.totalTime) * 100;
                            const leftPercentage = (block.start / schedule.totalTime) * 100;

                            return (
                                <div
                                    key={index}
                                    className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                    style={{
                                        left: `${leftPercentage}%`,
                                        width: `${widthPercentage}%`
                                    }}
                                >
                                    <span className="text-sm font-medium border-0 text-white">
                                        {block.id}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="relative h-6 border-0">
                        {schedule.scheduleBlocks?.map((block, index) => (
                            <React.Fragment key={index}>
                                <div
                                    className="absolute text-xs border-0"
                                    style={{
                                        left: `${(block.start / schedule.totalTime) * 100}%`,
                                        transform: 'translateX(-50%)',
                                        color: 'black'
                                    }}
                                >
                                    {block.start}
                                </div>
                                <div
                                    className="absolute text-xs border-0"
                                    style={{
                                        left: `${(block.end / schedule.totalTime) * 100}%`,
                                        transform: 'translateX(-50%)',
                                        color: 'black'
                                    }}
                                >
                                    {block.end}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HRRNScheduler;