import React, { useEffect, useState } from 'react';
import { useToast, VStack } from 'native-base';

import { Input } from '../components/Input';

import firestone from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Button } from '../components/ButtonHome';
import { Header } from '../components/Header';

type RouteParams = {
  title: string;
}

export function RegisterRelatorio() {

  const routes = useRoute();
  const navigation = useNavigation();
  const toast = useToast();

  const { title } = routes.params as RouteParams;


  const [dataLar, setDataLar] = useState('');
  const [visitante, setVisitante] = useState('');
  const [quantidadeJovens, setQuantidadeJovens] = useState('');
  const [quantidadeCriancas, setQuantidadeCriancas] = useState('');
  
  function handleCreateRelatorio(){

    firestone()
    .collection('Relatorio')
    .add({
      title,
      dataLar,
      quantidadeJovens,
      quantidadeCriancas,
      visitante
    })
    .then(()=>{
      toast.show({
        title: 'Relatorio criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
      navigation.goBack();
    })

  }

  return (
    <VStack>
      <Header 
        title='Ciar Relatorio'
      />
      <Input 
        placeholder='Data do Lar'
        mt={4}
        onChangeText={setDataLar}
      />
      <Input 
        placeholder='QuantidadeJovens'
        mt={4}
        onChangeText={setQuantidadeJovens}
      />
      <Input 
        placeholder='Quantidade de crianças'
        mt={4}
        onChangeText={setQuantidadeCriancas}
      />
      <Input 
        placeholder='visitantes'
        mt={4}
        onChangeText={setVisitante}
      />
      <Button 
        title='Criar relatorio'
        mt={4}
        onPress={handleCreateRelatorio}
      />
    </VStack>
  );
}