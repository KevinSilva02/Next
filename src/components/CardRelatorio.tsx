import React from 'react';
import { IPressableProps, Pressable, Text, HStack } from 'native-base';

export type RelatorioProps = {
    id: string;
    title: string;
    dataLar: string;
    quantidadeJovens: string;
    quantidadeCriancas: string;
    visitante: string;
}

type Props = IPressableProps & {
    data: RelatorioProps;
}

export function CardRelatorio({data, ...rest}:Props) {
  return (
    <Pressable {...rest}>    
    <HStack
        bgColor="gray.400" 
        w="full"
        h={20}  
        borderBottomWidth={3}
        borderBottomColor="blue.500"
        justifyContent="space-around"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
    >
        <Text>
            {data.title}
        </Text>
        <Text>
            Data: {data.dataLar}
        </Text>
    </HStack>
    </Pressable>
  );
}