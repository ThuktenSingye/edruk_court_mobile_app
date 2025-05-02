import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import UploadIcon from '../../assets/icons/Cases/UploadIcon'; // Make sure this path is correct

interface Props {
  fileName?: string;
  onPress: () => void;
}

export default function UploadDocumentCard({fileName, onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <UploadIcon />
        <Text style={styles.label}>
          {fileName ? fileName : 'Upload Document'}
        </Text>
      </View>
      <Text style={styles.hint}>PDF only, Max size 5 MB</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6EAD8',
    borderRadius: 8,
    padding: 14,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000', // or COLORS.textPrimary
  },
  hint: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
