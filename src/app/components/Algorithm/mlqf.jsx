const calculateMLQFSchedule = (processes, quantum) => {
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


export default calculateMLQFSchedule;