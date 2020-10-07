window.onload = () => {
  document.getElementById('input-from').onsubmit = (e) => {
    e.preventDefault();
    hideAlert();

    chrome.runtime.sendMessage(
      {
        socket: true,
        type: 'join',
        name: e.target.name.value,
        code: e.target.code.value
      },
      ({ success, message }) => {
        if (success) close();
        else showAlert(message);
      }
    );
  };
};
