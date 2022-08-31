export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: { usersId: string};
            singUp: undefined;
            checkIn: { usersId: string };
            events: { usersId: string;};  
            eventAdm: undefined;
            homeAdm: undefined;
            newEvent: undefined;
            newReserva: {eventoId: string};
            Relatorio: { eventoId };
            app: { usersId: string }
            index: {usersId: string}
            eventoDetails: {eventoId: string}
            eventoRelatorio: undefined;
        }
    }
}