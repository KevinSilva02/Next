import React, { useEffect, useState } from 'react';
import { FlatList, VStack } from 'native-base';

import { useRoute } from '@react-navigation/native';
import firestone from '@react-native-firebase/firestore';

import { HeaderLar, HeaderProps } from '../components/HeaderLar';
import { Loading } from '../components/Loading';

import { LarFirestoreDTO } from '../DTOs/LarFirestoreDTO';
import { SnapchatLogo } from 'phosphor-react-native';
import { Header } from '../components/Header';

type RouteParams = {
  larId: string;
}


export function LarDetails() {
  
  const routes = useRoute();

  const { larId } = routes.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [lar, setLar] = useState<HeaderProps[]>([])

  useEffect(()=>{
    firestone()
    .collection('LarSalvacao')
    .where('title', '==', larId)
    .onSnapshot(snapshot=>{
      const data = snapshot.docs.map(doc=>{
        const { title, nameLider, nameVice, nameAnfitriao, telefone, dataNascimento, endereco } = doc.data();

        return{
          id: doc.id,
          title,
          nameLider,
          nameVice,
          nameAnfitriao,
          telefone,
          dataNascimento,
          endereco
        }
      })
      setLar(data)
      setIsLoading(false)
    })

  },[])

  return (
    <VStack>
      <Header 
        title='Detelhes Lar Salvação'
      />
      <FlatList 
        data={lar}
        keyExtractor={item => item.id}
        renderItem={({item}) => <HeaderLar data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </VStack>
  );
}