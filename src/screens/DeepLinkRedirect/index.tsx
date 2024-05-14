import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DeepLinkRedirect = () => {
  const { path, id } = useParams();
  const deepLink = `${process.env.REACT_APP_PUBLIC_URL}${path}/${id}`;

  useEffect(() => {
    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Show a popup or redirect to the app
      window.location.href = deepLink;
    } else {
      // Optionally, show a message or button for desktop users
      alert('Please open this link on your mobile device to be redirected to the app.');
    }
  }, [deepLink]);

  return (
    <div>
      <h1>Redirecting to the App</h1>
      <p>If you are not redirected, click the button below:</p>
      <button onClick={() => (window.location.href = deepLink)}>Open the App</button>
    </div>
  );
};

export default DeepLinkRedirect;
