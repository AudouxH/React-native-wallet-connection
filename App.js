import React, { useRef, useState } from 'react';

import ConnectedScreen from './src/screens/connectedScreen';
import NotConnectedScreen from './src/screens/notConnectedScreen';

// list of packages needed for web3Modal
import '@walletconnect/react-native-compat';
import {useWeb3Modal, Web3Button, Web3Modal} from '@web3modal/react-native';
import {providerMetadata, sessionParams} from './src/constants/config';

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