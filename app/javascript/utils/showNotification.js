import Toastify from 'toastify-js';

const showNotification = (message) => (
  Toastify({
    text: message,
    duration: 3000,
    close: false,
    gravity: 'top',
    position: 'right',
    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    stopOnFocus: true,
  }).showToast()
);

export default showNotification;
