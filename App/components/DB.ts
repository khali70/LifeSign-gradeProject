import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  FIRE_BASE_API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APPID,
} from "@env";

export const firebaseConfig = {
  apiKey: FIRE_BASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APPID,
};

const app = initializeApp(firebaseConfig);

// firebase fireStore
const db = getFirestore(app);
/**
 * Get a list of signs from your database
 */
export async function getSigns() {
  try {
    const signsCol = collection(db, "Signs");
    const signSnapshot = await getDocs(signsCol);
    //Fix add data type definitions
    const signList = signSnapshot.docs.map((doc) => doc.data());
    return signList;
  } catch (err) {
    console.log(`getSigns error`);
    console.error(err);
  }
}

// firebase Storage
const storage = getStorage(app);

/**
 * upload blob file
 * - create
 * @example
 * ```js
 * const mountainsRef = ref(storage, "imagePath.jpg");
 * ```
 */
export const uploadBlobFile = async (
  dir: string,
  blobFile: Blob | Uint8Array | ArrayBuffer
) => {
  uploadBytes(ref(storage, dir), blobFile).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};

export const getDownloadUrl = async (path: string) => {
  return getDownloadURL(ref(storage, path));
};
