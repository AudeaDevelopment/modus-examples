import superagent from 'superagent';
import Cookies from 'js-cookie';

const ONE_HOUR = 1 / 24;

export const signup = (user, password) =>
  new Promise((resolve, reject) =>
    superagent
      .post(`/api/auth/signup?user=${user}&password=${password}`)
      .then(resolve)
      .catch(reject));

export const login = (username, password) =>
  new Promise((resolve, reject) =>
    superagent
      .post('/api/auth/login')
      .set('Authorization', `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`)
      .then((v) => {
        Cookies.set('session', 'null', { expires: ONE_HOUR });
        resolve(v);
      })
      .catch(reject)
  );

export const logout = () =>
  new Promise((resolve, reject) =>
    superagent
      .post('/api/auth/logout')
      .then(() => {
        Cookies.remove('session', { expires: ONE_HOUR });
        resolve();
      })
      .catch(reject));

export const getFolders = () =>
  new Promise((resolve, reject) =>
    superagent
      .get('/api/account/2/getFolder?offset=0&limit=100&folder=0')
      .then(data => console.log('d', data) || resolve(data))
      .catch(e => console.log(e) || reject()));

export const getAccounts = () =>
  new Promise((resolve, reject) =>
    resolve()
  );

export const connectAccount = () =>
  new Promise((resolve, reject) =>
    resolve()
  );
