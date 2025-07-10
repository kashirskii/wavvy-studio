export const isAuthenticated = () => {
    const cookie = document.cookie;
    const token = cookie.split('; ').find(row => row.startsWith('token='));
    return !!token;
}