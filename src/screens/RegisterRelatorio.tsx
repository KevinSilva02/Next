import React, { useEffect, useState } from 'react';
import { VStack } from 'native-base';

import { Input } from '../components/Input';

import firestone from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

type RouteParams = {
  title: string;
}

export function RegisterRelatorio() {

  const routes = useRoute();
  const navigation = useNavigation();

  const { title } = routes.params as RouteParams;

  const [dataLar, setDataLar] = useState('');
  const [visitante, setVisitante] = useState('');
  const [quantidaJovens, setQuantidadeJovens] = useState('');
  const [quantidaCriacas, setQuantidadeCriancas] = useState('');

  console.log(title)

  function handleCreateRelatorio(){

    firestone()
    .collection('Relatorio')
    .add({
      title,
      dataLar,
      quantidaJovens,
      quantidaCriacas,
      visitante
    })
    .then(()=>{
      Alert.alert('Relatorio', 'Relatorio Criado com Sucesso')
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