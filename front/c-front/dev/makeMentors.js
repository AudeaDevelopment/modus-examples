import faker from 'faker';
import { v4 as uuid } from 'uuid';
import { timezones } from 'react-timezone';
import { db } from '../src/util/firebase-init';

const MENTOR_QUANTITY = 10;

const allLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

const allTags = [
  'javaScript',
  'Java',
  'python',
  'react',
  'nodeJS',
  'C++',
  'Rust',
  'MATLAB',
  'styled-components',
  'Vue',
  'Sketch',
  'Wireframing',
  'Design',
];

const generateArray = (arrI, isTags) => {
  const arr = arrI.slice(0);
  const quantity = Math.ceil(Math.random() * arr.length);
  const picked = [];
  for (let i = 0; i < quantity; i++) {
    const index = Math.floor(Math.random() * (arr.length - i));
    picked.push(arr.splice(index, 1)[0]);
  }
  return isTags ? picked.splice(0, Math.ceil(picked.length / 2)) : picked;
};

const generateSoftware = () => {
  const quantity = Math.ceil(Math.random() * 4);
  const titles = allTags.slice(0);
  const software = [];
  for (let i = 0; i < quantity; i++) {
    const si = Math.floor(Math.random() * titles.length);
    software.push({
      id: uuid(),
      title: titles.splice(si, 1)[0],
      rating: 5,
      experience: 'placeholder text',
      tags: generateArray(allTags, true),
    });
  }
  return software;
};

const generateAvailability = () =>
  [
    { id: uuid(), day: 'Monday', startTime: '800', endTime: '1600' },
    { id: uuid(), day: 'Wednesday', startTime: '800', endTime: '1600' },
    { id: uuid(), day: 'Saturday', startTime: '1200', endTime: '2000' },
  ];

const createMentor = () => {
  const uid = uuid();
  const user = {
    uid,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: '',
    email: faker.internet.email(),
    isMentor: true,
    accountVerified: true,
    headline: faker.lorem.sentence(),
    bio: 'placeholder text',
    city: 'placeholder text',
    recommendations: 'placeholder text',
    averageResponseTime: 'placeholder text',
    rate: Math.floor(Math.random() * 10) * 10,
    languages: generateArray(allLanguages),
    software: generateSoftware(),
    timezone: timezones[Math.floor(Math.random() * timezones.length)],
    vacationMode: false,
    availability: generateAvailability(),
  };

  console.log('created new mentor: ', user);

  db.ref(`users/${uid}`)
    .set(user)
    .then()
    .catch(e => console.log(e));
};

export default () => {
  for (let i = 0; i < MENTOR_QUANTITY; i++) {
    createMentor();
  }
};
