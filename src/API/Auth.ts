import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  User,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const loginEmailPassword = async (email: string, pass: string) => {
  return await signInWithEmailAndPassword(auth, email, pass);
};

export const singupEmailPassword = async (email: string, pass: string) => {
  return await createUserWithEmailAndPassword(auth, email, pass);
};

export const logout = async () => {
  return await signOut(auth);
};

export const authState = async (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const getUser = async () => {
    return getAuth().currentUser

}