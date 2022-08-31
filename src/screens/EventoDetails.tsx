import React, { useState } from 'react';
import { VStack } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../components/Button';

type RouteParams = {
    eventoId: string;
}

export function EventoDetails() {
    const navigation = useNavigation();
    const routes = useRoute();
    
    const { eventoId } = routes.params as RouteParams;

    
    function handleReserva(eventoId:string){
        navigation.navigate('newReserva', {eventoId})
      }
  return (
    <VStack>
        <Button title='reservar' onPress={()=>handleReserva(eventoId)} mt={250} />
    </VStack>
  );
}