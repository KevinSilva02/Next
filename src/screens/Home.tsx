import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { HStack, IconButton, useTheme, VStack, Image, FlatList, Text, Center} from 'native-base';

import { Card } from '../components/Card';
import { User, UserProps } from '../components/User';
import { Loading } from '../components/Loading';

import { ChatTeardropText, SignOut, Wheelchair } from 'phosphor-react-native';

import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestone from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { UserFirestoreDTO } from '../DTOs/UserFirestoreDTO';


export function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserProps[]>([]);
    const [email, setEmail] = useState('');
    const [ usuario, setUsuario] = useState<UserProps>({} as UserProps);
   
    const { colors } = useTheme();
    const navigation = useNavigation();

    const users = firebase.auth().currentUser;

    useEffect(()=> {
        if(users.email == null){
            setEmail('')
        }else{
            setEmail(users.email)
        }
        setIsLoading(true)

        const subscriber = firestone()
        .collection('users')
        .where('email', '==', email)
        .onSnapshot(snapshot =>{
            const data = snapshot.docs.map(doc => {
                const { usuario, tipo, email, lar } = doc.data();

                return {
                    id: doc.id,
                    usuario,
                    email,
                    tipo,
                    lar
                }
            })
            setUser(data)
            setIsLoading(false)
            
        });

    })

    function handleLogOut(){
        auth()
        .signOut()
        .catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possivel sair');
        }
        )
    }

    function handleMeuLar(usersId: string){
        navigation.navigate('meuLar', { usersId });
    }

    function handleLaresSalvacao(usersId: string){
        navigation.navigate('larSalvacao', { usersId });
    }

    function handleRelatorio(title: string, usersId: string ){
        navigation.navigate('relatorio', {title, usersId});
    }

    return (
    <VStack flex={1} pb={6} bg="gray.600" alignItems="center">
        
        <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        justifyItems="center"
        bg="black"
        mt={-6}
        pb={5}
        px={6}
        >
            <Image source={require('../assents/novo.png')} alt="next" mt={24} />
            <IconButton 
                icon={<SignOut size={26} color={colors.gray[300]} />}
                mt={20}
                onPress={handleLogOut}
            />
        </HStack>
        <HStack alignItems="center" >
            
            <FlatList
                  data={user}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => <Card data={item} title='Lares de Salvacao'
                  onPress={()=> handleLaresSalvacao(item.id)}
                  mt={10}/>}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: 100}}
                />
            <FlatList
                  data={user}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => <Card data={item} title='Meu lar de salvacao'
                  onPress={()=> handleMeuLar(item.lar)}
                  mt={10}/>}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: 100}}
                />
            
        </HStack>
        <HStack>
            <FlatList
                data={user}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Card data={item} title='Relatórios'
                onPress={()=> handleRelatorio(item.lar,item.id)}
                mt={10}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
                />
        </HStack>
    </VStack>
     
)};