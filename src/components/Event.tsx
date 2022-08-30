import { HStack, useTheme, VStack, Text, Pressable, IPressableProps } from 'native-base';
import { Button } from './Button';
import { useNavigation } from '@react-navigation/native';
export type EventProps = {
  id: string;
  title: string;
  date: string;
  description: string;
}

type Props = IPressableProps & {
    data: EventProps;
}

export function Event({data, ...rest}:Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleReserva(){
    navigation.navigate('newReserva')
  }

  return (
    <Pressable {...rest} >
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
        <HStack alignItems="center" mb={4}  justifyContent="space-between">
            <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                {data.title}
            </Text>
            <Text>
              {data.date}
            </Text>
            <Button title='reservar' onPress={handleReserva}  />
        </HStack>
    </VStack>
    </Pressable>
  );
}