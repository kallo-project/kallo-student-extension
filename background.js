// #region Variables
const BACKEND_URL = ''; /* Back-end URL */
let SOCKET_CONNECTION = false;
let RESTRICTED_ACCESS = false;
let ALLOWED_SITES = [];

const socket = io.connect(BACKEND_URL);
// #endregion

// #region Socket connections
socket.on('connect', () => {
  SOCKET_CONNECTION = true;
  console.log('Socket client connected to the back-end server.');

  socket.on('request-tabs', () => {
    chrome.tabs.query({}, (tabs) => {
      chrome.storage.local.get(['class_id', 'student_id'], ({ class_id, student_id }) => {
        socket.emit(
          'student-tabs',
          JSON.stringify({
            class_id,
            student_id,
            tabs: tabs.map((i) => ({ title: i.title, url: i.url, active: i.active, incognito: i.incognito }))
          })
        );
      });
    });
  });

  socket.on('private-message', (data) => {
    const { message } = JSON.parse(data);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
      chrome.tabs.sendMessage(tabs[0].id, { type: 'private-message', message: message })
    );
  });
});
// #endregion

// #region Chrome events
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // We were having some issues with using Chrome's storage API.
    if (RESTRICTED_ACCESS) {
      const host = details.initiator || details.url;
      
      if (
        typeof host === 'string' &&
        !host.startsWith('chrome') &&
        !BACKEND_URL.includes(host) &&
        ALLOWED_SITES.filter((i) => host.includes(i)).length === 0
      )
        return { cancel: true };
    }
  },
  { urls: ['*://*/*'] },
  ['blocking']
);

chrome.webNavigation.onBeforeNavigate.addListener((tab) => {
  if (SOCKET_CONNECTION)
    chrome.storage.local.get(['class_id', 'student_id'], ({ class_id, student_id }) => {
      socket.emit('student-navigation', JSON.stringify({ class_id, student_id, url: tab.url }));
    });
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (typeof request.type !== 'string') sendResponse({ success: false, message: 'Bad request!' });
  else if (request.socket && !SOCKET_CONNECTION) sendResponse({ success: false, message: 'Back-end server offline!' });
  else {
    switch (request.type) {
      case 'check-status': {
        chrome.storage.local.get(['initialized'], ({ initialized }) => {
          sendResponse(initialized || false);
        });

        break;
      }
      case 'join': {
        socket.emit('join', JSON.stringify({ name: request.name, code: request.code }));

        socket.on('join-response', (data) => {
          const obj = JSON.parse(data);

          if (!obj.accepted) {
            sendResponse({ success: false, message: obj.message });
          } else {
            chrome.storage.local.set(JSON.parse(obj.message), () => {
              chrome.storage.local.get(
                ['restricted_access', 'allowed_sites', 'test_mode'],
                ({ restricted_access, allowed_sites, test_mode }) => {
                  // Once again, we were having issues with Chrome's storage API--website blocking wasn't working.
                  RESTRICTED_ACCESS = restricted_access;
                  ALLOWED_SITES = allowed_sites;
                  
                  if (restricted_access) {
                    chrome.tabs.query({}, (tabs) => {
                      for (const i in tabs) chrome.tabs.remove(tabs[i].id);
                    });

                    for (const i in allowed_sites) chrome.tabs.create({ url: `https://${allowed_sites[i]}` });

                    if (test_mode) {
                      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
                        chrome.windows.update(tabs[0].windowId, { state: 'fullscreen' })
                      );
                    }
                  }
                }
              );

              chrome.storage.local.set({ initialized: true });
              sendResponse({ success: true });
            });
          }
        });

        break;
      }
      case 'fullscreen-exit': {
        if (SOCKET_CONNECTION)
          chrome.storage.local.get(['class_id', 'student_id'], ({ class_id, student_id }) => {
            socket.emit('fullscreen-exit', JSON.stringify({ class_id, student_id }));
          });

        break;
      }
      case 'leave': {
        try {
          chrome.storage.local.get(['class_id', 'student_id'], ({ class_id, student_id }) => {
            socket.emit('leave', JSON.stringify({ class_id, student_id }));
            chrome.storage.local.clear();
            chrome.runtime.reload(); // TODO: Replace this with a proper way to reset the socket connection
            sendResponse({ success: true });
          });
        } catch (e) {
          sendResponse({ success: false, message: e.message });
        }

        break;
      }
    }
  }

  return true;
});
// #endregion
