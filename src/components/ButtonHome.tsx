import { Button as ButtonNativeBase, IPressableProps, Text } from 'native-base';

export type UserProps = {
  id: string;
  usuario: string;
  email: string;
  tipo: "Lider" | "Membro"
}

type Props = IPressableProps & {
  data: UserProps;
  title: string;
}
export function Button({title, ...rest}: Props) {
  return (
    <ButtonNativeBase
        bg="blue"
        w={350}
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{bg: "gray.500"}}
        { ...rest}

    >
      <Text textAlign="left" >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}