import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import {fetch, decodeJpeg, bundleResourceIO} from '@tensorflow/tfjs-react-native';
import {Base64Binary} from '../utils/utils'

const modelJson = require('../model/model.json');
const modelWeights = require('../model/weights.bin');


// 0: channel from JPEG-encoded image
// 1: gray scale
// 3: RGB image

const TENSORFLOW_CHANNEL = 3;

export const getModel = async () => {
    try {
      // wait until tensorflow is ready
      await tf.ready();
      // load the trained model
      return await tf.loadLayersModel(bundleResourceIO(modelJson));
    } catch (error) {
      console.log('Could not load model', error);
    }
  };

  export const convertBase64ToTensor = async (base64) => {
    try {
      const uIntArray = Base64Binary.decode(base64);
      const decodedImage = decodeJpeg(uIntArray, 3);
      return decodedImage.reshape([
        1,
        BITMAP_DIMENSION,
        BITMAP_DIMENSION,
        TENSORFLOW_CHANNEL,
      ]);
    } catch (error) {
      console.log('Could not convert base64 string to tesor', error);
    }
  };

  export const startPrediction = async (model, tensor) => {
    try {
      const output = await model.predict(tensor);
      return output.dataSync();
    } catch (error) {
      console.log('Error predicting from tesor image', error);
    }
  };

  
export const modelFunction = async ({uri}) => {
    await tf.ready();
    const model = await tf.loadLayersModel(
    bundleResourceIO(modelJson, modelWeights));
    const response = await fetch(uri, {}, { isBinary: true });
    const imageData = await response.arrayBuffer();
    const imageTensor = decodeJpeg(imageData);
    const prediction = (await model.predict(imageTensor))[0];
    console.log(prediction)
}
