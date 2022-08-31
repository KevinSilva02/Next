import React, { useEffect, useState } from 'react';
import { VStack, FlatList, Center, Text } from 'native-base';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { ChatTeardropText } from 'phosphor-react-native';
import firestone from '@react-native-firebase/firestore'
import { Event,EventProps } from '../components/Event';
import { useNavigation } from '@react-navigation/native';

export function EventoRelatorio() {
    const [event, setEvent] = useState<EventProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    function handleRelatorio(eventoId: string){
        navigation.navigate('Relatorio', { eventoId })
    }

    useEffect(() => {
        setIsLoading(true);
    
        const subscriber = firestone()
        .collection('event')
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
                const { date, description, title} = doc.data();
    
                return{
                    id: doc.id,
                    date,
                    description,
                    title 
                }
            })
            setEvent(data);
            setIsLoading(false);
        });
        return subscriber
      }, []);
  return (
    <VStack flex={1} pb={6} bg={'black'}>
        <Header 
            title='Relatorio de Eventos'
        />
        <VStack flex={1} px={6} mt={5}>
          { isLoading ? <Loading /> :
            <FlatList
              data={event}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Event data={item} onPress={()=>handleRelatorio(item.id)} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              ListEmptyComponent={()=> (
                <Center>
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                      Não existe eventos disponiveis
                  </Text>
                </Center>
              )}
            />
            }
            </VStack>

    </VStack>
  );
}