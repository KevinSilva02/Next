import React, { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';

import { Loading } from '../components/Loading';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { useNavigation } from '@react-navigation/native';
import firestone from '@react-native-firebase/firestore';
import { Header } from '../components/Header';

export function RegisterMember() {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [lar, setLar] = useState('');

    const navigation = useNavigation();

    function handleCreateMember(){
        if(!name || !telefone){
            Alert.alert('Membro', 'Preencha todos  os campos')
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
            Alert.alert('Membro', 'Membro cadastrado com sucesso');
            navigation.goBack();
        })
        .catch(erro => {
            console.log(erro);
            setIsLoading(false)
            return Alert.alert('Membro', 'Não foi possivel cadastrar o membro')
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