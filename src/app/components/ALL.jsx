// components/FCFSScheduler.jsx
'use client';  // This is important for Next.js client-side components

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

import calculateFCFSSchedule from './Algorithm/fcfs';
import calculateRRSchedule from './Algorithm/rr';
import calculateSJFSchedule from './Algorithm/sjf';
import calculateSRTFSchedule from './Algorithm/srtf';
import calculatePrioritySchedule from './Algorithm/priority';
import calculateHRRNSchedule from './Algorithm/hrrn';
import calculateMLQFSchedule from './Algorithm/mlqf';


const ALLScheduler = () => {
    const [processes, setProcesses] = useState([
        { id: "P1", burstTime: 4, arrivalTime: 0, priority: 1 },
    ]);

    const [lastProcessId, setLastProcessId] = useState(2);

    const [newProcess, setNewProcess] = useState({
        id: "",
        burstTime: "",
        arrivalTime: "",
        priority: ""
    });

    const [fcfsSchedule, setFCFSSchedule] = useState({
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        waitingTime: [],
        turnaroundTime: []
    });

    const [quantum, setQuantum] = useState(5);
    const [rrSchedule, setRRSchedule] = useState({
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        waitingTime: [],
        turnaroundTime: []
    });

    const [sfjSchedule, setSJFSchedule] = useState({
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        waitingTime: [],
        turnaroundTime: []
    });

    const [srtfSchedule, setSRTFSchedule] = useState({
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        waitingTime: [],
        turnaroundTime: []
    });

    const [prioritySchedule, setPrioritySchedule] = useState({
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        waitingTime: [],
        turnaroundTime: []
    });

    const [hrrnSchedule, setHRRNSchedule] = useState({
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        waitingTime: [],
        turnaroundTime: []
    });

    const [quantums, setQuantums] = useState([2, 5, 10]);
    const [mlqfSchedule, setMLQFSchedule] = useState({
        avgWaitingTime: 0,
        avgTurnaroundTime: 0,
        waitingTime: [],
        turnaroundTime: []
    });


    useEffect(() => {
        const fcfsResult = calculateFCFSSchedule(processes);
        setFCFSSchedule(fcfsResult);

        const rrResult = calculateRRSchedule(processes, quantum);
        setRRSchedule(rrResult);

        const sjfResult = calculateSJFSchedule(processes);
        setSJFSchedule(sjfResult);

        const srtfResult = calculateSRTFSchedule(processes);
        setSRTFSchedule(srtfResult);

        const priorityResult = calculatePrioritySchedule(processes);
        setPrioritySchedule(priorityResult);

        const hrrnResult = calculateHRRNSchedule(processes);
        setHRRNSchedule(hrrnResult);

        const mlqfResult = calculateMLQFSchedule(processes, quantums);
        setMLQFSchedule(mlqfResult);

    }, [processes, quantum]);




    const addProcess = () => {
        if (newProcess.id && newProcess.burstTime && newProcess.arrivalTime) {
            setProcesses([...processes, {
                id: newProcess.id,
                burstTime: parseInt(newProcess.burstTime),
                arrivalTime: parseInt(newProcess.arrivalTime),
                priority: parseInt(newProcess.priority)
            }]);
            setNewProcess({ id: "", burstTime: "", arrivalTime: "", priority: "" });
        }
    };

    // let scheduleFCFS = FCFSSchedule(processes);


    const addRandomProcesses = () => {
        const newProcess = []; // Array สำหรับเก็บ process ใหม่ทั้ง 10 ตัว

        for (let i = 0; i < 5; i++) {
            const randomProcess = {
                id: `P${lastProcessId + i}`, // ใช้ lastProcessId ที่เพิ่มขึ้นเรื่อย ๆ
                burstTime: Math.floor(Math.random() * 20) + 1, // Random Burst Time
                arrivalTime: Math.floor(Math.random() * 10), // Random Arrival Time
                priority: Math.floor(Math.random() * 4)
            };
            newProcess.push(randomProcess); // เพิ่ม process ลงไปใน array ใหม่
        }

        setLastProcessId(lastProcessId + 5);

        setProcesses([...processes, ...newProcess]);

        // setProcesses((prevProcesses) => [...prevProcesses, ...newProcesses]);
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
        P10: 'bg-blue-100',      // Color for P10
        P11: 'bg-red-600',       // Color for P11 (darker red)
        P12: 'bg-green-600',     // Color for P12 (darker green)
        P13: 'bg-blue-600',      // Color for P13 (darker blue)
        P14: 'bg-yellow-600',    // Color for P14 (darker yellow)
        P15: 'bg-purple-600',    // Color for P15 (darker purple)
        P16: 'bg-pink-600',      // Color for P16 (darker pink)
        P17: 'bg-teal-600',      // Color for P17 (darker teal)
        P18: 'bg-orange-600',    // Color for P18 (darker orange)
        P19: 'bg-indigo-600',    // Color for P19 (darker indigo)
        P20: 'bg-gray-600',
        P21: 'bg-red-600',
        P22: 'bg-red-700',
        P23: 'bg-red-800',
        P24: 'bg-red-900',
        P25: 'bg-blue-500',
        P26: 'bg-blue-600',
        P27: 'bg-blue-700',
        P28: 'bg-blue-800',
        P29: 'bg-blue-900',
        P30: 'bg-green-500',
        P31: 'bg-green-600',
        P32: 'bg-green-700',
        P33: 'bg-green-800',
        P34: 'bg-green-900',
        P35: 'bg-yellow-500',
        P36: 'bg-yellow-600',
        P37: 'bg-yellow-700',
        P38: 'bg-yellow-800',
        P39: 'bg-yellow-900',
        P40: 'bg-purple-500',       // Color for P20 (darker gray)
    };


    const getProcessColor = (processId) => {
        return colorPalette[processId] || 'bg-gray-500'; // ค่าเริ่มต้นถ้าไม่ตรงกับ ID
    };

    return (
        <Card className="w-full max-w-4xl shadow-none border-0">
            <CardHeader>
                <CardTitle>Compare all algorithms</CardTitle>
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
                    <Button onClick={addRandomProcesses}>Random Process</Button>
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
                                <th className="text-left p-2 text-sm">Priority</th>
                                <th className="text-left p-2 text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((process, index) => (
                                <tr className='h-8' key={process.id}>
                                    <td className="p-2 text-xs">{process.id}</td>
                                    <td className="p-2 text-xs">{process.burstTime}</td>
                                    <td className="p-2 text-xs">{process.arrivalTime}</td>
                                    <td className="p-2 text-xs">{fcfsSchedule?.waitingTime?.[index]}</td>
                                    <td className="p-2 text-xs">{fcfsSchedule?.turnaroundTime?.[index]}</td>
                                    <td className="p-2 text-xs">{process.priority}</td>
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

                {/* FCFS */}
                <CardHeader className='mb-4'>
                    <CardTitle className="text-xl mb-1 border-b-2 pb-4">First Come First Serve (FCFS) Scheduler</CardTitle>

                    {/* Average times */}
                    <div className="mb-8 shadow-none p-2 border-0">
                        <p className="mb-2 shadow-none border-0 text-xs">
                            Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(fcfsSchedule.avgWaitingTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                        <p className="shadow-none border-0 text-xs">
                            Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(fcfsSchedule.avgTurnaroundTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {/* Gantt chart */}
                    <div className="mb-4 border-0">
                        <h3 className="text-lg font-semibold mb-2 border-0 mt-4">Gantt Chart</h3>
                        <div className="relative h-12 border rounded border-0">
                            {fcfsSchedule.scheduleBlocks?.map((block, index) => {
                                const widthPercentage = ((block.end - block.start) / fcfsSchedule.totalTime) * 100;
                                const leftPercentage = (block.start / fcfsSchedule.totalTime) * 100;

                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                        style={{
                                            left: `${leftPercentage}%`,
                                            width: `${widthPercentage}%`
                                        }}
                                    >
                                        <span className="text-xs font-medium border-0 text-white">
                                            {block.id}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-6 border-0">
                            {/* Time markers */}
                            {fcfsSchedule.scheduleBlocks?.map((block, index) => (
                                <React.Fragment key={index}>
                                    {/* Marker for the start time */}
                                    <div
                                        className="absolute text-xs border-0"
                                        style={{
                                            left: `${(block.start / fcfsSchedule.totalTime) * 100}%`,
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
                                            left: `${(block.end / fcfsSchedule.totalTime) * 100}%`,
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
                </CardHeader>

                {/* RR */}
                <CardHeader className='mb-4'>
                    <CardTitle className="text-xl mb-1 border-b-2 pb-4">Round Robin (RR) Scheduler</CardTitle>

                    {/* Average times */}
                    <div className="mb-8 shadow-none p-2 border-0">
                        <p className="mb-2 shadow-none border-0 text-xs">
                            Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(rrSchedule.avgWaitingTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                        <p className="shadow-none border-0 text-xs">
                            Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(rrSchedule.avgTurnaroundTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {/* Gantt chart */}
                    <div className="mb-4 border-0">
                        <h3 className="text-lg font-semibold mb-2 border-0 mt-4">Gantt Chart</h3>
                        <div className="relative h-12 border rounded border-0">
                            {rrSchedule.scheduleBlocks?.map((block, index) => {rrSchedule
                                const widthPercentage = ((block.end - block.start) / rrSchedule.totalTime) * 100;
                                const leftPercentage = (block.start / rrSchedule.totalTime) * 100;

                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                        style={{
                                            left: `${leftPercentage}%`,
                                            width: `${widthPercentage}%`
                                        }}
                                    >
                                        <span className="text-xs font-medium border-0 text-white">
                                            {block.id}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-6 border-0">
                            {/* Time markers */}
                            {rrSchedule.scheduleBlocks?.map((block, index) => (
                                <React.Fragment key={index}>
                                    {/* Marker for the start time */}
                                    <div
                                        className="absolute text-xs border-0"
                                        style={{
                                            left: `${(block.start / rrSchedule.totalTime) * 100}%`,
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
                                            left: `${(block.end / rrSchedule.totalTime) * 100}%`,
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
                </CardHeader>

                {/* SJF */}
                <CardHeader className='mb-4'>
                    <CardTitle className="text-xl mb-1 border-b-2 pb-4">Shortest Job First (SJF) Scheduler</CardTitle>

                    {/* Average times */}
                    <div className="mb-8 shadow-none p-2 border-0">
                        <p className="mb-2 shadow-none border-0 text-xs">
                            Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(sfjSchedule.avgWaitingTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                        <p className="shadow-none border-0 text-xs">
                            Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(sfjSchedule.avgTurnaroundTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {/* Gantt chart */}
                    <div className="mb-4 border-0">
                        <h3 className="text-lg font-semibold mb-2 border-0 mt-4">Gantt Chart</h3>
                        <div className="relative h-12 border rounded border-0">
                            {sfjSchedule.scheduleBlocks?.map((block, index) => {sfjSchedule
                                const widthPercentage = ((block.end - block.start) / sfjSchedule.totalTime) * 100;
                                const leftPercentage = (block.start / sfjSchedule.totalTime) * 100;

                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                        style={{
                                            left: `${leftPercentage}%`,
                                            width: `${widthPercentage}%`
                                        }}
                                    >
                                        <span className="text-xs font-medium border-0 text-white">
                                            {block.id}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-6 border-0">
                            {/* Time markers */}
                            {sfjSchedule.scheduleBlocks?.map((block, index) => (
                                <React.Fragment key={index}>
                                    {/* Marker for the start time */}
                                    <div
                                        className="absolute text-xs border-0"
                                        style={{
                                            left: `${(block.start / sfjSchedule.totalTime) * 100}%`,
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
                                            left: `${(block.end / sfjSchedule.totalTime) * 100}%`,
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
                </CardHeader>

                {/* SRTF */}
                <CardHeader className='mb-4'>
                    <CardTitle className="text-xl mb-1 border-b-2 pb-4">Shortest Remaining Time First (SRTF) Scheduler</CardTitle>

                    {/* Average times */}
                    <div className="mb-8 shadow-none p-2 border-0">
                        <p className="mb-2 shadow-none border-0 text-xs">
                            Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(srtfSchedule.avgWaitingTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                        <p className="shadow-none border-0 text-xs">
                            Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(srtfSchedule.avgTurnaroundTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {/* Gantt chart */}
                    <div className="mb-4 border-0">
                        <h3 className="text-lg font-semibold mb-2 border-0 mt-4">Gantt Chart</h3>
                        <div className="relative h-12 border rounded border-0">
                            {srtfSchedule.scheduleBlocks?.map((block, index) => {srtfSchedule
                                const widthPercentage = ((block.end - block.start) / srtfSchedule.totalTime) * 100;
                                const leftPercentage = (block.start / srtfSchedule.totalTime) * 100;

                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                        style={{
                                            left: `${leftPercentage}%`,
                                            width: `${widthPercentage}%`
                                        }}
                                    >
                                        <span className="text-xs font-medium border-0 text-white">
                                            {block.id}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-6 border-0">
                            {/* Time markers */}
                            {srtfSchedule.scheduleBlocks?.map((block, index) => (
                                <React.Fragment key={index}>
                                    {/* Marker for the start time */}
                                    <div
                                        className="absolute text-xs border-0"
                                        style={{
                                            left: `${(block.start / srtfSchedule.totalTime) * 100}%`,
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
                                            left: `${(block.end / srtfSchedule.totalTime) * 100}%`,
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
                </CardHeader>

                {/* Priority */}
                <CardHeader className='mb-4'>
                    <CardTitle className="text-xl mb-1 border-b-2 pb-4">Priority Scheduler</CardTitle>

                    {/* Average times */}
                    <div className="mb-8 shadow-none p-2 border-0">
                        <p className="mb-2 shadow-none border-0 text-xs">
                            Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(prioritySchedule.avgWaitingTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                        <p className="shadow-none border-0 text-xs">
                            Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(prioritySchedule.avgTurnaroundTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {/* Gantt chart */}
                    <div className="mb-4 border-0">
                        <h3 className="text-lg font-semibold mb-2 border-0 mt-4">Gantt Chart</h3>
                        <div className="relative h-12 border rounded border-0">
                            {prioritySchedule.scheduleBlocks?.map((block, index) => {prioritySchedule
                                const widthPercentage = ((block.end - block.start) / prioritySchedule.totalTime) * 100;
                                const leftPercentage = (block.start / prioritySchedule.totalTime) * 100;

                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                        style={{
                                            left: `${leftPercentage}%`,
                                            width: `${widthPercentage}%`
                                        }}
                                    >
                                        <span className="text-xs font-medium border-0 text-white">
                                            {block.id}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-6 border-0">
                            {/* Time markers */}
                            {prioritySchedule.scheduleBlocks?.map((block, index) => (
                                <React.Fragment key={index}>
                                    {/* Marker for the start time */}
                                    <div
                                        className="absolute text-xs border-0"
                                        style={{
                                            left: `${(block.start / prioritySchedule.totalTime) * 100}%`,
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
                                            left: `${(block.end / prioritySchedule.totalTime) * 100}%`,
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
                </CardHeader>

                {/* HRRN */}
                <CardHeader className='mb-4'>
                    <CardTitle className="text-xl mb-1 border-b-2 pb-4">Highest Response Ratio Next (HRRN) Scheduler</CardTitle>

                    {/* Average times */}
                    <div className="mb-8 shadow-none p-2 border-0">
                        <p className="mb-2 shadow-none border-0 text-xs">
                            Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(hrrnSchedule.avgWaitingTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                        <p className="shadow-none border-0 text-xs">
                            Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(hrrnSchedule.avgTurnaroundTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {/* Gantt chart */}
                    <div className="mb-4 border-0">
                        <h3 className="text-lg font-semibold mb-2 border-0 mt-4">Gantt Chart</h3>
                        <div className="relative h-12 border rounded border-0">
                            {hrrnSchedule.scheduleBlocks?.map((block, index) => {hrrnSchedule
                                const widthPercentage = ((block.end - block.start) / hrrnSchedule.totalTime) * 100;
                                const leftPercentage = (block.start / hrrnSchedule.totalTime) * 100;

                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                        style={{
                                            left: `${leftPercentage}%`,
                                            width: `${widthPercentage}%`
                                        }}
                                    >
                                        <span className="text-xs font-medium border-0 text-white">
                                            {block.id}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-6 border-0">
                            {/* Time markers */}
                            {hrrnSchedule.scheduleBlocks?.map((block, index) => (
                                <React.Fragment key={index}>
                                    {/* Marker for the start time */}
                                    <div
                                        className="absolute text-xs border-0"
                                        style={{
                                            left: `${(block.start / hrrnSchedule.totalTime) * 100}%`,
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
                                            left: `${(block.end / hrrnSchedule.totalTime) * 100}%`,
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
                </CardHeader>

                {/* MLQF */}
                <CardHeader className='mb-4'>
                    <CardTitle className="text-xl mb-1 border-b-2 pb-4">Multilevel Queue with Feedback Scheduler</CardTitle>

                    {/* Average times */}
                    <div className="mb-8 shadow-none p-2 border-0">
                        <p className="mb-2 shadow-none border-0 text-xs">
                            Average Waiting Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(mlqfSchedule.avgWaitingTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                        <p className="shadow-none border-0 text-xs">
                            Average Turnaround Time: &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className='border-0 text-2xl font-bold'>
                                {(mlqfSchedule.avgTurnaroundTime ?? 0).toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {/* Gantt chart */}
                    <div className="mb-4 border-0">
                        <h3 className="text-lg font-semibold mb-2 border-0 mt-4">Gantt Chart</h3>
                        <div className="relative h-12 border rounded border-0">
                            {mlqfSchedule.scheduleBlocks?.map((block, index) => {mlqfSchedule
                                const widthPercentage = ((block.end - block.start) / mlqfSchedule.totalTime) * 100;
                                const leftPercentage = (block.start / mlqfSchedule.totalTime) * 100;

                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-full flex items-center justify-center ${getProcessColor(block.id)} border-l border-r border-0`}
                                        style={{
                                            left: `${leftPercentage}%`,
                                            width: `${widthPercentage}%`
                                        }}
                                    >
                                        <span className="text-xs font-medium border-0 text-white">
                                            {block.id}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative h-6 border-0">
                            {/* Time markers */}
                            {mlqfSchedule.scheduleBlocks?.map((block, index) => (
                                <React.Fragment key={index}>
                                    {/* Marker for the start time */}
                                    <div
                                        className="absolute text-xs border-0"
                                        style={{
                                            left: `${(block.start / mlqfSchedule.totalTime) * 100}%`,
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
                                            left: `${(block.end / mlqfSchedule.totalTime) * 100}%`,
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
                </CardHeader>

            </CardContent>
        </Card>
    );
};

export default ALLScheduler;