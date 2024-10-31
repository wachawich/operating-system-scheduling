const calculateRRSchedule = (processes, quantum) => {
    const n = processes.length;
    const waitingTime = new Array(n).fill(0);
    const turnaroundTime = new Array(n).fill(0);
    const completionTime = new Array(n).fill(0);
    const queue = [...processes.map((p, i) => ({ ...p, remainingTime: p.burstTime }))];
    const scheduleBlocks = [];
    let currentTime = 0;

    queue.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    while (queue.length > 0) {
        let allDone = true;
        for (let i = 0; i < queue.length; i++) {
            const process = queue[i];

            if (process.remainingTime > 0) {
                allDone = false;
                const startTime = currentTime;
                const executionTime = Math.min(quantum, process.remainingTime);

                process.remainingTime -= executionTime;
                currentTime += executionTime;

                scheduleBlocks.push({
                    id: process.id,
                    start: startTime,
                    end: currentTime
                });

                if (process.remainingTime === 0) {
                    completionTime[i] = currentTime;
                    turnaroundTime[i] = completionTime[i] - process.arrivalTime;
                    waitingTime[i] = turnaroundTime[i] - process.burstTime;
                }
            }
        }
        if (allDone) break;
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

export default calculateRRSchedule;