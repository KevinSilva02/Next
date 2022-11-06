import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack } from 'native-base';

import { useRoute } from '@react-navigation/native';
import firestone from '@react-native-firebase/firestore';

import { RelatorioProps } from '../components/CardRelatorio';
import { RelatorioFirestoreDTO } from '../DTOs/RelatorioFirestoreDTO';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Alert } from 'react-native';

type RouteParams = {
  Id: string;
}

export function RelatorioDetails() {
  const route = useRoute();

  const { Id } = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(true)
  const [relatorio, setRelatorio] = useState<RelatorioProps>({} as RelatorioProps); 
  
    useEffect(()=>{
      firestone()
      .collection<RelatorioFirestoreDTO>('Relatorio')
      .doc(Id)
      .get()
      .then((doc) => {
        const { title, dataLar, visitante, quantidadeCriancas, quantidadeJovens  } = doc.data();
        
        setRelatorio({
          id: doc.id,
          title,
          dataLar,
          visitante,
          quantidadeCriancas,
          quantidadeJovens
        });
        setIsLoading(false)
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])
  
  

  if(isLoading){
    return <Loading />
  }

  return (
    <VStack>
      <Header title='Detalhes Relatorio' />
      <HStack>
        <Text p={5}>
          Nome Lar: {relatorio.title}
        </Text>
        <Text p={5}>
          Data lar: {relatorio.dataLar}
        </Text>
      </HStack>
      <Text>
        Nº Jovens: {relatorio.quantidadeJovens}
      </Text>
      <Text>
        Nº Crianças: {relatorio.quantidadeCriancas}
      </Text>
      <Text>
        Nº Visitantes: {relatorio.visitante}
      </Text>
    </VStack>
  );
}