import React, { useEffect } from 'react';

import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking
} from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons';
import ActionSheetAddress from '../components/ActionSheetAddress';

// logo imports
import logoMetamask from '../assets/metamask-logo.png';
import logoWalletConnect from '../assets/walletconnect-logo.png';

// list of packages needed for @metamask/sdk
import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';

// list of packages needed for web3Modal
import '@walletconnect/react-native-compat';
import { useWeb3Modal, Web3Modal } from '@web3modal/react-native';
import { providerMetadata, sessionParams } from '../constants/config';

const NotConnectedScreen = ({ actionSheetRef, setUserAddress }) => {
    const { isConnected, address, open, close, isOpen, provider } = useWeb3Modal();

    const connectWithMetamask = async () => {
        const MMSDK = new MetaMaskSDK({
            openDeeplink: (link) => {
                Linking.openURL(link);
            },
            timer: BackgroundTimer,
            dappMetadata: {
                name: 'walletConnection',
                url: 'https://walletConnection.com',
            },
        });

        const ethereum = MMSDK.getProvider();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log('RESULT', accounts?.[0]);
        setUserAddress(accounts?.[0]);
    }

    // useEffect(() => {
    //     if (isConnected && address) {
    //         setUserAddress(address);
    //         isOpen ? close() : null;
    //     } else {
    //         console.log("isConnected:", isConnected);
    //         console.log("address:", address);
    //     }
    // }, [isConnected, address]);

    // useEffect(() => {
    //     async function getClientId() {
    //         if (provider && isConnected) {
    //             const _clientId = await provider?.client?.core.crypto.getClientId();
    //             console.log("client id", _clientId);
    //             console.log("address in client id:", address);
    //         } else {
    //             console.log("isConnected:", isConnected);
    //         }
    //     }

    //     getClientId();
    // }, [isConnected, provider]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.connection}>
                <IonIcons name="wallet-outline" size={100} color="#2081e2" />
                <Text style={styles.title}>Your wallet is not connected</Text>
                <Text style={styles.subtitle}>Connect to any supported Wallet connect to have access to your data</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={connectWithMetamask} style={styles.button}>
                        <Image source={logoMetamask} style={styles.buttonLogo}/>
                        <Text style={styles.buttonText}>Connect with Metamask</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={open} style={styles.button}>
                        <Image source={logoWalletConnect} style={styles.buttonLogo}/>
                        <Text style={styles.buttonText}>Connect with WalletConnect</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                    actionSheetRef.current?.show();
                }} style={{ marginTop: 20 }}>
                    <Text style={styles.other}>Other option</Text>
                </TouchableOpacity>
                <Text style={styles.learnMore}>{"Don't have wallet now ? Learn More"}</Text>
            </View>

            <ActionSheetAddress
                actionSheetRef={actionSheetRef}
                setUserAddress={setUserAddress} />

            <Web3Modal
                projectId={"5c0e3814df7c19b9f153337997c46e15"}
                providerMetadata={providerMetadata}
                sessionParams={sessionParams}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    connection: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
        textAlign: 'center',
        width: '90%',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#2081e2',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20
    },
    buttonLogo: {
        width: 30,
        height: 30
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF'
    },
    other: {
        fontSize: 16,
        color: '#2081e2',
    },
    learnMore: {
        fontSize: 14,
        marginTop: 20
    }
});

export default NotConnectedScreen;