const calculatePrioritySchedule = (processes) => {
    const n = processes.length;
    const waitingTime = new Array(n).fill(0);
    const turnaroundTime = new Array(n).fill(0);
    const completionTime = new Array(n).fill(0);
    const processQueue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime || a.priority - b.priority);
    const scheduleBlocks = [];
    let currentTime = 0;

    for (let i = 0; i < processQueue.length; i++) {
        if (i < n - 1) {
            const nextProcess = processQueue[i + 1];
            
            // เช็คว่าถ้า nextProcess มี arrivalTime น้อยกว่า process ปัจจุบัน
            if (currentTime < processQueue[i].arrivalTime) {
                // สลับ process
                [processQueue[i], processQueue[i + 1]] = [processQueue[i + 1], processQueue[i]];
            }
        }

        const process = processQueue[i];
        const startTime = Math.max(currentTime, process.arrivalTime);
        const endTime = startTime + process.burstTime;

        currentTime = endTime;

        scheduleBlocks.push({
            id: process.id,
            start: startTime,
            end: endTime
        });

        completionTime[i] = endTime;
        turnaroundTime[i] = completionTime[i] - process.arrivalTime;
        waitingTime[i] = turnaroundTime[i] - process.burstTime;
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

export default calculatePrioritySchedule;