import React, {useState} from 'react';
import { Alert } from 'react-native';
import { useToast, VStack } from 'native-base';

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
  const toast = useToast();

  function handleNewEventRegister(){
      if(!title.trim() || !nameLider.trim() || !nameVice.trim() || !nameAnfitriao.trim() || !endereco.trim() || !dataNascimento.trim()){
        return toast.show({
          title:'Informe todos os campos!',
          placement: 'top',
          bgColor: 'red.500'
      });
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
        toast.show({
          title:'Lar de salvação criado com sucesso',
          placement: 'top',
          bgColor: 'green.500'
      })
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        return toast.show({
          title:'Não foi possivel criar o lar de salvação',
          placement: 'top',
          bgColor: 'red.500'
      })
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