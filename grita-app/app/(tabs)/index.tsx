import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [aplausos, setAplausos] = useState<number>(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [ultimoAplauso, setUltimoAplauso] = useState<number>(0);

  const frases = [
    "Aplaudí para empezar 👏",
    "Bien ahí 👏",
    "Seguí así 🔥",
    "No pares ahora 💪",
    "Vas excelente 😎",
    "Se nota el esfuerzo 🚀",
    "Cada vez mejor 💯",
    "Imparable 🔥",
    "Estás creciendo 🌱",
    "Nada te frena 😎",
    "Sos constancia pura 💪",
    "Nivel pro 🚀",
    "Ya sos crack 😎",
    "Casi leyenda 👑",
    "Nivel leyenda 👑",
  ];

  const obtenerFrase = () => {
    return frases[aplausos] || "¡Sos una máquina! 🚀";
  };

  useEffect(() => {
    iniciarMicrofono();

    return () => {
      detenerMicrofono();
    };
  }, []);

  const iniciarMicrofono = async () => {
    try {
      await Audio.requestPermissionsAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });

      // 🔥 IMPORTANTE: frecuencia de actualización
      recording.setProgressUpdateInterval(100);

      recording.setOnRecordingStatusUpdate((data: any) => {
        console.log("Nivel sonido:", data.metering);

        const ahora = Date.now();

        // 🔥 detectar aplauso
        if (
          data.metering &&
          data.metering > -30 &&
          ahora - ultimoAplauso > 10
        ) {
          console.log("👏 APLAUSO DETECTADO");

          setAplausos((prev) => prev + 1);
          setUltimoAplauso(ahora);
        }
      });

      setRecording(recording);
    } catch (error) {
      console.log("Error micrófono:", error);
    }
  };

  const detenerMicrofono = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador de Aplausos 👏</Text>

      <Text style={styles.contador}>{aplausos}</Text>

      <Text style={styles.frase}>{obtenerFrase()}</Text>

      <Text style={{ marginTop: 20 }}>Aplaudí cerca del micrófono 🎤</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3ecf5",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contador: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  frase: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
});
