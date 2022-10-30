import React from 'react';
import { Pressable, IPressableProps, Text, VStack } from 'native-base';

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
    <VStack>
        <Text>
            {data.name}
        </Text>
    </VStack>
    </Pressable>
  );
}