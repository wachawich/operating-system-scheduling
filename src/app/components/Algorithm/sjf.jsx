const calculateSJFSchedule = (processes) => {

    // เรียง processes ตาม arrivalTime ก่อน
    const sortedByArrival = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    // นำ process ที่มี arrivalTime น้อยที่สุดตัวแรกไปเก็บไว้ในตัวแปร
    const firstProcess = sortedByArrival.shift(); // ลบ process แรกออกจาก array แล้วเก็บไว้ใน firstProcess

    // เรียง processes ที่เหลือตาม burstTime
    const sortedByBurstTime = sortedByArrival.sort((a, b) => a.burstTime - b.burstTime);

    // รวม firstProcess กับ sortedByBurstTime กลับมาเป็นลำดับใหม่
    const sortedProcesses = [firstProcess, ...sortedByBurstTime];

    const n = sortedProcesses.length;
    const waitingTime = new Array(n).fill(0);
    const turnaroundTime = new Array(n).fill(0);
    const completionTime = new Array(n).fill(0);
    const scheduleBlocks = [];
    let currentTime = 0;


    for (let i = 0; i < n; i++) {
        const process = sortedProcesses[i];
        const startTime = Math.max(currentTime, process.arrivalTime);
        const endTime = startTime + process.burstTime;

        scheduleBlocks.push({
            id: process.id,
            start: startTime,
            end: endTime
        });

        completionTime[i] = endTime;
        turnaroundTime[i] = completionTime[i] - process.arrivalTime;
        waitingTime[i] = turnaroundTime[i] - process.burstTime;
        currentTime = endTime;
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

export default calculateSJFSchedule;