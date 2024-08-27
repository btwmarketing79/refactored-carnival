'use client'

import React, { useState, useEffect } from 'react';

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
    if (typeof WebApp !== 'undefined' && WebApp.initDataUnsafe.user) {
      setUserdata(WebApp.initDataUnsafe.user as UserData);
    }
  }, []); // Ensure useEffect has a dependency array

  return (
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
  );
}