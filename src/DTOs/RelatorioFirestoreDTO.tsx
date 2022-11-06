import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type RelatorioFirestoreDTO = {
    title: string;
    dataLar: string;
    visitante: string;
    quantidadeCriancas: string;
    quantidadeJovens: string;
}