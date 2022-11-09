import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { HStack, IconButton, useTheme, VStack, Image, Text, Center, FlatList} from 'native-base';

import { UserProps } from '../components/User';
import { Loading } from '../components/Loading';
import { Button } from '../components/ButtonHome';

import {  SignOut } from 'phosphor-react-native';

import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestone from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

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
            return(subscriber)
        });
        setIsLoading(false)
    })

    function handleLogOut(){
        auth()
        .signOut()
        .catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possivel sair');
        })
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

    if(isLoading){
        return <Loading />
    }
    

    return (
    <VStack flex={1} pb={7} bg="gray.900" >
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
            <Text fontFamily="heading" fontSize={24} p={5} mt={20} >Lar Salvação</Text>
            
            <IconButton 
                icon={<SignOut size={26} color={colors.gray[300]} />}
                mt={20}
                onPress={handleLogOut}
            />
        </HStack>
        <VStack flex={1} >
            <Center>
                <FlatList 
                    data={user}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Button title='Lares de salvacao' data={item} onPress={()=> handleLaresSalvacao(item.id)} />}
                    contentContainerStyle={{ padding: 20, marginTop: 5 }}
                />
                <FlatList 
                    data={user}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Button title='Meu lar' data={item} onPress={()=>handleMeuLar(item.lar)}  />}
                    contentContainerStyle={{padding: 20, marginTop: 5}}
                />
                <FlatList 
                    data={user}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Button title='Relatorios'  data={item} onPress={()=> handleRelatorio(item.lar,item.id)}  />}
                    contentContainerStyle={{padding: 20, marginTop: 5}}
                />
            </Center>
        </VStack>
        <Center>
            <Image source={require('../assets/logo_ieq.png')} alt="next"  w={12} h={12} />
        </Center>    
       

        
    </VStack>
     
)};
