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
