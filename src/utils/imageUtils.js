import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    return result.uri;
  }
};

export const uploadImageToFirebase = async (uri, imageName) => {
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

  return url;
};
