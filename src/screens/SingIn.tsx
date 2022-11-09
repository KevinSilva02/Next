import React, { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Image, useTheme, Icon, Text, useToast } from 'native-base';

import { THEME } from '../styles/theme';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { Envelope, Key } from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Button } from '../components/ButtonHome';

export function SingIn() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSingIn(){

    if(!email || !password){
      return toast.show({
        title:'Informe email e senha',
        placement: 'top',
        bgColor: 'red.500'
    })
    }
    setIsLoading(true);

    auth()
    .signInWithEmailAndPassword(email,password)
    .catch((error) => {
      console.log(error);
      setIsLoading(false);

      if (error.code === 'auth/invalid-email'){
        return toast.show({
                title:'Email ou senha invalido',
                placement: 'top',
                bgColor: 'red.500'
            })
      }
      if (error.code === 'auth/user-not-found'){
        return toast.show({
          title:'Usuario não cadastrado',
          placement: 'top',
          bgColor: 'red.500'
      });
      }
      if (error.code === 'auth/wrong-password'){
        return toast.show({
                title:'Email ou senha invalido',
                placement: 'top',
                bgColor: 'red.500'
            })
      }

      return toast.show({
        title:'Não foi possivel acessar!',
        placement: 'top',
        bgColor: 'red.500'
    })
    })

  }

  function handleCadastre(){
    navigation.navigate("singUp")
  } 

  return (
    <VStack flex={1} alignItems="center" bg="black" px={8} pt={24}>
      

      <Input 
        mt={24}
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[500]} />} ml={4} />}
        onChangeText={setEmail}
      />
      
      <Input 
        mb={12}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[500]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button 
        title='Entrar'
        w="full"
        mb={4}
        onPress={handleSingIn}
        isLoading={isLoading}
      />
      
      <Text alignItems="center" color='white' onPress={handleCadastre} mt={30}>
        Não possui uma conta? <Text>Cadastre-se</Text>
      </Text>

    </VStack>
  );
}