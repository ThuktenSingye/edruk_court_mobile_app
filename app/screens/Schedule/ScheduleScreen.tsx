import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Card, Button} from '@rneui/themed';
import MainLayout from '../../components/common/MainLayout';
import {COLORS} from '../../constant/designTokens';

// Sample schedule data
const schedules = [
  {
    id: 'C10002',
    title: 'Preliminary Hearing',
    description:
      'You are required to come to p/ling court for preliminary hearing procedure on Wednesday',
    date: '21/09/24',
    room: 'Bench 1',
    venue: 'Phuentsholing Dungkhag court',
  },
  {
    id: 'C10003',
    title: 'Preliminary Hearing',
    description:
      'You are required to come to Thimphu court for final argument procedure on Friday',
    date: '25/09/24',
    room: 'Bench 3',
    venue: 'Thimphu District Court',
  },
];

export default function ScheduleScreen() {
  const renderCard = ({item}: {item: (typeof schedules)[0]}) => (
    <Card containerStyle={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.caseId}>{item.id}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Date & Time</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Bench / Court Room No</Text>
        <Text style={styles.value}>{item.room}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Venue</Text>
        <Text style={styles.value}>{item.venue}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Button
          title="Mark as read"
          type="clear"
          titleStyle={styles.buttonText}
          onPress={() => {}}
        />
        <Button
          title="Dismiss"
          type="clear"
          titleStyle={styles.buttonText}
          onPress={() => {}}
        />
      </View>
    </Card>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.header}>Schedule</Text>
        <FlatList
          data={schedules}
          keyExtractor={item => item.id}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 15,
  },
  caseId: {
    color: '#003366',
    fontSize: 13,
  },
  description: {
    color: COLORS.textPrimary,
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 18,
  },
  detailRow: {
    marginBottom: 8,
  },
  label: {
    color: '#003366',
    fontWeight: '600',
    marginBottom: 2,
    fontSize: 13,
  },
  value: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  buttonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
