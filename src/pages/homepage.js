import React, {useState} from 'react'
import {StyleSheet ,Text,View, Image} from 'react-native';
import { Button } from 'react-native-paper';
import { Spacer } from '../components/spacer.component';
import * as ImagePicker from 'expo-image-picker'
// import * as mobilenet from '@tensorflow-models/mobilenet';
// import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
// import modelJson from '../../tfjs_model/model.json'
// import * as tf from '@tensorflow/tfjs';

const modelFunction = async ({uri}) => {
    // const model = await tf.loadLayersModel(
    // bundleResourceIO(modelJson));
    // const response = await fetch(uri, {}, { isBinary: true });
    // const imageData = await response.arrayBuffer();
    // const imageTensor = decodeJpeg(imageData);
    // const prediction = (await model.predict(imageTensor))[0];
    // console.log(prediction)
}

export default function HomePage() {
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })
        console.log(result)
        if(!result.cancelled){
            setImage(result.uri)
            // modelFunction({uri: result.uri})
        }
    }

    return(
        <View style={styles.container}>
           <Spacer position="bottom" size="large"><Text style={styles.headingText}>Welcome to Smartphone pH detector</Text></Spacer>
           <Spacer position="bottom" size="large"><Text style={styles.headingSubText}>To use the application please select an image from your device or click an image of the sample</Text></Spacer>
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
        textAlign: 'center'
    },
    headingText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 32
    },
    headingSubText: {
        textAlign: 'center',
        fontSize: 20
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
    }
})