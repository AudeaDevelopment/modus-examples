import '@babel/polyfill';
import Mercury from '@postlight/mercury-parser';

console.log('MAIN LOADED');

const getMetaContent = (metaName) => {
  const metas = document.getElementsByTagName('meta');
  const re = new RegExp(`\\b${metaName}\\b`, 'i');
  let i = 0;
  const mLength = metas.length;
  for (i; i < mLength; i++) {
    if (re.test(metas[i].getAttribute('property'))) {
      return metas[i].getAttribute('content');
    }
  }
  return '';
};

const getContent = async () => {
  const og_type = await getMetaContent('og:type');
  chrome.runtime.sendMessage({
    action: 'page_view',
    og_type,
  });

  await [...document.querySelectorAll('#twitter-widget-0')].map(x =>
    x.remove(),
  );

  const data = await Mercury.parse().then(res =>
    res.content.replace(/<(?:.|\n)*?>|&nbsp;/gm, ''),
  );
  await console.log('DATA', data);

  return data;
};

window.onload = getContent();
