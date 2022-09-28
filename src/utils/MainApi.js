class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkServerResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(res);
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then((res) => this._checkServerResponse(res));
    }

    updateUserInfo({ name, email }, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                email,
            }),
        }).then((res) => this._checkServerResponse(res));
    }

    getSavedMovies(token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then((res) => this._checkServerResponse(res));
    }

    createMovie(movieInfo, token) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                ...movieInfo,
            }),
        }).then((res) => this._checkServerResponse(res));
    }

    removeMovie(movieId, token) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then((res) => this._checkServerResponse(res));
    }
}

export const mainApi = new Api({ baseUrl: "https://api.movies.sok.nomoredomains.sbs" });
