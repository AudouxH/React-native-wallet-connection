import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';

const ConnectedScreen = ({ userAddress }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>you are now connect with Metamask SDK !</Text>
            {userAddress ? <Text style={styles.subtitle}>With the address: {userAddress}</Text> : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    }
});

export default ConnectedScreen;