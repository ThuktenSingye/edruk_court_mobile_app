import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from '@rneui/themed';
import MainLayout from '../../components/common/MainLayout';
import {COLORS} from '../../constant/designTokens';

export default function DefendentInfoScreen() {
  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.header}>Defendent Info</Text>
        <Card containerStyle={styles.card}>
          <Info label="Name" value="Yeshi Dorji" />
          <Info label="CID" value="11501000756" />
          <Info label="Phone" value="17584256" />
          <Info label="Email" value="yeshi@email.bt" />
          <Info label="Address" value="Wangdue" />
        </Card>
      </View>
    </MainLayout>
  );
}

const Info = ({label, value}: {label: string; value: string}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});
