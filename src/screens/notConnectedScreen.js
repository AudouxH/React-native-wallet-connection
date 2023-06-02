import React, { useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons';
import ActionSheetAddress from '../components/ActionSheetAddress';

// list of packages needed for web3Modal
import '@walletconnect/react-native-compat';
import { useWeb3Modal, Web3Modal } from '@web3modal/react-native';
import { providerMetadata, sessionParams } from '../constants/config';

const NotConnectedScreen = ({ actionSheetRef, setUserAddress }) => {
    const { isConnected, address, open, close, isOpen, provider } = useWeb3Modal();

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
            isOpen ? close() : null;
        } else {
            console.log("isConnected:", isConnected);
            console.log("address:", address);
        }
    }, [isConnected, address]);

    useEffect(() => {
        async function getClientId() {
          if (provider && isConnected) {
            const _clientId = await provider?.client?.core.crypto.getClientId();
            console.log("client id", _clientId);
            console.log("address in client id:", address);
          } else {
            console.log("isConnected:", isConnected);
          }
        }
    
        getClientId();
      }, [isConnected, provider]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.connection}>
                <IonIcons name="wallet-outline" size={100} color="#2081e2" />
                <Text style={styles.title}>Your wallet is not connected</Text>
                <Text style={styles.subtitle}>Connect to any supported Wallet connect to have access to your data</Text>
                <TouchableOpacity onPress={open} style={styles.button}>
                    <Text style={styles.buttonText}>Connect wallet</Text>
                </TouchableOpacity>
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
    button: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#2081e2',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
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