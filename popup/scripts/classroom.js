onload = () => {
  document.getElementById('leave-btn').onclick = () => {
    hideAlert();

    chrome.runtime.sendMessage(
      {
        type: 'leave'
      },
      ({ success, message }) => {
        if (success) close();
        else showAlert(message);
      }
    );
  };
};
