import { CameraView } from "expo-camera";
import { CameraIcon, SunMoon, SwitchCamera, Zap, ZapOff, ZapOffIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

type FaceCamera = "front" | "back"
type FlashCamera = "off" | "on" | "auto"

export default function Camera(){

    const [face, setFace] = useState<FaceCamera>('back')
    const [flash, setFlash] = useState<FlashCamera>("off")
    const [onCamera, setCameraOn] = useState<boolean>(false)
    const [photo, setPhoto] = useState<string | null>(null)
    const refCamera = useRef<CameraView>(null)

    const toggleFaceCamera = () => {
        if(face === "front"){
            setFace("back")
        }else{
            setFace("front")
        }
    }

    const toggleFlashCamera = () => {
        switch(flash){
            case "off": 
                setFlash("on")
                break
            case "on": 
                setFlash("auto")
                break
            case "auto":
                setFlash("off")
                break
        }
    }

    const setCameraReady = () => {
        setCameraOn(true)
    }

    const takePincture = async () => {
        if(onCamera && refCamera.current){

            const photo = await refCamera.current.takePictureAsync({
                base64: true,
                quality: 1
            })

            if(photo){
                setPhoto(photo.uri)
            }

        }
    }

    return(
        <CameraView 
            ref={refCamera}
            facing={face}
            flash={flash}
            onCameraReady={() => setCameraReady()}
            style={styles.container}>

            <View>
                {photo != null &&
                    <Image source={{uri: photo}} style={{ width: 150, height: 150 }}/>
                }
            </View>

            <View style={styles.content}>
                <Pressable 
                    style={styles.toggleFace}
                    onPress={toggleFlashCamera}>
                        {flash === "off" &&
                            <ZapOff />
                        }
                        {flash === "on" &&
                            <Zap />
                        }
                        {flash === "auto" &&
                            <SunMoon />
                        }
                </Pressable>
                <Pressable style={styles.take} onPress={takePincture}>
                    <CameraIcon />
                </Pressable>
                <Pressable 
                    style={styles.toggleFace}
                    onPress={toggleFaceCamera}>
                        <SwitchCamera />
                </Pressable>
            </View>
        </CameraView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    content: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: "flex-end",
        marginBottom: 10,
        gap: 10
    },
    take: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleFace: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center'
    }
})