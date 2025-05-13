import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Card} from '@rneui/themed';
import MainLayout from '../../components/common/MainLayout';
import {COLORS} from '../../constant/designTokens';
import {useSchedule} from '../../hooks/useSchedule';
import {useTranslation} from 'react-i18next';

export default function ScheduleScreen() {
  const {data: schedules, isLoading, error} = useSchedule();
  const {t} = useTranslation();

  const renderCard = ({item}: {item: any}) => (
    <Card containerStyle={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.cardTitle}>{item.hearing_type_name}</Text>
        <Text style={styles.caseId}>{item.id || 'N/A'}</Text>
      </View>

      <Text style={styles.description}>{item.case_title}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Date & Time</Text>
        <Text style={styles.value}>
          {new Date(item.scheduled_date).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{item.hearing_status}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Scheduled By</Text>
        <Text
          style={
            styles.value
          }>{`${item.scheduled_by.first_name} ${item.scheduled_by.last_name}`}</Text>
      </View>
    </Card>
  );

  if (isLoading) {
    return (
      <MainLayout>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <View style={styles.container}>
          <Text style={styles.errorText}>Failed to load schedules</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.header}>{t('schedule')}</Text>
        <FlatList
          data={schedules}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    margin: 0,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
