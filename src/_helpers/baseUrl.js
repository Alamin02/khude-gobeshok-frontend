export const apiBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return "http://localhost:8000/";
    }
    else {
        return "http://khudegobeshok.com/";
    }
}