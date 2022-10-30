export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: { usersId: string};
            singUp: undefined;
            larSalvacao: { usersId: string;};  
            newLar: undefined;
            newMember: undefined;
            newRelatorio: { title: string};
            app: { usersId: string };
            index: {usersId: string};
            larDetails: {larId: string};
            meuLar: {usersId: string};
            relatorio: {title: string, usersId: string};
        }
    }
}