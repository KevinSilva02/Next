import React, { useState } from 'react';
import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export function RegisterReserva() {

  const navigation = useNavigation();  
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');

  function handleReservar(){
    if(!name || !telefone){
        Alert.alert('reserva', 'Digite nome e telefone');
    }

    firestore()
    .collection('Reserva')
    .add({
        name,
        telefone
    })
    .then(()=> {
        Alert.alert('reserva', 'reserva feita');
        navigation.goBack();
    })
  }

  return (
    <VStack>
        <Header 
            title='Reserva'
        />
        <Input 
            placeholder='Nome'
            onChangeText={setName}
        />
        <Input 
            placeholder='Telefone'
            onChangeText={setTelefone}
        />
        <Button 
            title='Reservar'
            onPress={handleReservar}
        />
    </VStack>
  );
}