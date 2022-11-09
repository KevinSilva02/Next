import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useToast, VStack } from 'native-base';

import { Loading } from '../components/Loading';
import { Input } from '../components/Input';
import { Button } from '../components/ButtonHome';

import { useNavigation } from '@react-navigation/native';
import firestone from '@react-native-firebase/firestore';
import { Header } from '../components/Header';

export function RegisterMember() {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [lar, setLar] = useState('');

    const navigation = useNavigation();
    const toast = useToast();

    function handleCreateMember(){
        if(!name || !telefone){
            toast.show({
                title:'Informe o nome e telefone',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        setIsLoading(true)

        firestone()
        .collection('Member')
        .add({
            name,
            telefone,
            lar
        })
        .then(()=>{
            toast.show({
                title: 'Membro adicionado com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })
            navigation.goBack();
        })
        .catch(erro => {
            console.log(erro);
            setIsLoading(false)
            return toast.show({
                title:'Não foi possivel cadastra o membro',
                placement: 'top',
                bgColor: 'red.500'
            })
        })
    }
  return (
    <VStack>
        <Header 
            title='Cadastra membro'
        />
        <Input 
            placeholder='Nome Membro'
            mt={4}
            onChangeText={setName}
        />
        <Input 
            placeholder='Telefone Membro'
            mt={4}
            onChangeText={setTelefone}
        />
        <Input 
            placeholder='Nome Lar'
            mt={4}
            onChangeText={setLar}
        />
        <Button 
            title='Cadastrar'
            isLoading={isLoading}
            onPress={handleCreateMember}
        />
    </VStack>
  );
}