import { HStack, useTheme, VStack, Text, Pressable, IPressableProps, TextArea } from 'native-base';
import { Button } from './Button';
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
    <VStack>
      <Text>
        Nome Lar: {data.title}
      </Text>
      <Text>
        Nome anfitriao: {data.nameAnfitriao}
      </Text>
      <Text>
        Endereco: {data.endereco}
      </Text>
      <Text>
        Nome Lider: {data.nameLider}
      </Text>
      <Text>
        Nome Vice: {data.nameVice}
      </Text>
    </VStack>
  );
}