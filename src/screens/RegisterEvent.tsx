import React, {useState} from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

export function RegisterEvent() {

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewEventRegister(){
      if(!title || !date || !description){
        Alert.alert('Registrar', 'preencha todos os campos');
      } 

      setIsLoading(true)

      firestore()
      .collection('event')
      .add({
        title,
        date,
        description
      })
      .then(()=>{
        Alert.alert('Evento', 'Evento criado com sucesso');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Evento', 'Não foi possivel criar o evento')
      });
  }

  return (
    <VStack flex={1} p={6} bg='black'>
      <Header title='Criar Evento' />

      <Input 
        placeholder='Nome do Evento'
        mt={4}
        onChangeText={setTitle}
      />
      <Input 
        placeholder='Data do Evento'
        mt={4}
        onChangeText={setDate}
      />
      <Input 
        placeholder='Descrição do evento'
        multiline
        textAlignVertical='top'
        mt={4}
        onChangeText={setDescription}
      />

      <Button 
        title='Criar'
        mt={5}
        isLoading={isLoading}
        onPress={handleNewEventRegister}
      />
    </VStack>
  );
}