import { Pressable,IPressableProps, Text, VStack } from 'native-base';

export type UserProps = {
    id: string;
    usuario: string;
    email: string;
    tipo: 'Lider' | 'Membro';
    lar: string;
}

type Props = IPressableProps & {
    data: UserProps;
}

export function User({data, ...rest}:Props) {
  return (
    <Pressable {...rest}>
    <VStack>
        <Text color="white" mt={20}>
            {data.usuario}
            {data.tipo}
        </Text>
    </VStack>
    </Pressable>
  );
}