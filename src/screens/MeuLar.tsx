import React, { useEffect, useState } from 'react';
import { Center, FlatList, Text, VStack } from 'native-base';

import { useRoute, useNavigation } from '@react-navigation/native';
import firestone from '@react-native-firebase/firestore';

import { HeaderLar, HeaderProps } from '../components/HeaderLar';
import { CardMember, MemberProps } from '../components/CardMember';
import { Loading } from '../components/Loading'
import { Button } from '../components/Button';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { Header } from '../components/Header';

type RouteParams = {
  usersId: string;
}

export function MeuLar() {

  const routes = useRoute();
  const navigation = useNavigation();

  const { usersId } = routes.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true)
  const [lar, setLar] = useState<HeaderProps[]>([]);
  const [member, setMember] = useState<MemberProps[]>([]);

  function handleNewMember(){
    navigation.navigate('newMember')
  }

  useEffect(()=>{
    firestone()
    .collection('LarSalvacao')
    .where('title', '==', usersId)
    .onSnapshot(snapshot=>{
      const data = snapshot.docs.map(doc=>{
        const { title, nameLider, nameVice, nameAnfitriao, endereco, telefone, dataNascimento } = doc.data();

        return{
          id: doc.id,
          title,
          nameLider, 
          nameVice,
          nameAnfitriao,
          endereco,
          telefone,
          dataNascimento
        }
      })
      setLar(data)
      setIsLoading(false)
    })
  },[])

  useEffect(()=>{
    firestone()
    .collection('Member')
    .where('lar', '==', usersId)
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
        title='Meu Lar Salvação'
      />
      <FlatList 
        data={lar}
        keyExtractor={item => item.id}
        renderItem={({item}) => <HeaderLar data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        />
        <Text>
          Lista de Membros: 
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
      <Button title='Cadastra Membro' onPress={handleNewMember} />
    </VStack>
  );
}