import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [aplausos, setAplausos] = useState(0);
  const [recording, setRecording] = useState(null);
  const [ultimoAplauso, setUltimoAplauso] = useState(0);

  const obtenerFrase = () => {
    if (aplausos === 0) return "Aplaudí para empezar 👏";
    if (aplausos < 5) return "Bien ahí 👏";
    if (aplausos < 10) return "¡Seguí así! 🔥";
    if (aplausos < 20) return "¡Impresionante! 😎";
    if (aplausos < 30) return "¡Sos una máquina! 🚀";
    return "¡Nivel leyenda! 👑";
  };

  useEffect(() => {
    iniciarMicrofono();
    return () => detenerMicrofono();
  }, []);

  const iniciarMicrofono = async () => {
    try {
      await Audio.requestPermissionsAsync();

      const { recording } = await Audio.Recording.createAsync(
        {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          isMeteringEnabled: true,
        },
        (data) => {
          const ahora = Date.now();

          // Detecta sonido fuerte + evita múltiples conteos seguidos
          if (data.metering > -20 && ahora - ultimoAplauso > 800) {
            setAplausos((prev) => prev + 1);
            setUltimoAplauso(ahora);
          }
        },
      );

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
