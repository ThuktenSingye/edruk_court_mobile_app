import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES, SHADOWS} from '../../constant/designTokens';

interface Props {
  title: string;
  description: string;
}

export default function NotificationCard({title, description}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Text style={styles.read}>Mark as read</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.dismiss}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: SIZES.medium,
    borderRadius: SIZES.large,
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    marginBottom: 6,
  },
  description: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  read: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  dismiss: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
});
