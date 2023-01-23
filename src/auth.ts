import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './common/firebase/config';

const logIn = () => signInWithPopup(auth, googleProvider);

const logOut = () => signOut(auth);

export { logIn, logOut };
