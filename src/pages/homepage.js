import React, {useState, useRef} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Pressable,
    Modal,
    Text,
    ActivityIndicator,
    Image
  } from 'react-native';
import { Button } from 'react-native-paper';
import { Spacer } from '../components/spacer.component';
import * as ImagePicker from 'expo-image-picker'
import { getModel, convertBase64ToTensor, startPrediction, modelFunction } from '../helpers/tensor-helper';
import {Camera} from 'expo-camera';
import { cropPicture } from '../helpers/image-helper';
export default function HomePage() {
    const [image, setImage] = useState(null)
    const [result, setResult] = useState('')
    const cameraRef = useRef();
    const [isProcessing, setIsProcessing] = useState(false);

      const processImagePrediction = async (base64Image) => {
        const croppedData = await cropPicture(base64Image, 300);
        const model = await getModel();
        const tensor = await convertBase64ToTensor(croppedData.base64);
        const prediction = await startPrediction(model, tensor);
        const highestPrediction = prediction.indexOf(
          Math.max.apply(null, prediction),
        );

        console.log(highestPrediction)
        // setPresentedShape(RESULT_MAPPING[highestPrediction]);
      };
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        })
        console.log(result)
        if(!result.cancelled){
            setImage(result.uri)
            // processImagePrediction(result);
            modelFunction({uri: result.uri});
        }
    }

    return(
        <View style={styles.container}>
           <Spacer position="bottom" size="large"><Text style={styles.headingText}>Welcome to Smartphone pH detector</Text></Spacer>
           <Spacer position="bottom" size="large"><Text style={styles.headingSubText}>Please select an image from your device or click an image of the sample to use the application.</Text></Spacer>
           {
            image && <>
            <Image style={styles.image} source={{uri: image}} />
           <Button style={styles.removeButton} color="red" icon="delete" mode="contained" onPress={() => setImage('')}>Remove Selection</Button>
            </>
           }
           <View style={styles.buttonContainer}>
           <Button style={styles.button} icon="filmstrip-box-multiple" color="yellow" mode="contained" onPress={pickImage}>Select from galary</Button>
           <Button style={styles.button} icon="camera" disabled color="green" mode="contained" onPress={() => console.log('Pressed')}>Click an image</Button>
           </View>
           
           <Text style={styles.footer}>Made by Aditya and Sheel</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow:1, 
        padding: "2%",
        textAlign: 'center',
    },
    headingText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 32
    },
    headingSubText: {
        textAlign: 'center',
        fontSize: 18
    },
    button: {
        marginTop: 10
    },
    removeButton: {
        marginTop: 10
    },
    buttonContainer: {
        marginTop: '20%'
    },
    footer: {
        marginTop: '90%',
        textAlign: 'center'
    },
    image: {
        width: 250,
        height: 250,
        marginLeft: '15%',
        borderRadius: 15,
    }
})