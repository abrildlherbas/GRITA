import useItem, { styles } from "@/hooks/useItem";
import { FlatList, Text, View } from "react-native";
import BarraAgregado from "../src/componentes/barraAgregado";
import Title from "../src/componentes/titulo";

export default function App() {
  const { items, addItem, renderItem } = useItem();

  return (
    <View style={styles.container}>
      <Title />

      <BarraAgregado alPresionarElBotonAgregar={addItem} />
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Sin productos. ¡Agregá el primero! 😊
          </Text>
        }
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}
