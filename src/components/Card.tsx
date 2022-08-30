import { Button as ButtonNativeBase, IButtonProps,Pressable, IPressableProps  } from 'native-base';

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


export function Card({title, ...rest}: Props) {  
  return (
    <ButtonNativeBase
        h={150}
        w={160}
        ml={2}
        {...rest}
    >
        {title}
    </ButtonNativeBase>
  );
}