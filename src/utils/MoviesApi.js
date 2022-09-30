class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkServerResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject("Что-то пошло не так.");
    }

    getMovies() {
        return fetch(this._baseUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => this._checkServerResponse(res));
    }
}

export const moviesApi = new Api({ baseUrl: "https://api.nomoreparties.co/beatfilm-movies" });
