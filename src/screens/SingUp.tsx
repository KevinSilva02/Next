import React, { useState } from 'react';
import { VStack, Image, useTheme, Icon, useToast } from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Envelope, Key, User } from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SingUp() {
    const { colors } = useTheme();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lar, setLar] = useState('');
    const [register, setRegister] = useState(true)

    function handleSingUp(){
        
        if(!usuario.trim() || !email.trim() || !password.trim()){
            return toast.show({
                title:'Informe todos os campos',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        auth()
        .createUserWithEmailAndPassword(email,password)
        .catch((error) => {
            console.log(error);
            setIsLoading(false)
            setRegister(false)

            if(error.code === 'auth/invalid-email'){
                    toast.show({
                        title:'Email invalido',
                        placement: 'top',
                        bgColor: 'red.500'
                    })

                    setRegister(false)
            }
            if(error.code === 'auth/weak-password'){
                toast.show({
                    title:'Senha Fraca',
                    placement: 'top',
                    bgColor: 'red.500'
                })
                setRegister(false)
            }
            if(error.code === 'auth/email-already-in-use'){
                toast.show({
                    title:'Email já cadastrado',
                    placement: 'top',
                    bgColor: 'red.500'
                })
                setRegister(false)
            }
        })
        .then(()=>{
            if(register){
                console.log(register)
                firestore()
                .collection('users')
                .add({
                    usuario, 
                    email,
                    lar,
                    tipo: 'Membro'
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })    
            
    }


    return (
    <VStack flex={1} alignItems="center" bg="black" px={8} pt={24}>
        

        <Input 
            mb={4}
            mt={24}
            placeholder="Nome"
            InputLeftElement={<Icon as={<User color={colors.gray[500]} /> } ml={4} />}
            onChangeText={setUsuario}
        />
        <Input 
            mb={4}
            placeholder="Nome Lar de Salvação"
            InputLeftElement={<Icon as={<User color={colors.gray[500]} /> } ml={4} />}
            onChangeText={setLar}
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