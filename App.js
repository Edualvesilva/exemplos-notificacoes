import { Button, StatusBar, StyleSheet, Text, View } from "react-native";

/* Importando os recursos para notificação */
import * as Notifications from "expo-notifications";

import { useState, useEffect } from "react";

/* Manipulador de eventos de notificações */
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
    /* Verificações/configurações de permissão de notificação
    exclusivas para iOS */
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
        },
      });
    }

    permissoesIos();

    /* Ouvinte de evento para notificações recebidas, ou seja,
    quando a notificação aparece no topo do app. */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dadas às notificações,
    ou seja, quando o usuário interage (toca) notificação. */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      /* Capturando os dados vindos à partir da notificação */
      setDados(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMensagem = async () => {
    /* Montando a mensagem que será enviada
    via sistema de notificação LOCAL */
    const mensagem = {
      title: "Lembrete! 😛",
      body: "Não se esqueça de estudar muito... senão, reprova! ☠",
      data: {
        usuario: "Chapolin Colorado 🤩",
        cidade: "São Paulo",
      },
    };

    /* Função de agendamento de notificações */
    await Notifications.scheduleNotificationAsync({
      // Conteudo da notificação
      content: mensagem,

      // acionador/disparador da notificação
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text>Exemplo de notificação local</Text>
        <Button title="Disparar notificação" onPress={enviarMensagem} />

        {dados && (
          <View style={{ marginVertical: 8, backgroundColor: "yellow" }}>
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
