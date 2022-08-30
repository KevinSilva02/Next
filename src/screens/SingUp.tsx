import React, { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Image, useTheme, Icon } from 'native-base';
import { THEME } from '../styles/theme';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Envelope, Key, User } from 'phosphor-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SingUp() {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSingUp(){
        
        if(!usuario || !email || !password){
            return Alert.alert('Cadastro', 'Informe nome, e-mail e senha');
        }

        auth()
        .createUserWithEmailAndPassword(email,password)
        .catch((error) => {
            console.log(error);
            setIsLoading(false)

            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Cadastro', 'E-mail invalido')
            }
            if(error.code === 'auth/weak-password'){
                return Alert.alert('Cadastro', 'Senha fraca')
            }
            if(error.code === 'auth/email-already-in-use'){
                return Alert.alert('Cadastro', "E-mail já cadastrado");
            }
        })
        
        firestore()
        .collection('users')
        .add({
            usuario, 
            email,
            tipo: 'Membro'
        })
        .catch((error) => {
            console.log(error);
        })
        
    }


    return (
    <VStack flex={1} alignItems="center" bg="black" px={8} pt={24}>
        <Image source={require('../assents/novo.png')} alt="next" mt={24} />

        <Input 
            mb={4}
            mt={24}
            placeholder="Nome"
            InputLeftElement={<Icon as={<User color={colors.gray[500]} /> } ml={4} />}
            onChangeText={setUsuario}
        />
        <Input 
            mb={4}
            placeholder="E-mail"
            InputLeftElement={<Icon as={<Envelope color={colors.gray[500]} /> } ml={4} />}
            onChangeText={setEmail}
        />
        <Input 
            mb={4}
            placeholder="Senha"
            InputLeftElement={<Icon as={<Key color={colors.gray[500]} /> } ml={4} />}
            onChangeText={setPassword}
            secureTextEntry
        />

        <Button 
            title='Cadastrar'
            w="full"
            onPress={handleSingUp}
            isLoading={isLoading}
        />
        
    </VStack>
  );
}