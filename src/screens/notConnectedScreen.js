import React, { useState } from 'react';

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
import logoWalletConnect from '../assets/walletconnect-logo.png';

// list of packages needed for web3Modal
import '@walletconnect/react-native-compat';

import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';
import { getSdkError } from '@walletconnect/utils';

import { useWeb3Modal, Web3Modal } from '@web3modal/react-native';
import { providerMetadata, sessionParams } from '../constants/config';

const NotConnectedScreen = ({ actionSheetRef, setUserAddress }) => {
    const { isConnected, address, open, close, isOpen, provider } = useWeb3Modal();
    const [wcuri, setWCUri] = useState("");

    const core = new Core({
        projectId: "5c0e3814df7c19b9f153337997c46e15"
    })

    const pair = async (uri) => {
        return await core.pairing.pair({ uri: uri })
    }

    const createWeb3Wallet = async () => {
        const web3wallet = await Web3Wallet.init({
            core,
            metadata: providerMetadata,
        })

        // Approval: Using this listener for sessionProposal, you can accept the session
        web3wallet.on("session_proposal", async (proposal) => {
            const session = await web3wallet.approveSession({
                id: proposal.id,
                namespaces,
            });
        });

        // Reject: Using this listener for sessionProposal, you can reject the session
        web3wallet.on("session_proposal", async (proposal) => {
            const session = await web3wallet.rejectSession({
                id: proposal.id,
                reason: getSdkError("USER_REJECTED_METHODS"),
            });
        });

        // Call this after WCURI is received
        await web3wallet.core.pairing.pair({ wcuri });
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.connection}>
                <IonIcons name="wallet-outline" size={100} color="#2081e2" />
                <Text style={styles.title}>Your wallet is not connected</Text>
                <Text style={styles.subtitle}>Connect to any supported Wallet connect to have access to your data</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={connectWithMetamask} style={styles.button}>
                        <Image source={logoMetamask} style={styles.buttonLogo} />
                        <Text style={styles.buttonText}>Connect with Metamask</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={open} style={styles.button}>
                        <Image source={logoWalletConnect} style={styles.buttonLogo} />
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