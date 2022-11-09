import { HStack, useTheme, VStack, Text, Pressable, IPressableProps, TextArea } from 'native-base';
import { Button } from './ButtonHome';
import { useNavigation } from '@react-navigation/native';

export type HeaderProps = {
  id: string;
  title: string;
  nameLider: string;
  nameVice: string;
  nameAnfitriao: string;
  endereco: string;
  telefone: string;
  dataNascimento: string;
}

type Props = IPressableProps & {
    data: HeaderProps;
}

export function HeaderLar({data, ...rest}) {
  
  return (
    <VStack flex={1} >
      <Text fontSize='md' textAlign='center' px={2} >
        {data.title}
      </Text>
      <HStack px={2}>
        <Text>
          Nome anfitriao: {data.nameAnfitriao}
        </Text>
        <Text px={2}>
          Endereco: {data.endereco}
        </Text>
      </HStack>
      <HStack>
        <Text px={2} >
          Nome Lider: {data.nameLider}
        </Text>
        <Text px={2}>
          Nome Vice: {data.nameVice}
        </Text>
      </HStack>
    </VStack>
  );
}