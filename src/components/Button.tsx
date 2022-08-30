import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
}
export function Button({title, ...rest}: Props) {
  return (
    <ButtonNativeBase
        bg="blue"
        h={14}
        fontSize="sm"
        rounded="sm"
        _pressed={{bg: "gray.500"}}
        { ...rest}
    >
        {title}
    </ButtonNativeBase>
  );
}