export const POMODORO_MODES = {
    focus: { label: 'Foco', seconds: 25 * 60 },
    short: { label: 'Pausa curta', seconds: 5 * 60 },
    long: { label: 'Pausa longa', seconds: 15 * 60 },
};

export function remainingSeconds(deadline, now = Date.now()) {
    return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function nextSession(timer, completed = true) {
    const cycles = timer.cycles + (completed && timer.mode === 'focus' ? 1 : 0);
    const mode = timer.mode === 'focus' ? (cycles > 0 && cycles % 4 === 0 ? 'long' : 'short') : 'focus';
    return { mode, cycles, remaining: POMODORO_MODES[mode].seconds, running: false, deadline: null };
}