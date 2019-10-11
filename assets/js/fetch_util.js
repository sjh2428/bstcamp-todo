module.exports = {
    fetchGet(url, params) {
        const queryStr = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .reduce((acc, cur) => acc + `${cur}&`, '?')
            .slice(0, -1);
        return fetch(url + queryStr).then(res => res.json());
    },

    fetchPost(url, params) {
        const queryStr = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .reduce((acc, cur) => acc + `${cur}&`, '')
            .slice(0, -1);
        console.log(queryStr);
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryStr
        }).then(res => res.json());
    }
};