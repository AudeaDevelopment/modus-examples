export const getUserData = () =>
  chrome.storage.sync.get(['key', 'email'], (data) => {
    console.log('data', data);
  });
