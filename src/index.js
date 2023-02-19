import bridge from '@vkontakte/vk-bridge';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

// Init VK  Mini App
bridge.send('VKWebAppInit');

ReactDOM.render(<App />, document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); // runtime download
}
