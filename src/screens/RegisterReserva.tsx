import React, { useState } from 'react';
import { VStack, Text, Checkbox, HStack, Switch } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

type RouteParams = {
    eventoId: string;
}

export function RegisterReserva() {

  const routes = useRoute();
  const navigation = useNavigation();  
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isEnabled,setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { eventoId } = routes.params as RouteParams;


  function handleReservar(){
    if(!name || !telefone){
        Alert.alert('reserva', 'Digite nome e telefone');
    }
   
    firestore()
    .collection('Reserva')
    .add({
        name,
        telefone,
        eventoId
    })
    .then(()=> {
        Alert.alert('reserva', 'reserva feita');
        navigation.goBack();
    })

    console.log(eventoId)
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
        <HStack space={6}>
        <Text>
            Visitante
        </Text>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </HStack>
        <Button 
            title='Reservar'
            onPress={handleReservar}
        />
    </VStack>
  );
}