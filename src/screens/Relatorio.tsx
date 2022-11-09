import React, { useEffect, useState } from 'react';
import { Center, FlatList, VStack, Text } from 'native-base';

import firestone from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CardRelatorio, RelatorioProps } from '../components/CardRelatorio';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { UserProps } from '../components/Card';
import { Loading } from '../components/Loading';

import { UserFirestoreDTO } from '../DTOs/UserFirestoreDTO';

type RouteParams = {
    title: string;
    usersId: string;
}

export function Relatorio() {

    const navigation = useNavigation();
    const routes = useRoute();

    const [isLoading, setIsLoading] = useState(true)
    const { title, usersId } = routes.params as RouteParams;
    const [relatorio, setRelatorio] = useState<RelatorioProps[]>([])
    const [users, setUsers] = useState<UserProps>({} as UserProps)

    function handleNewRelatorio(title: string){
        navigation.navigate('newRelatorio', {title});
    }

    function handleOpenRelatorioDetails(Id: string){
        navigation.navigate('relatorioDetails', {Id})
    }

    useEffect(()=>{
        
        setIsLoading(true)
        firestone()
        .collection('Relatorio')
        .where('title', '==', title)
        .onSnapshot(snapshot=>{
            const data = snapshot.docs.map(doc=>{
                const { title, dataLar, visitante, quantidadeJovens, quantidadeCriancas } = doc.data();

                return{
                    id: doc.id,
                    title,
                    dataLar,
                    visitante,
                    quantidadeCriancas,
                    quantidadeJovens
                }
            })
            setRelatorio(data);
        })

    },[])

    useEffect(()=> {
        firestone()
          .collection<UserFirestoreDTO>('users')
          .doc(usersId)
          .get()
          .then((doc) => {
            const { usuario, tipo, email } = doc.data();
            
            setUsers({
              id: doc.id,
              usuario,
              email,  
              tipo                   
            });
            setIsLoading(false)
          })
      }, [])

      if(isLoading){
        return <Loading />
      }

  return (
    <VStack flex={1} pb={6} >
        <Header 
            title='Relatorios'
        />
        <FlatList 
            data={relatorio}
            keyExtractor={item => item.id}
            renderItem={({item})=> <CardRelatorio data={item} onPress={()=>handleOpenRelatorioDetails(item.id)} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            ListEmptyComponent={()=>(
                <Center>
                    <Text color="gray.300" fontSize='xl' mt={6} textAlign='center' >
                        Ainda nao Existe relatorio para exibir!
                    </Text>
                </Center>
            )}
        />
        <Button 
            title='Criar Relatório'
            onPress={()=> handleNewRelatorio(title)}
        />
        
    </VStack>
  );
}