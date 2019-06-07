import { auth, db } from './firebase-init';

const { CLIENT_ID } = process.env;

const uuidv4 = require('uuid/v4');

export const signUp = async ({
  email, password, firstName, lastName,
}) =>
  new Promise((resolve, reject) =>
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user: { uid } }) =>
        db.ref(`users/${uid}`)
          .set({
            firstName,
            lastName,
            email,
            uid,
            isMentor: false,
            accountVerified: false,
            avatar: '',
            headline: '',
            bio: '',
            city: '',
            // mentor properties:
            recommendations: '23',
            averageResponseTime: '1 day',
            rate: '$20.00',
            vacationMode: false,
          })
          .then(() => {
            auth.currentUser.sendEmailVerification({ url: 'http://localhost:1234' });
            resolve();
          })
          .catch(reject)));


export const signUpWithLinkedIn = data => {
  const { email, firstName, lastName } = data;
  db.ref('users').push({ firstName, lastName, email });
  fetch('http://localhost:4321/linkedin')
    .then(dat => dat)
    .catch(err => console.log('err', err));
};

export const linkedInSignUp = () => {
  const body = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: 'http://localhost:1234',
    state: uuidv4()
  };
  fetch('https://www.linkedin.com/oauth/v2/authorization', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(x => console.log('zzz', x))
    .catch(err => console.log('ERR', err));
};

export const signIn = async (email, password) =>
  new Promise((resolve, reject) =>
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => resolve())
      .catch(err => reject(err))
  );
