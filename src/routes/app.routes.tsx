import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { LarSalvacao } from "../screens/LarSalvacao";
import { RegisterLar } from "../screens/RegisterLar";
import { MeuLar } from "../screens/MeuLar";
import { LarDetails } from "../screens/LarDetails";
import { RegisterMember } from "../screens/RegisterMember";
import { RegisterRelatorio } from "../screens/RegisterRelatorio";
import { Relatorio } from "../screens/Relatorio";
import { RelatorioDetails } from "../screens/RelatorioDetails";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="larSalvacao" component={LarSalvacao} />
      <Screen name="newLar" component={RegisterLar} />
      <Screen name="larDetails" component={LarDetails} />
      <Screen name="meuLar" component={MeuLar} />
      <Screen name="newMember" component={RegisterMember} />
      <Screen name="newRelatorio" component={RegisterRelatorio} />
      <Screen name="relatorio" component={Relatorio} />
      <Screen name="relatorioDetails" component={RelatorioDetails} />
    </Navigator>
    
  );
}