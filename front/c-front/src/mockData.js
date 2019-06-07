export const newMessages = [
  {
    id: '12341',
    userName: 'George H.',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    content: '(You sent a session request)',
    receivedDate: 'Just now',
  },
  {
    id: '12342',
    userName: 'Paul M.',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    content: 'Sounds good.',
    receivedDate: '2 minutes ago'
  }
];

export const newNotifications = [
  {
    id: '12343',
    userName: 'George',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    content: 'Session starting soon',
    sessionDate: 'Dec 17, 2018 12:00PM(Pacific Time(US & Canada)time)',
    receivedDate: 'Dec 17',
  },
  {
    id: '12344',
    userName: 'George',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    content: 'Session Confirmed',
    sessionDate: 'Dec 17, 2018 12:00PM(Pacific Time(US & Canada)time)',
    receivedDate: 'Dec 17',
  }
];

export const user = {
  id: '12345',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
  firstName: 'Mary M.',
  timeZone: '',
  paymentConfigured: false,
  paymentMethod: {
    type: 'Visa',
    lastFour: '4040',
  }
};

export const menteeProfile = {
  id: '12345',
  type: 'mentee',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
  onlineStatus: 'Online',
  name: 'John Lennon',
  headline: 'PhD Candidate in Data Science',
  expertise: {
    software: [
      {
        id: '12342',
        title: 'Sketch',
        tags: ['Wireframing', 'Design'],
        experience: 'I use Sketch to create high-fidelity UIs and mockups.',
        selfRating: 4,
      }
    ]
  },
  bio: "I'm a researcher at UC Berkeley",
  timeZone: 'Pacific Time UTC +8',
  languages: ['English', 'Japanese'],
  city: 'San Francisco, CA',
  connectedAccounts: [],
};

export const mentorProfile = {
  id: 12345,
  type: 'mentor',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
  onlineStatus: 'Online',
  name: 'John Lennon',
  headline: 'PhD Candidate in Data Science',
  availability: 'Available in about 5 hours',
  expertise: {
    software: [
      {
        id: 12342,
        title: 'Sketch',
        tags: ['Wireframing', 'Design'],
        experience: 'I use Sketch to create high-fidelity UIs and mockups.',
        selfRating: 4,
      }
    ]
  },
  recommendations: '23',
  averageResponseTime: '1 day',
  rate: '20.00',
  bio: "I'm a researcher at UC Berkeley",
  timeZone: 'Pacific Time UTC +8',
  languages: ['English', 'Japanese'],
  city: 'San Francisco, CA',
  connectedAccounts: [],
};

export const incompleteProfile = {
  id: '12341',
  type: 'mentee',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
  onlineStatus: 'Online',
  name: 'John Lennon',
  headline: '',
  availability: 'Available in about 5 hours',
  expertise: {
    software: [
      {
        id: '12342',
        title: '',
        tags: [],
        experience: '',
        selfRating: 0,

      }
    ],
  },
  recommendations: '',
  averageResponseTime: '',
  rate: '',
  bio: '',
  timeZone: '',
  languages: [],
  city: '',
  connectedAccounts: [],
};

// for dashboard
export const sessions = [
  {
    id: '12343',
    userId: '12345',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    userName: 'Mary M.',
    timeAmount: '30 minutes',
    status: 'Awaiting Confirmation', // Awaiting Confirmation, Upcoming, Past
    date: 'Oct 10, 2018 at 2:30 PM (PDT)',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '12344',
    userId: '12345',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    userName: 'Mary M.',
    timeAmount: '30 minutes',
    status: 'Awaiting Confirmation',
    date: 'Oct 10, 2018 at 2:30 PM (PDT)',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

// for search
export const profiles = [
  {
    id: '12345',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    name: 'John Lennon',
    headline: 'Python lover and PhD candidate',
    tags: ['Express', 'Python', 'C++'],
  },
  {
    id: '12346',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    name: 'George Harrison',
    headline: 'Python enthusiast and PhD candidate',
    tags: ['Express', 'Python', 'C++'],
  },
  {
    id: '12347',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    name: 'Paul McCartnet',
    headline: 'Former Beatle',
    tags: ['Express', 'Python', 'MATLAB'],
  }
];

// for messages
// assuming back end will organize the messages chronologically and push new messages to the array, coverting the timestamp into semantic text
// same with the conversations.  They should be ordered by the most recent last message in the messages.
export const conversations = [
  {
    id: '12347',
    userName: 'Some Guy',
    userId: '12349',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    onlineStatus: 'Offline',
    localTime: '4:20 PM',
    messages: [
      {
        id: '22339',
        userId: '12349',
        received: 'Just now',
        content: 'Roof party portland live-edge put a bird on it. Umami pinterest tumblr, freegan af fixie disrupt polaroid aesthetic bitters pour-over ramps shoreditch vice. Twee pok pok try-hard la croix offal. Bitters XOXO succulents pickled.',
        type: 'message',
        viewed: false,
      },
    ]
  },
  {
    id: '12348',
    userName: 'George H.',
    userId: '12350',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    onlineStatus: 'Online',
    localTime: '4:20 PM',
    messages: [ // oldest to newest
      {
        id: '22340',
        userId: '12345', // current mockUser id
        received: '2m ago',
        content: 'Hi George.  Do you have eperience with Phoenix framework?',
        type: 'message',
        viewed: true,
      },
      {
        id: '22341',
        userId: '12350',
        received: '2m ago',
        content: "Yeah.  I've built lots of apps with Phoenix",
        type: 'message',
        viewed: true,
      },
      {
        id: '22342',
        userId: '12345',
        received: '1m ago',
        content: "Ok great.  I'm going to book a session, unless you're free now?",
        type: 'message',
        viewed: true,
      },
      {
        id: '22343',
        userId: '12350',
        received: 'Just now',
        content: "I'm free now. Let's do it now.",
        type: 'message',
        viewed: true,
      }
    ],
  },
  {
    id: '12349',
    userName: 'Paul McCartney',
    userId: '12351',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtcfsSMUWkR6IucW03iwj-7cLV40AW1wzMhoZKervJT8uPt_dzg',
    onlineStatus: 'Offline',
    localTime: '4:20 PM',
    messages: [
      {
        id: '22440',
        userId: '12345',
        received: '52m ago',
        content: '(sent a session request)',
        type: 'notification',
        viewed: true,
      },
    ],
  },
];

export const settings = {
  email: 'george@beatles.com',
  password: '12345678',
  timeZone: 'Pacific Standard',
  userName: 'george',
  profileVisibility: 'Public',
  rate: '10',
  paymentHistory: [
    {
      Item: 'Mentorship Session',
      'Payment Method': 'Credit Card',
      Subtotal: '$76.75',
      'Processing Fee': '$2.19',
      Total: '$78.94',
      Date: 'Dec 26, 2018 10:40 PM',
    },
    {
      Item: 'Mentorship Session',
      'Payment Method': 'Credit Card',
      Subtotal: '$156.78',
      'Processing Fee': '$4.47',
      Total: '$161.25',
      Date: 'Dec 21, 2018 7:32 PM',
    },
    {
      Item: 'Mentorship Session',
      'Payment Method': 'Credit Card',
      Subtotal: '$135.08',
      'Processing Fee': '$3.85',
      Total: '$138.93',
      Date: 'Dec 20, 2018 9:40 PM',
    },
    {
      Item: 'Mentorship Session',
      'Payment Method': 'Credit Card',
      Subtotal: '$42.86',
      'Processing Fee': '$1.22',
      Total: '$44.08',
      Date: 'Dec 19, 2018 9:27 PM',
    },
  ],
};
