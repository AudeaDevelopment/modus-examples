import { db } from '../../util/firebase-init';
import { user } from '../../util/db';
import { defaultText } from './assets';

export const createEditor = async sessionId => {
  const firepadRef = db.ref('/editor');
  console.log('reffff', firepadRef);
  const editor = await ace.edit('firepad');
  await editor.setTheme('ace/theme/textmate');
  const session = await editor.getSession();
  session.setUseWrapMode(true);
  session.setUseWorker(false);
  session.setMode('ace/mode/python');

  const firepad = await Firepad.fromACE(firepadRef, editor, {
    defaultText: defaultText.Python
  });
  await console.log('fireitup', firepad);
  await console.log('editor', editor);

  return { firepad, editor };
};

export const convertLangToMode = async str => {
  console.log('the string', str);

  let mode = 'ace/mode/';
  switch (str) {
    case 'Python':
      mode += 'python';
      break;
    case 'R':
      mode += 'r';
      break;
    case 'Bash':
      mode += 'sh';
      break;
    case 'C':
      mode += 'c_cpp';
      break;
    case 'C++':
      mode += 'c_cpp';
      break;
    case 'Perl':
      mode += 'perl';
      break;
    case 'Ruby':
      mode += 'ruby';
      break;
    case 'Java':
      mode += 'java';
      break;
    case 'JavaScript':
      mode += 'javascript';
      break;
    case 'PHP':
      mode += 'php';
      break;
    default:
  }
  console.log('mode?', mode);

  return mode;
};
