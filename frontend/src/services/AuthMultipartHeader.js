export default function authMultipartHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'Bearer': user.token,
            'Content-type': 'multipart/form-data'
        };
    } else {
        return {};
    }
}