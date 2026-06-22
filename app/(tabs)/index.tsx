import { StyleSheet } from 'react-native';
import styles from 'styles.css';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
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
