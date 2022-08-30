import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type UserFirestoreDTO = {
    usuario: string;
    tipo: "Lider" | "Membro";
    email: string;
}