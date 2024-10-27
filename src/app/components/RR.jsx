'use client';  // This is important for Next.js client-side components

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const RRScheduler = () => {
    const [processes, setProcesses] = useState([
        { id: "P1", burstTime: 10, arrivalTime: 0 },
    ]);

    const [lastProcessId, setLastProcessId] = useState(2);

    const [quantum, setQuantum] = useState(5);
    const [schedule, setSchedule] = useState({});

    const [newProcess, setNewProcess] = useState({
        id: "",
        burstTime: "",
        arrivalTime: ""
    });

    useEffect(() => {
        const newSchedule = calculateSchedule(processes, quantum);
        setSchedule(newSchedule);
    }, [processes, quantum]);

    const calculateSchedule = (processes, quantum) => {
        const n = processes.length;
        const waitingTime = new Array(n).fill(0);
        const turnaroundTime = new Array(n).fill(0);
        const completionTime = new Array(n).fill(0);
        const queue = [...processes.map((p, i) => ({ ...p, remainingTime: p.burstTime }))];
        const scheduleBlocks = [];
        let currentTime = 0;
    
        while (queue.length > 0) {
            let allDone = true; // Flag to check if all processes are done in this round
            for (let i = 0; i < queue.length; i++) {
                const process = queue[i];
    
                if (process.remainingTime > 0) {
                    allDone = false; // There's still a process to execute
                    const startTime = currentTime;
                    const executionTime = Math.min(quantum, process.remainingTime);
    
                    process.remainingTime -= executionTime;
                    currentTime += executionTime;
    
                    // Record the schedule block
                    scheduleBlocks.push({
                        id: process.id,
                        start: startTime,
                        end: currentTime
                    });
    
                    // If the process is completed
                    if (process.remainingTime === 0) {
                        completionTime[i] = currentTime; // Store Completion Time
                        turnaroundTime[i] = completionTime[i] - process.arrivalTime; // Calculate TAT
                        waitingTime[i] = turnaroundTime[i] - process.burstTime; // Calculate WT
                    }
                }
            }
    
            // Remove finished processes
            if (allDone) break; // If all processes are done, exit the loop
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
            id: `P${lastProcessId}`, // Use the last used ID
            burstTime: Math.floor(Math.random() * 20) + 1, // Random Burst Time
            arrivalTime: Math.floor(Math.random() * 10) // Random Arrival Time
        };

        // Increment the lastProcessId for the next process
        setLastProcessId(lastProcessId + 1);
        
        // Add the new process to the list
        setProcesses([...processes, randomProcess]);
    };

    const removeProcess = (index) => {
        setProcesses(processes.filter((_, i) => i !== index));
    };

    // const schedule = calculateSchedule(processes);

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
                <CardTitle>Round Robin (RR) Scheduler</CardTitle>
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
                    <Input
                        placeholder="Time Quantum"
                        type="number"
                        value={quantum}
                        onChange={(e) => setQuantum(parseInt(e.target.value))}
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

                {/* Average times */}
                <div className="mb-6 shadow-none border-0">
                    <p className="mb-2 shadow-none border-0">Average Waiting Time: <span className='border-0 text-2xl font-bold'>{schedule.avgWaitingTime?.toFixed(2)}</span></p>
                    <p className='shadow-none border-0'>Average Turnaround Time: <span className='border-0 text-2xl font-bold'>{schedule.avgTurnaroundTime?.toFixed(2)}</span></p>
                </div>

                {/* Gantt chart */}
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
                        {/* Time markers */}
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

export default RRScheduler;