export const fetchConAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('nombre');
        window.location.href = '/login';
        throw new Error('No autorizado');
    }
    return response;
};