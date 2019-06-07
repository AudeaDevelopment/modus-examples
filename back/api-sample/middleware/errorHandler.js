export default (status, req, res, next) => {
  // next is required for this to work, even though it is not being invoked here
  let code = 500;
  let message = 'General';

  switch (status) {
    case 4001:
      code = 400;
      message = 'Missing required parameters';
      break;
    case 4002:
      code = 400;
      message = 'Invalid bookId';
      break;
    case 4011:
      code = 401;
      message = 'Invalid API_KEY';
      break;
    case 4012:
      code = 401;
      message = 'API_2_KEY or API_2_URL outdated';
      break;
    default:
      break;
  }

  res.statusMessage = message;
  res.sendStatus(code);
};
