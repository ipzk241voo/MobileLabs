import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <Text style={styles.title}>Вишневський Олексій Олександрович (ІПЗк-24-1)</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "gray",
    textAlign: "center",
    backgroundColor: "lightgray"
  },
});
