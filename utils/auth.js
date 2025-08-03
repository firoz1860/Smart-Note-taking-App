import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { localNotesStorage } from '@/lib/storage';

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    localNotesStorage.setCurrentUser({
      uid: user.uid,
      email: user.email
    });
    return user;
  } catch (error) {
    
    const demoUser = {
      uid: `demo-${Date.now()}`,
      email: email
    };
    localNotesStorage.setCurrentUser(demoUser);
    return demoUser;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localNotesStorage.setCurrentUser({
      uid: user.uid,
      email: user.email
    });
    return user;
  } catch (error) {
    
    const demoUser = {
      uid: `demo-${email.replace('@', '-').replace('.', '-')}`,
      email: email
    };
    localNotesStorage.setCurrentUser(demoUser);
    return demoUser;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    localNotesStorage.removeCurrentUser();
  } catch (error) {
   
    localNotesStorage.removeCurrentUser();
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      localNotesStorage.setCurrentUser({
        uid: user.uid,
        email: user.email
      });
    } else {
   
      const localUser = localNotesStorage.getCurrentUser();
      if (localUser) {
        user = localUser;
      }
    }
    callback(user);
  });
};





