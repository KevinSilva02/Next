import { useEffect, useState } from 'react';
import { VStack, HStack, FlatList, Center, Text, useTheme } from 'native-base';

import { useNavigation, useRoute } from '@react-navigation/native';
import firestone from '@react-native-firebase/firestore'

import { ChatTeardropText } from 'phosphor-react-native';

import { Button } from '../components/Button';
import { CardLarSalvacao, LarProps } from '../components/CardLarSalvacao';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { UserProps } from '../components/Card';

import { UserFirestoreDTO } from '../DTOs/UserFirestoreDTO';

type RouteParams = {
  usersId: string;
}


export function LarSalvacao() {

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [lar, setLar] = useState<LarProps[]>([]);

  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();  
  
  const { usersId } = route.params as RouteParams;

  function handleNewLarSalvacao(){
    navigation.navigate('newLar')
  }
  function handleLarDetails(larId: string){
    navigation.navigate('larDetails', {larId});
  }
  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestone()
    .collection('LarSalvacao')
    .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
            const { nameLider, nameVice, title, nameAnfitriao, endereco, telefone, dataNascimento} = doc.data();

            return{
                id: doc.id,
                nameLider, 
                nameVice,
                title,
                nameAnfitriao,
                endereco,
                telefone,
                dataNascimento 
            }
        })
        setLar(data);
        setIsLoading(false);
    });
    return subscriber
  }, []);

  useEffect(()=> {
    setIsLoading(false)
    firestone()
      .collection<UserFirestoreDTO>('users')
      .doc(usersId)
      .get()
      .then((doc) => {
        const { usuario, tipo, email } = doc.data();
        
        setUser({
          id: doc.id,
          usuario,
          email,  
          tipo                   
        });
      })
  }, [])
  
  return (
    <VStack flex={1} pb={6} bg={'black'}>
      <HStack>
        <Header 
          title='Lares de Salvação'
        />
      </HStack>

      <VStack flex={1} px={6} mt={5}>
          { isLoading ? <Loading /> :
            <FlatList
              data={lar}
              keyExtractor={item => item.id}
              renderItem={({item}) => <CardLarSalvacao data={item} onPress={()=>handleLarDetails(item.title)} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              ListEmptyComponent={()=> (
                <Center>
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                      Não existe Lar de Salvação criado
                  </Text>
                </Center>
              )}
            />
          }
          { user.tipo === 'Lider' && 
            <Button title='Novo Lar de Salvacão' onPress={handleNewLarSalvacao} mb={3}/>
          }
      </VStack>
    </VStack>
  );
}