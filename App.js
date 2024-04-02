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
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      setDados(resposta.notification.request.content.data);
      //console.log("Resposta: " + resposta);
    });
  }, []);

  const enviarMensagem = async () => {
    /* Montando a mensagem que será enviada via sistema de notificação LOCAL */
    const mensagem = {
      title: "Lembrete!",
      body: "Sou uma notificação daora",
      data: {
        usuario: "Chapolin",
        cidade: "São Paulo",
      },
    };

    /* Função de agendamento de notificações */
    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 2 },
    });
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text>Exemplo de Notificação Local</Text>
        <Button title="Disparar Notificação" onPress={enviarMensagem} />
        {dados && (
          <View>
            <Text>Usuário: {dados.usuario}</Text>
            <Text>Cidade: {dados.cidade}</Text>
          </View>
        )}
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
