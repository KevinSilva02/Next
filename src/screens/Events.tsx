import { useNavigation, useRoute } from '@react-navigation/native';
import { VStack, HStack, FlatList, Center, Text, useTheme } from 'native-base';
import { useEffect, useState } from 'react';

import firestone from '@react-native-firebase/firestore'

import { Button } from '../components/Button';
import { Event, EventProps } from '../components/Event';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { ChatTeardropText } from 'phosphor-react-native';
import { UserFirestoreDTO } from '../DTOs/UserFirestoreDTO';
import { UserProps } from '../components/Card';

type RouteParams = {
  usersId: string;
}


export function Events() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [event, setEvent] = useState<EventProps[]>([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { usersId } = route.params as RouteParams;

  function handleNewEvent(){
    navigation.navigate('newEvent')
  }
  function handleRelatorio(){
    navigation.navigate('Relatorio');
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
          title='Eventos'
        />
      </HStack>

      <VStack flex={1} px={6} mt={5}>
          { isLoading ? <Loading /> :
            <FlatList
              data={event}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Event data={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              ListEmptyComponent={()=> (
                <Center>
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                      Não existe eventos disponiveis
                  </Text>
                </Center>
              )}
            />
          }
          { user.tipo === 'Lider' && 
            <Button title='Novo evento' onPress={handleNewEvent} mb={3}/>
          }
          { user.tipo === 'Lider' && 
            <Button title='Relatorio' onPress={handleRelatorio} mt={3}/>
          }
      </VStack>
    </VStack>
  );
}