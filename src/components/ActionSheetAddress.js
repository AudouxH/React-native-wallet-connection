import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import ActionSheet from "react-native-actions-sheet";
import verifiedAddress from '../functionals/verifiedAddress';
import QRCodeScanner from 'react-native-qrcode-scanner';
import IonIcons from 'react-native-vector-icons/Ionicons';

const ActionSheetAddress = ({ actionSheetRef, setUserAddress }) => {
    const [text, onChangeText] = useState("");
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    return (
        <ActionSheet ref={actionSheetRef}>
            <View style={[styles.actionSheetView, isScannerOpen ? { height: '100%' } : { height: 220 }]}>

                {isScannerOpen ?
                    <>
                        <QRCodeScanner
                            onRead={(address) => {
                                if (address.data && verifiedAddress(address.data)) {
                                    setUserAddress(address.data);
                                    actionSheetRef.current?.hide();
                                }
                            }}
                            topContent={
                                <Text style={styles.title}>Scan a qrcode</Text>
                            }
                            bottomContent={
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    setIsScannerOpen(false);
                                }}>
                                    <Text style={styles.textButton}>Stop scanning</Text>
                                </TouchableOpacity>
                            }
                        />
                    </> :
                    <>
                        <View style={styles.line}></View>
                        <Text style={styles.title}>Enter Ethereum address</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Address'
                                onChangeText={onChangeText}
                                value={text} />
                            <TouchableOpacity style={styles.qrCodeButton} onPress={() => {
                                setIsScannerOpen(true);
                            }}>
                                <IonIcons name="qr-code-outline" size={30} color="#2081e2" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {
                            if (verifiedAddress(text)) {
                                setUserAddress(text);
                                actionSheetRef.current?.hide();
                            }
                        }} style={styles.button}>
                            <Text style={styles.textButton}>Confirm</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
    actionSheetView: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    line: {
        width: '10%',
        height: 4,
        backgroundColor: '#c0c0c0',
        marginTop: 20,
        borderRadius: 4
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        color: '#08111a',
        marginBottom: 10
    },
    inputContainer: {
        width: '90%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2081e2',
    },
    textInput: {
        height: 50,
        width: '80%',
        paddingHorizontal: 10
    },
    qrCodeButton: {
        width: '20%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: 10
    },
    textButton: {
        fontSize: 16,
        color: '#FFF'
    },
});

export default ActionSheetAddress;