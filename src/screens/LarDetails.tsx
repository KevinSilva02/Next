import React, { useEffect, useState } from 'react';
import { Center, FlatList, VStack, Text } from 'native-base';

import { useRoute } from '@react-navigation/native';
import firestone from '@react-native-firebase/firestore';

import { HeaderLar, HeaderProps } from '../components/HeaderLar';
import { Loading } from '../components/Loading';
import { CardMember, MemberProps } from '../components/CardMember';

import { LarFirestoreDTO } from '../DTOs/LarFirestoreDTO';
import { SnapchatLogo } from 'phosphor-react-native';
import { Header } from '../components/Header';

type RouteParams = {
  larId: string;
  tipoUser: string;
}


export function LarDetails() {
  
  const routes = useRoute();

  const { larId, tipoUser } = routes.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [lar, setLar] = useState<HeaderProps[]>([])
  const [member, setMember] = useState<MemberProps[]>([]);

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
    
    firestone()
    .collection('Member')
    .where('lar', '==', larId)
    .onSnapshot(snapshot=>{
      const data = snapshot.docs.map(doc=>{
        const { name, telefone, lar } =doc.data();

        return{
          id: doc.id,
          name,
          telefone,
          lar
        }
      })
      setMember(data)
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
      {
        tipoUser === 'Lider' && 
        <VStack>
          <Text>
            Lista de Menbros
          </Text>
          <FlatList 
          data={member}
          keyExtractor={item => item.id}
          renderItem={({item}) => <CardMember data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          ListEmptyComponent={()=>(
            <Center>
              <Text color='gray.300' fontSize='xl' mt={6} textAlign="center" >
                Não existe membros cadastrado!
              </Text>
            </Center>
          )}
  
        />

        </VStack>
      }
    </VStack>
  );
}