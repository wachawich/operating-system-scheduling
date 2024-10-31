const calculateFCFSSchedule  = (processes) => {
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
            scheduleBlocks.push({
                id: "idle",
                start: currentTime,
                end: process.arrivalTime
            });
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

export default calculateFCFSSchedule;