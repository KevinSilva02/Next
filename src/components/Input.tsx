import { Input as NativeBaseInput ,IInputProps } from 'native-base';

export function Input({ ...rest}: IInputProps) {
  return (
    <NativeBaseInput 
        bg="gray.700"
        h={14}
        size="md"
        color="white"
        placeholderTextColor="gray.300"
        _focus={{
            borderWidth: 1,
            borderColor: "blue",
            bg: "gray.700"
        }}
        { ...rest}
    />

  );
}