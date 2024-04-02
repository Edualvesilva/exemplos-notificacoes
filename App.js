import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useState, useEffect } from "react";

/* Manipulador de Eventos de notificações */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: { allowAlert: true, allowBadge: true, allowSound: true },
      });
    }
    permissoesIos();

    /* Ouvinte de evento para as notificações recebidas,ou seja, quando a notificação aparece no topo do app */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dadas às notificações , ou seja, quando o usuário interage (toca)  */
    Notifications.addNotificationReceivedListener((resposta) => {
      resposta;
    });
  }, []);
  const enviarMensagem = () => {};

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text>Exemplo de Notificação Local</Text>
        <Button title="Disparar Notificação" onPress={enviarMensagem} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
