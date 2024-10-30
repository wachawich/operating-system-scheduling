// components/FCFSScheduler.jsx
'use client';  // This is important for Next.js client-side components

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const FCFSScheduler = () => {
    const [processes, setProcesses] = useState([
        { id: "P1", burstTime: 4, arrivalTime: 0 },
    ]);

    const [lastProcessId, setLastProcessId] = useState(2);

    const [newProcess, setNewProcess] = useState({
        id: "",
        burstTime: "",
        arrivalTime: ""
    });

    const calculateSchedule = (processes) => {
        const n = processes.length;
        const waitingTime = new Array(n).fill(0);
        const turnaroundTime = new Array(n).fill(0);
        let currentTime = 0;
        let scheduleBlocks = [];
        let totalTurnaroundTime = 0;
        const processesCopy = [...processes];


        processesCopy.sort((a, b) => a.arrivalTime - b.arrivalTime);

        processesCopy.forEach((process, i) => {
            if (currentTime < process.arrivalTime) {
                // Add idle block if there's a gap
                if (currentTime < process.arrivalTime) {
                    scheduleBlocks.push({
                        id: "idle",
                        start: currentTime,
                        end: process.arrivalTime
                    });
                }
                currentTime = process.arrivalTime;
            }

            waitingTime[i] = currentTime - process.arrivalTime;
            turnaroundTime[i] = totalTurnaroundTime + process.burstTime;
            totalTurnaroundTime += process.burstTime;

            scheduleBlocks.push({
                id: process.id,
                start: currentTime,
                end: currentTime + process.burstTime
            });

            currentTime += process.burstTime;
        });

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

    let schedule = calculateSchedule(processes);

    const getRandomProcessId = () => {
        return `P${Math.floor(Math.random() * 100)}`; // Random Process ID (e.g., P1, P42, etc.)
    };
    
    const addRandomProcess = () => {
        const randomProcess = {
            id: `P${lastProcessId}`, // Use the last used ID
            burstTime: Math.floor(Math.random() * 20) + 1, // Random Burst Time
            arrivalTime: Math.floor(Math.random() * 10) // Random Arrival Time
        };

        // Increment the lastProcessId for the next process
        setLastProcessId(lastProcessId + 1);
        
        // Add the new process to the list
        setProcesses([...processes, randomProcess]);

        schedule = calculateSchedule(processes);
    };
    const removeProcess = (index) => {
        setProcesses(processes.filter((_, i) => i !== index));
    };

    const colorPalette = {
        P1: 'bg-red-500',        // Color for P1
        P2: 'bg-green-500',      // Color for P2
        P3: 'bg-blue-500',       // Color for P3
        P4: 'bg-yellow-500',     // Color for P4
        P5: 'bg-purple-500',     // Color for P5
        P6: 'bg-pink-500',       // Color for P6
        P7: 'bg-teal-500',       // Color for P7
        P8: 'bg-orange-500',     // Color for P8
        P9: 'bg-indigo-500',     // Color for P9
        P10: 'bg-gray-500',      // Color for P10
        P11: 'bg-red-600',       // Color for P11 (darker red)
        P12: 'bg-green-600',     // Color for P12 (darker green)
        P13: 'bg-blue-600',      // Color for P13 (darker blue)
        P14: 'bg-yellow-600',    // Color for P14 (darker yellow)
        P15: 'bg-purple-600',    // Color for P15 (darker purple)
        P16: 'bg-pink-600',      // Color for P16 (darker pink)
        P17: 'bg-teal-600',      // Color for P17 (darker teal)
        P18: 'bg-orange-600',    // Color for P18 (darker orange)
        P19: 'bg-indigo-600',    // Color for P19 (darker indigo)
        P20: 'bg-gray-600',       // Color for P20 (darker gray)
    };
    
    const getProcessColor = (processId) => {
        return colorPalette[processId] || 'bg-gray-500'; // ค่าเริ่มต้นถ้าไม่ตรงกับ ID
    };

    return (
        <Card className="w-full max-w-4xl shadow-none border-0">
            <CardHeader>
                <CardTitle>First Come First Serve (FCFS) Scheduler</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Input form for new process */}
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

                {/* Process table */}
                <div className="mb-6 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-2 text-sm">Process</th>
                                <th className="text-left p-2 text-sm">Burst Time</th>
                                <th className="text-left p-2 text-sm">Arrival Time</th>
                                <th className="text-left p-2 text-sm">Waiting Time</th>
                                <th className="text-left p-2 text-sm">Turnaround Time</th>
                                <th className="text-left p-2 text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((process, index) => (
                                <tr className='h-8' key={process.id}>
                                    <td className="p-2 text-xs">{process.id}</td>
                                    <td className="p-2 text-xs">{process.burstTime}</td>
                                    <td className="p-2 text-xs">{process.arrivalTime}</td>
                                    <td className="p-2 text-xs">{schedule.waitingTime[index]}</td>
                                    <td className="p-2 text-xs">{schedule.turnaroundTime[index]}</td>
                                    <td className="p-2 text-xs w-full flex justify-center border-0">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeProcess(index)}
                                            style={{ fontSize: '8px' }}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Average times */}
                <div className="mb-6 shadow-none border-0">
                    <p className="mb-2 shadow-none border-0">Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp; <span className='border-0 text-2xl font-bold'>{schedule.avgWaitingTime.toFixed(2)}</span></p>
                    <p className='shadow-none border-0'>Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp; <span className='border-0 text-2xl font-bold'>{schedule.avgTurnaroundTime.toFixed(2)}</span></p>
                </div>

                {/* Gantt chart */}
                <div className="mb-4 border-0">
                    <h3 className="text-lg font-semibold mb-2 border-0">Gantt Chart</h3>
                    <div className="relative h-12 border rounded border-0">
                        {schedule.scheduleBlocks.map((block, index) => {
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
                        {/* Time markers */}
                        {schedule.scheduleBlocks.map((block, index) => (
                            <React.Fragment key={index}>
                                {/* Marker for the start time */}
                                <div
                                    className="absolute text-xs border-0"
                                    style={{
                                        left: `${(block.start / schedule.totalTime) * 100}%`,
                                        transform: 'translateX(-50%)',
                                        color: 'black' // Optional: Change color for start markers
                                    }}
                                >
                                    {block.start}
                                </div>
                                {/* Marker for the end time */}
                                <div
                                    className="absolute text-xs border-0"
                                    style={{
                                        left: `${(block.end / schedule.totalTime) * 100}%`,
                                        transform: 'translateX(-50%)',
                                        color: 'black' // Optional: Change color for end markers
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

export default FCFSScheduler;