import { useNavigation, useRoute } from '@react-navigation/native';
import { VStack, HStack, FlatList, Center, Text, useTheme } from 'native-base';
import { useEffect, useState } from 'react';

import firestone from '@react-native-firebase/firestore'

import { Button } from '../components/Button';
import { Event, EventProps } from '../components/Event';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { ChatTeardropText } from 'phosphor-react-native';
import { ReservaProps, Reservas } from '../components/Reservas';

type RouteParams = {
  eventoId: string;
}

export function Relatorio() {

  const [isLoading, setIsLoading] = useState(true);
  const [reserva, setReserva] = useState<ReservaProps[]>([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const routes = useRoute();

  const { eventoId } = routes.params as RouteParams;

  useEffect(()=> {
    setIsLoading(true);

    const subscriber = firestone().
    collection('Reserva')
    .where('eventoId', '==', eventoId)
    .onSnapshot(snapshot=>{
      const data = snapshot.docs.map(doc => {
        const { name, telefone } = doc.data();

        return{
          id: doc.id,
          name,
          telefone
        }
      })
      setReserva(data);
      setIsLoading(false);
    });
    return subscriber
  }, [])
  return (
    <VStack flex={1} pb={6} bg={'black'}>
      <HStack>
        <Header 
          title='Relatorio de Reservas'
        />
      </HStack>

      <VStack flex={1} px={6} mt={5}>
        <Text color="white" textAlign='right'>
          {reserva.length }
        </Text>
          { isLoading ? <Loading /> :
            <FlatList
              data={reserva}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Reservas data={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              ListEmptyComponent={()=> (
                <Center>
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                      Não existe reservas
                  </Text>
                </Center>
              )}
            />
          }
      </VStack>
    </VStack>
  );
}