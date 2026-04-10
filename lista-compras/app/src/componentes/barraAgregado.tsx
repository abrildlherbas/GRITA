import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const BarraAgregado = ({
  alPresionarElBotonAgregar,
}: {
  alPresionarElBotonAgregar: (name: string) => void;
}) => {
  const [text, setText] = useState("");

  return (
    <View style={styles.inputRow}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Agregar producto (ej: Leche)"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={() => alPresionarElBotonAgregar(text)}
      />

      <Pressable
        style={styles.addBtn}
        onPress={() => alPresionarElBotonAgregar(text)}
      >
        <Text style={styles.addTxt}>Agregar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 12 },
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: { color: "#fff", fontWeight: "600" },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowText: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  pill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "700",
  },
  pillTodo: { backgroundColor: "#eee", color: "#666" },
  pillDone: { backgroundColor: "#2ecc71", color: "#fff" },
  sep: { height: 1, backgroundColor: "#eee" },
  empty: { textAlign: "center", color: "#777", marginTop: 24 },
});

export default BarraAgregado;
