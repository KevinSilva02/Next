import React, {useState} from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

export function RegisterLar() {

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [nameLider, setNameLider] = useState('');
  const [nameVice, setNameVice] = useState('');
  const [nameAnfitriao, setNameAnfitriao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const navigation = useNavigation();

  function handleNewEventRegister(){
      if(!title || !nameLider || !nameVice || !nameAnfitriao || !endereco || !dataNascimento){
        Alert.alert('Registrar', 'preencha todos os campos');
      } 

      setIsLoading(true)

      firestore()
      .collection('LarSalvacao')
      .add({
        title,
        nameLider,
        nameVice,
        nameAnfitriao,
        telefone,
        endereco,
        dataNascimento
      })
      .then(()=>{
        Alert.alert('Lar de Salvação', 'Lar de Salvação criado com sucesso');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Evento', 'Não foi possivel criar o Lar de Salvação')
      });
  }

  return (
    <VStack flex={1} p={6} bg='black'>
      <Header title='Criar Lar de Salvação' />

      <Input 
        placeholder='Nome Lar de salvação'
        mt={4}
        onChangeText={setTitle}
      />
      <Input 
        placeholder='Nome do Lider'
        mt={4}
        onChangeText={setNameLider}
      />
      <Input 
        placeholder='Nome do Vice lider'
        mt={4}
        onChangeText={setNameVice}
      />
      <Input 
        placeholder='Nome do Anfitrião'
        mt={4}
        onChangeText={setNameAnfitriao}
      />
      <Input 
        placeholder='Endereço do anfitrião'
        mt={4}
        onChangeText={setEndereco}
      />
      <Input 
        placeholder='Telefone anfitrião'
        mt={4}
        onChangeText={setTelefone}
      />
      <Input 
        placeholder='Data de Nascimento do anfitrião'
        mt={4}
        onChangeText={setDataNascimento}
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