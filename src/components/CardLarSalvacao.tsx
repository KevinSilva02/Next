import { HStack, useTheme, VStack, Text, Pressable, IPressableProps } from 'native-base';
import { Button } from './ButtonHome';
import { useNavigation } from '@react-navigation/native';

export type LarProps = {
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
    data: LarProps;
}

export function CardLarSalvacao({data, ...rest}:Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  

  return (
    <Pressable {...rest} >
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
        <HStack alignItems="center" mb={4}  justifyContent="space-between">
            <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                {data.title}
            </Text>
            
        </HStack>
    </VStack>
    </Pressable>
  );
}