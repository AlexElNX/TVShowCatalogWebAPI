const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://localhost:7010').replace(/\/$/, '');
const API_URL = `${API_BASE_URL}/api/TvShow`;

async function request(url, options = {}) {
    let response;
    try {
        response = await fetch(url, options);
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(`Не удалось подключиться к API (${API_BASE_URL}). Убедись, что бэкенд запущен и доверен HTTPS-сертификат localhost.`);
        }
        throw error;
    }
    if (!response.ok) {
        let message = '';
        const contentType = response.headers.get('content-type') || '';
        try {
            if (contentType.includes('json')) {
                const body = await response.json();
                message = body.title || body.message || body.detail || Object.entries(body.errors || {}).flatMap(([key, values]) => values.map(value => `${key}: ${value}`)).join('\n') || JSON.stringify(body);
            } else message = await response.text();
        } catch { /* keep fallback */
        }
        throw new Error(message || `Запрос завершился с ошибкой (${response.status}).`);
    }
    if (response.status === 204) return null;
    if (response.status === 201 || response.headers.get('content-type')?.includes('json')) {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }
    return null;
}

export const tvShowApi = {
    getAll: () => request(API_URL),
    getById: id => request(`${API_URL}/${id}`),
    create: formData => request(API_URL, {method: 'POST', body: formData}),
    update: (id, formData) => request(`${API_URL}/${id}`, {method: 'PUT', body: formData}),
    remove: id => request(`${API_URL}/${id}`, {method: 'DELETE'}),
};

export function posterUrl(poster) {
    if (!poster) return '';
    if (/^(https?:|data:|blob:)/i.test(poster)) return poster;
    return `${API_BASE_URL}/${poster.replace(/^\//, '')}`;
}

export function getYear(premiere) {
    if (!premiere) return '—';
    const date = new Date(premiere);
    return Number.isNaN(date.getTime()) ? String(premiere).slice(0, 4) : date.getUTCFullYear();
}
