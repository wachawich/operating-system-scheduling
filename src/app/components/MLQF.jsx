'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const MLQFScheduler = () => {
    const [processes, setProcesses] = useState([{ id: "P1", burstTime: 10, arrivalTime: 0 }]);
    const [lastProcessId, setLastProcessId] = useState(2);
    const [quantum, setQuantum] = useState([5, 10]); // Different quantum for different queues
    const [schedule, setSchedule] = useState({});
    const [newProcess, setNewProcess] = useState({ id: "", burstTime: "", arrivalTime: "" });

    useEffect(() => {
        const newSchedule = calculateSchedule(processes, quantum);
        setSchedule(newSchedule);
    }, [processes, quantum]);

    const calculateSchedule = (processes, quantum) => {
        const n = processes.length;
        const waitingTime = new Array(n).fill(0);
        const turnaroundTime = new Array(n).fill(0);
        const completionTime = new Array(n).fill(0);
        const queue = processes.map((p) => ({ ...p, remainingTime: p.burstTime, queue: 0 }));

        const scheduleBlocks = [];
        let currentTime = 0;

        while (queue.some(p => p.remainingTime > 0)) {
            queue.sort((a, b) => a.queue - b.queue || a.arrivalTime - b.arrivalTime);

            for (let i = 0; i < queue.length; i++) {
                const process = queue[i];

                if (process.remainingTime === 0) continue;

                if (currentTime < process.arrivalTime) {
                    currentTime = process.arrivalTime;
                }

                const currentQuantum = quantum[process.queue] || quantum[quantum.length - 1];
                const executionTime = Math.min(currentQuantum, process.remainingTime);
                process.remainingTime -= executionTime;
                currentTime += executionTime;

                scheduleBlocks.push({
                    id: process.id,
                    start: currentTime - executionTime,
                    end: currentTime,
                });

                if (process.remainingTime > 0) {
                    if (process.queue < quantum.length - 1) process.queue += 1;
                } else {
                    const index = processes.findIndex(p => p.id === process.id);
                    completionTime[index] = currentTime;
                    turnaroundTime[index] = completionTime[index] - process.arrivalTime;
                    waitingTime[index] = turnaroundTime[index] - process.burstTime;
                }
            }
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

    const getProcessColor = (processId) => colorPalette[processId] || 'bg-gray-500';

    return (
        <Card className="w-full max-w-4xl shadow-none border-0">
            <CardHeader>
                <CardTitle>Multilevel Queue with Feedback Scheduler</CardTitle>
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
                                <tr key={process.id}>
                                    <td className="p-2 text-xs">{process.id}</td>
                                    <td className="p-2 text-xs">{process.burstTime}</td>
                                    <td className="p-2 text-xs">{process.arrivalTime}</td>
                                    <td className="p-2 text-xs">{schedule.waitingTime?.[index]}</td>
                                    <td className="p-2 text-xs">{schedule.turnaroundTime?.[index]}</td>
                                    <td className="p-2 text-xs w-2">
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

                {/* Gantt Chart */}
                <div className="mb-4 border-0">
                    <h3 className="text-lg font-semibold mb-2 border-0">Gantt Chart</h3>
                    <div className="relative h-16 border rounded border-0">
                        {schedule.scheduleBlocks?.map((block, index) => (
                            <div
                                key={index}
                                className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                style={{
                                    left: `${(block.start / schedule.totalTime) * 100}%`,
                                    width: `${((block.end - block.start) / schedule.totalTime) * 100}%`
                                }}
                            >
                                <span className="text-sm font-medium border-0 text-white">
                                    {block.id}
                                </span>
                            </div>
                        ))}
                    </div>
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
            </CardContent>
        </Card>
    );
};

export default MLQFScheduler;
