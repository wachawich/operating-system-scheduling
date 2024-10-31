const calculateHRRNSchedule = (processes) => {
    const n = processes.length;
    const waitingTime = new Array(n).fill(0);
    const turnaroundTime = new Array(n).fill(0);
    const completionTime = new Array(n).fill(0);
    const remainingProcesses = [...processes];
    const scheduleBlocks = [];
    let currentTime = 0;
    
    while (remainingProcesses.length > 0) {
        let highestResponseRatio = -1;
        let selectedIndex = -1;

        for (let i = 0; i < remainingProcesses.length; i++) {
            const process = remainingProcesses[i];
            const waitingTimeForProcess = currentTime - process.arrivalTime;
            const responseRatio = (waitingTimeForProcess + process.burstTime) / process.burstTime;
            
            if (process.arrivalTime <= currentTime) {
                if (responseRatio > highestResponseRatio) {
                    highestResponseRatio = responseRatio;
                    selectedIndex = i;
                }
            }
        }

        if (selectedIndex === -1) {
            currentTime++;
            continue;
        }

        const process = remainingProcesses[selectedIndex];
        currentTime += process.burstTime;

        scheduleBlocks.push({
            id: process.id,
            start: currentTime - process.burstTime,
            end: currentTime
        });

        const completionIdx = processes.findIndex(p => p.id === process.id);
        completionTime[completionIdx] = currentTime;
        turnaroundTime[completionIdx] = completionTime[completionIdx] - process.arrivalTime;
        waitingTime[completionIdx] = turnaroundTime[completionIdx] - process.burstTime;

        remainingProcesses.splice(selectedIndex, 1);
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

export default calculateHRRNSchedule;