let baseUrl = ``;

if (process.env.NODE_ENV !== 'production') {
    baseUrl = `http://`
}
else {
    baseUrl = `http://localhost:3000`
}