import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-vision-camera';
import { useState } from 'react';

const checkPermissions = async (state_func) => {
    const statusCamera = await Camera.getCameraPermissionStatus();
    if (statusCamera === 'not-determined') {
        // Requesting the permission has just been initiated.
        const newCameraPermissionStatus = await Camera.requestCameraPermission();
        state_func(newCameraPermissionStatus);
    } else {
        // Permission was already granted or is undetermined.
        state_func(statusCamera);
    }
}

export default function App() {
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined');
    checkPermissions(setCameraPermissionStatus);
    return (
        <View style={styles.container}>
            <Text>Camera is {cameraPermissionStatus}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
