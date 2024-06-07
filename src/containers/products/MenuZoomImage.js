import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuZoomImage = ({ onClose, onCustomAction }) => {
    return (
        <View style={styles.toolbar}>
            <TouchableOpacity onPress={onClose}>
                <Text style={styles.button}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCustomAction}>
                <Text style={styles.button}>Custom Action</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    button: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 10,
    },
});

export default MenuZoomImage;
