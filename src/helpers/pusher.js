import Echo from 'laravel-echo';
import Pusher from 'pusher-js'
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    auth: {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
    },
    // added
    authEndpoint: `http://127.0.0.1:8000/broadcasting/`
});