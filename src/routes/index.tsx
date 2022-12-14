import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import firestone from '@react-native-firebase/firestore';

import { SingRoutes } from './sing.routes';
import { Loading } from '../components/Loading';
import { AppRoutes } from './app.routes';
import { UserFirestoreDTO } from '../DTOs/UserFirestoreDTO';


export function Routes() {

    const [loading, setIsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();
    const [users, setUsers] = useState<UserFirestoreDTO>();
    const [email, setEmail] = useState('');
    
    useEffect(()=> {
        const subscriber = auth()
        .onAuthStateChanged(response => {
            setUser(response);
            setIsLoading(false);
             
        });
        
        return subscriber;
    },[]);

    if(loading) {
        return <Loading />
    }
    
    return( 
        <NavigationContainer>
            {user ? <AppRoutes /> : <SingRoutes />}     
        </NavigationContainer>
  );
}