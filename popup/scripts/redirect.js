onload = () => {
  chrome.runtime.sendMessage(
    {
      type: 'check-status'
    },
    (initialized) => (location.href = `${initialized ? 'classroom' : 'join'}.html`)
  );
};
