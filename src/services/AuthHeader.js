const authHeader = (token) => ({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    },
});
export default authHeader;
