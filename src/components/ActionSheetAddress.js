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

const ActionSheetAddress = ({ actionSheetRef, setUserAddress }) => {
    const [text, onChangeText] = useState("");

    return (
        <ActionSheet ref={actionSheetRef}>
            <View style={styles.actionSheetView}>

                <View style={styles.line}></View>

                <Text style={styles.title}>Enter Ethereum address</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder='Address'
                    onChangeText={onChangeText}
                    value={text} />

                <TouchableOpacity onPress={() => {
                    if (verifiedAddress(text)) {
                        setUserAddress(text);
                        actionSheetRef.current?.hide();
                    }
                }} style={styles.button}>
                    <Text style={styles.textButton}>Confirm</Text>
                </TouchableOpacity>

            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
    actionSheetView: {
        width: '100%',
        height: 220,
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
        color: '#08111a'
    },
    textInput: {
        height: 50,
        width: '90%',
        borderWidth: 2,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#2081e2',
        paddingHorizontal: 10
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
    }
});

export default ActionSheetAddress;