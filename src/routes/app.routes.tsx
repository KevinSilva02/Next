import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Events } from "../screens/Events";
import { RegisterEvent } from "../screens/RegisterEvent";
import { RegisterReserva } from "../screens/RegisterReserva";
import { Relatorio } from "../screens/Relatorio";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="events" component={Events} />
      <Screen name="newEvent" component={RegisterEvent} />
      <Screen name="newReserva" component={RegisterReserva} />
      <Screen name="Relatorio" component={Relatorio} />
    </Navigator>
    
  );
}