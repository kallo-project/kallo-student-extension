const showAlert = (message) => {
  alertDiv.style.display = 'block';
  alertDiv.innerText = message;
};

const hideAlert = () => {
  alertDiv.style.display = 'none';
  alertDiv.innerText = '';
};

const alertDiv = document.getElementById('alert-div');
