import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const pickImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      return result.uri;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadImageToFirebase = async (uri, imageName) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, `images/${imageName}.jpeg`);
    const uploadTask = await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    });

    const url = await getDownloadURL(uploadTask.ref);

    blob.close();

    return url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
