'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SRTFScheduler = () => {
    const [processes, setProcesses] = useState([
        { id: "P1", burstTime: 8, arrivalTime: 0 },
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
        let completed = 0;
        let currentTime = 0;
        const waitingTime = new Array(n).fill(0);
        const turnaroundTime = new Array(n).fill(0);
        const remainingTime = processes.map(p => p.burstTime);
        const scheduleBlocks = [];
    
        while (completed !== n) {
            const eligibleProcesses = processes
                .map((p, index) => ({ ...p, index }))
                .filter(p => p.arrivalTime <= currentTime && remainingTime[p.index] > 0);
    
            if (eligibleProcesses.length === 0) {
                // If no process is eligible, jump to the next arrival time
                const nextArrival = Math.min(...processes.filter(p => remainingTime[processes.indexOf(p)] > 0).map(p => p.arrivalTime));
                currentTime = nextArrival;
                continue;
            }
    
            // Select the process with the shortest remaining time
            const { index } = eligibleProcesses.reduce((min, p) => {
                return remainingTime[p.index] < remainingTime[min.index] ? p : min;
            }, eligibleProcesses[0]);
    
            const start = currentTime;
            currentTime++;
            remainingTime[index]--;
    
            if (remainingTime[index] === 0) {
                // Process completed
                const finishTime = currentTime;
                const tat = finishTime - processes[index].arrivalTime;
                turnaroundTime[index] = tat;
                waitingTime[index] = tat - processes[index].burstTime;
                completed++;
            }
    
            // Record the schedule block for Gantt chart
            scheduleBlocks.push({
                id: processes[index].id,
                start,
                end: currentTime
            });
        }
    
        // Combine schedule blocks with the same id
        const combinedScheduleBlocks = [];
        
        scheduleBlocks.forEach(block => {
            const lastBlock = combinedScheduleBlocks[combinedScheduleBlocks.length - 1];
            
            if (lastBlock && lastBlock.id === block.id) {
                // If the last block has the same id, combine them
                lastBlock.end = block.end; // Update the end time
            } else {
                // Otherwise, add the new block
                combinedScheduleBlocks.push({ ...block });
            }
        });
    
        const avgWaitingTime = waitingTime.reduce((a, b) => a + b, 0) / n;
        const avgTurnaroundTime = turnaroundTime.reduce((a, b) => a + b, 0) / n;
    
        return {
            waitingTime,
            turnaroundTime,
            avgWaitingTime,
            avgTurnaroundTime,
            scheduleBlocks: combinedScheduleBlocks, // Use the combined blocks here
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
                <CardTitle>Shortest Remaining Time First (SRTF) Scheduler</CardTitle>
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

export default SRTFScheduler;