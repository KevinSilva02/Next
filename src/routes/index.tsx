import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { SingRoutes } from "./sing.routes";
import { Loading } from "../components/Loading";
import { AppRoutes } from "./app.routes";


export function Routes() {

    const [loading, setIsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();
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