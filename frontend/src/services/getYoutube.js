export function getYouTubeId(value) {
    try {

        const input = value.trim();

        const url = new URL(/^https?:\/\//i.test(input) ? input : 'https://' + input);

        if (!['https:', 'http:'].includes(url.protocol)) return null;

        const host = url.hostname.toLowerCase();

        let id;

        if (host === 'youtu.be') {
            id = url.pathname.split('/')[1];

        } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
            const parts = url.pathname.split('/');
            id = url.pathname === '/watch' ? url.searchParams.get('v') : ['embed', 'shorts', 'live'].includes(parts[1]) ? parts[2] : null;
        }

        return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : null;

    } catch {
        return null;
    }
}

export function remainingSeconds(deadline, now = Date.now()) {
    return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function nextSession(timer, completed = true) {
    const cycles = timer.cycles + (completed && timer.mode === 'focus' ? 1 : 0);
    const mode = timer.mode === 'focus' ? (cycles > 0 && cycles % 4 === 0 ? 'long' : 'short') : 'focus';
    return { mode, cycles, remaining: POMODORO_MODES[mode].seconds, running: false, deadline: null };
}
