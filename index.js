if (!location.href.startsWith('chrome')) {
  onload = () => {
    setInterval(() => {
      chrome.storage.local.get(['initialized', 'test_mode'], ({ initialized, test_mode }) => {
        // TODO: Switch this to something more efficient.
        if (initialized && test_mode && (screen.availHeight || screen.height - 30) > window.innerHeight) {
          chrome.runtime.sendMessage({
            socket: true,
            type: 'fullscreen-exit'
          });

          alert('Test mode is enabled, please go to full screen mode!');
        }
      });
    }, 1000);
  };

  chrome.runtime.onMessage.addListener((request) => {
    if (request.type) {
      switch (request.type) {
        case 'private-message': {
          alert(`You received a private message from your teacher!\n\nMessage: ${request.message}`);
          break;
        }
      }
    }

    return true;
  });
}
