import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type LarFirestoreDTO = {
  id: string;
  title: string;
  nameLider: string;
  nameVice: string;
  nameAnfitriao: string;
  endereco: string;
  telefone: string;
  dataNascimento: string;
}