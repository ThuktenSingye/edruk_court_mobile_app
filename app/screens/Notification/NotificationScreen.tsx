import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS, SIZES, SHADOWS} from '../../constant/designTokens';
import {useTranslation} from 'react-i18next';
const notifications = [
  {
    id: '1',
    title: 'Notification Title',
    description:
      'This will be the main description of the notification messages...',
  },
  {
    id: '2',
    title: 'Notification Title',
    description:
      'This will be the main description of the notification messages...',
  },
];

export default function NotificationScreen() {
  const {t} = useTranslation();
  const renderNotification = ({item}: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Text style={styles.read}>{t('mark_as_read')}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.viewMore}>{t('view_more')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <MainLayout>
      <Text style={styles.title}>{t('notification')}</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 80}}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    marginBottom: SIZES.small,
  },
  card: {
    backgroundColor: '#fff',
    padding: SIZES.medium,
    borderRadius: SIZES.large,
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    marginBottom: 6,
  },
  cardDesc: {
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
  viewMore: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
});
