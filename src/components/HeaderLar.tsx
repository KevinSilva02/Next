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
        {data.title}
      </Text>
      <Text>
        {data.nameAnfitriao}
      </Text>
      <Text>
        {data.endereco}
      </Text>
      <Text>
        {data.nameLider}
      </Text>
      <Text>
        {data.nameVice}
      </Text>
    </VStack>
  );
}