import React from 'react';
import { Pressable, IPressableProps, Text, HStack } from 'native-base';

export type MemberProps = {
    id: string;
    name: string;
    telefone: string;
    lar: string;
}

type Props = IPressableProps & {
  data: MemberProps;
}

export function CardMember({data, ...rest}:Props) {
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
            {data.name}
        </Text>
        <Text>
            {data.telefone}
        </Text>
    </HStack>
    </Pressable>
  );
}