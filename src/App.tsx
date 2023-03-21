import React from 'react';
import './App.css';
import NotificationsList from './NotificationsList/NotificationsList';
import NotificationsTray from './NotificationsTray/NotificationsTray';

function App() {
  return (
    <>
      <NotificationsTray></NotificationsTray>
      <NotificationsList></NotificationsList>
    </>
  );
}

export default App;
