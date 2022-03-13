import axios from 'axios';


export default (function() {
    const defaultOptions = {
        mode: 'cors',
    };

    return {
        get: (url) => axios.get(url, { ...defaultOptions,  }),
        post: (url, data) => axios.post(url, data, { ...defaultOptions }),
        put: (url, data) => axios.put(url, data, { ...defaultOptions }),
        delete: (url) => axios.delete(url, { ...defaultOptions }),
    };
})();
