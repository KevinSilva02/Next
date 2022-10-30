import React from 'react';
import { IPressableProps, Pressable, Text, VStack } from 'native-base';

export type RelatorioProps = {
    id: string;
    title: string;
    dataLar: string;
    quantidadeJovens: number;
    quantidadeCriancas: number;
    visitantes: number;
}

type Props = IPressableProps & {
    data: RelatorioProps;
}

export function CardRelatorio({data, ...rest}:Props) {
  return (
    <Pressable {...rest}>    
    <VStack>
        <Text>
            Nome Lar: {data.title}
        </Text>
        <Text>
            Data do Lar: {data.dataLar}
        </Text>
        <Text>
            Nº joves: {data.quantidadeJovens}
        </Text>
        <Text>
            Nº criancas: {data.quantidadeCriancas}
        </Text>
        <Text>
            Nº Visitantes: {data.visitantes}
        </Text>
    </VStack>
    </Pressable>
  );
}