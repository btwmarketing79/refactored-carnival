'use client'

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
}

export default function Home() {
  const [userdata, setUserdata] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setUserdata(user as UserData);
      }
    }
  }, []); // Ensure useEffect has a dependency array

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <main className="p-4">
        {userdata ? (
          <>
            <h1 className="text-2xl font-bold mb-4">User Data</h1>
            <ul>
              <li>ID: {userdata.id}</li>
              <li>First Name: {userdata.first_name}</li>
              <li>Last Name: {userdata.last_name}</li>
              <li>Username: {userdata.username}</li>
              <li>Language Code: {userdata.language_code}</li>
              <li>Is Premium: {userdata.is_premium ? 'Yes' : 'No'}</li>
            </ul>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
}