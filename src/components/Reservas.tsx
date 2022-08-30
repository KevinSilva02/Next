import React from 'react';
import { IPressableProps, Pressable, VStack, HStack, Text } from 'native-base';

export type ReservaProps = {
    id: string;
    name: string;
    telefone: string
}
type Props = IPressableProps & {
    data: ReservaProps
}


export function Reservas({data, ...rest}:Props) {

  return (
    <Pressable {...rest}>
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
        <HStack alignItems="center" mb={4}  justifyContent="space-between">
            <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                {data.name}
            </Text>
            <Text>
              {data.telefone}
            </Text>
        </HStack>
    </VStack>
    </Pressable>
  );
}