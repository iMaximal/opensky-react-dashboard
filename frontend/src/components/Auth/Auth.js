import { history } from '../../store/store';
import { CONNECTION } from '../../config';

class Auth {
    loggedIn = false;

    authenticate = (username, password, type) => {
        fetch(`${CONNECTION}/user/${type}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(json => {
                if (json.type === 'error') {
                    alert(json.msg);
                } else {
                    this.loggedIn = true;
                    history.replace('/callback');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    signup = (username, password) => {
        this.authenticate(username, password, 'new');
    };

    login = (username, password) => {
        this.authenticate(username, password, 'login');
    };

    logout = () => {
        fetch(`${CONNECTION}/user/logout`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(() => {
                this.loggedIn = false;
                history.replace('/');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    checkAuthentication = () => {
        return new Promise((resolve, reject) => {
            fetch(`${CONNECTION}/user/authenticated`, {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(json => {
                    if (json.authenticated) {
                        this.loggedIn = true;
                    }
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    };
}

export default Auth;
