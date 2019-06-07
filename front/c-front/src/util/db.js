import firebase from "firebase/app";
import { db, auth, storage } from "./firebase-init";

const uuidv4 = require("uuid/v4");

export const getProfile = async uid =>
  new Promise((resolve, reject) =>
    db
      .ref(`users/${uid}`)
      .once("value")
      .then(x => {
        const data = x.val();
        if (!data) reject();
        resolve(data);
      })
      .catch(err => reject(err))
  );

export const getUser = async () =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.ref(`users/${user.uid}`)
          .once("value")
          .then(x => {
            const data = x.val();
            if (!data) reject();
            data.emailVerified = user.emailVerified;
            resolve(data);
          })
          .catch(err => reject(err));
      } else {
        resolve(null);
      }
    });
  });

export const createSession = async session => {
  const { mentorId, menteeId } = session;
  const id = uuidv4();
  db.ref(`users/${menteeId}/sessions/${id}`)
    .set({ ...session, id })
    .then(() => {
      db.ref(`users/${mentorId}/sessions/${id}`)
        .set({ ...session, id })
        .then()
        .catch(err => console.log("e", err) || err);
    })
    .catch(err => console.log("e", err) || err);
};

export const updateSessionStatus = async (session, status, confirmedDate) => {
  const { id, mentorId, menteeId } = session;
  db.ref(`users/${menteeId}/sessions/${id}`)
    .set({ ...session, status, confirmedDate })
    .then(() => {
      db.ref(`users/${mentorId}/sessions/${id}`)
        .set({ ...session, status, confirmedDate })
        .then()
        .catch(err => console.log("e", err) || err);
    })
    .catch(err => console.log("e", err) || err);
};

// export const getConfirmedSessionDates = uid => {
// }

// TODO: remove once refactors complete
export const getSessions = async id =>
  db
    .ref("sessions")
    .once("value")
    .then(keys =>
      Object.values(keys.val()).filter(
        ({ mentorId, menteeId }) => menteeId === id || mentorId === id
      )
    )
    .catch(err => err);

export const getNotificationsAndMessages = async () =>
  getUser()
    .then(x => {
      const { notifications, messages } = x;
      return { notifications, messages };
    })
    .catch(err => err);

export const setNoticationsToRead = () =>
  getUser()
    .then(data => {
      const { notifications, uid } = data;
      notifications
        .filter(x => {
          if (x.unread) return Object.keys(x.id)[0];
        })
        .map(x =>
          db.ref(`users/${uid}/notifications/${x}`).update({ unread: false })
        );
    })
    .catch(err => err);

export const createNotification = async (message, uid) =>
  db
    .ref(`users/${uid}/notifications`)
    .push({ message, unread: true })
    .catch(err => err);

export const setUserData = async userData =>
  db
    .ref(`users/${auth.currentUser.uid}`)
    .update(userData)
    .then()
    .catch(err => err);

export const setUserAvatar = async file => {
  const imageRef = storage.child(`avatars/${auth.currentUser.uid}`);
  imageRef
    .put(file)
    .then(() =>
      imageRef
        .getDownloadURL()
        .then(avatar =>
          setUserData({ avatar })
            .then()
            .catch(err => err)
        )
        .catch(err => err)
    )
    .catch(err => err);
};

export const setUserAvailability = async (uid, availability, vacationMode) =>
  db
    .ref(`users/${uid}/availability`)
    .set(availability)
    .then(() =>
      db
        .ref(`users/${uid}/vacationMode`)
        .set(vacationMode)
        .then()
        .catch(err => err)
    )
    .catch(err => err);

export const getMentors = async () =>
  db
    .ref("users")
    .once("value")
    .then(keys => Object.values(keys.val()).filter(({ isMentor }) => isMentor))
    .catch(err => err);
