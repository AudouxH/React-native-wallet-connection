import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons';
import ActionSheetAddress from '../components/ActionSheetAddress';

const NotConnectedScreen = ({ actionSheetRef, setUserAddress }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.connection}>
                <IonIcons name="wallet-outline" size={100} color="#2081e2" />
                <Text style={styles.title}>Your wallet is not connected</Text>
                <Text style={styles.subtitle}>Connect to any supported Wallet connect to have access to your data</Text>
                <TouchableOpacity onPress={() => {

                }} style={styles.button}>
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
                setUserAddress={setUserAddress}/>
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