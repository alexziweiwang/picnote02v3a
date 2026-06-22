import { StyleSheet } from "react-native";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';


export default function HomeScreen() {
  return (
    <ThemedView
      style={{ 
        flex: 1, 
        backgroundColor: 'green',
        paddingTop: 100, 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingBottom: 20
      }}

    >
      <ThemedView style={style.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
          }}>
            My Notes</ThemedText>

      </ThemedView>

    </ThemedView>
  );
}
const style = StyleSheet.create({

  titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
  },

});