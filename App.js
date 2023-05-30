import React, { useRef, useState } from 'react';

import ConnectedScreen from './src/screens/connectedScreen';
import NotConnectedScreen from './src/screens/notConnectedScreen';

const App = () => {
  const actionSheetRef = useRef(null);
  const [userAddress, setUserAddress] = useState("");

  return (
    (userAddress && userAddress.length > 0) ?
      <ConnectedScreen
        userAddress={userAddress} />
      :
      <NotConnectedScreen
        actionSheetRef={actionSheetRef}
        setUserAddress={setUserAddress} />
  );
}

export default App;