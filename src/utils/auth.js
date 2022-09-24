
class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    register({name, email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                email,
                name,
            }),
        }).then(this._getResponse);
    }

    login({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
        }).then(this._getResponse);
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(this._getResponse);
    }
}

export const auth = new Auth({ baseUrl: "https://api.movies.sok.nomoredomains.sbs" });
