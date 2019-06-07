chrome.runtime.onConnect.addListener(port => {
  console.log("Connected .....", port);
  port.onMessage.addListener(msg => {
    port.postMessage(msg);
    const { action, data } = msg;
    console.log("ACTION::", action);

    switch (action) {
      case "signUpErr": {
        const { email, password } = data;
        console.log("hit signup", `${action}:::${email}, ${password}`);
        // Sign in user
        break;
      }
      case "authCheck": {
        console.log("hit authcheck", `${action}:::${data}`);
        // Check if user is logged in, return auth state

        if (currentUser) {
          console.log("already logged in", currentUser);
          return message(port, { authenticated: true }, currentUser);
        }
        break;
      }
      case "signOut": {
        // TODO: Sign user out, return auth state
        console.log("hit signout", `${action}:::${data}`);
        break;
      }
      default:
        console.log("invalid request");
    }
  });
});

(function(i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);
ga("create", "UA-example", "auto");
ga("set", "checkProtocolTask", () => {});
ga("require", "displayfeatures");
// ga("send", "pageview", "/extension#" + window.location.href);

const url = false;
const host = false;
const path = false;

const updateToolbarIcon = og_type => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (og_type === "article") {
      chrome.browserAction.setIcon({
        tabId: tabs[0].id,
        path: "../icons/on.png"
      });
      chrome.pageAction.show(tabs[0].id);
    } else {
      chrome.pageAction.setIcon({
        tabId: tabs[0].id,
        path: "../icons/off.png"
      });
      chrome.pageAction.hide(tabs[0].id);
    }
  });
};

const sendMessageToTab = (action, callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, action, callback);
  });
};

const receiveScore = score => {
  // Receives data from scoring api
  chrome.storage.sync.set({ score: score.result });

  // Send GA event to save data to build averages
  ga("send", {
    hitType: "event",
    eventCategory: "article",
    eventAction: "score",
    eventValue: score,
    metric1: score,
    dimension1: host,
    dimension2: path
  });
};

const receiveAverages = averages => {
  // Recieves data from Google Analytics via serverless api
  const site_avg = averages.reports[0].data.rows[0].metrics[0].values[0];
  const title_avg = averages.reports[1].data.rows[0].metrics[0].values[0];
  chrome.storage.sync.set({
    averages: {
      site: parseInt(site_avg, 10),
      title: parseInt(title_avg, 10)
    }
  });
};

// // Message Handlers
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, data, href } = message;

  switch (action) {
    case "analytics_event":
      ga("send", "event", "FROM BACKGORUND", "play", "Fall Campaign");
      break;
    case "receive averages":
      receiveAverages(data);
      break;
    case "receive score":
      receiveScore(data);
      break;
    case "page_view":
      host = message.host;
      path = message.path;
      url = href;

      ga("send", "pageview", `/extension#${href}`);
      updateToolbarIcon(message.og_type);

      sendMessageToTab({ action: "extract_text" }, response => {
        sendMessageToTab({ action: "get_score", data: response });
      });
      sendMessageToTab({ action: "get_averages" });
      break;

    default:
      break;
  }
});
