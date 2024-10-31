const calculateSRTFSchedule = (processes) => {
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

export default calculateSRTFSchedule;