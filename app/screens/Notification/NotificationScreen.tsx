import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS, SIZES, SHADOWS} from '../../constant/designTokens';
import {useTranslation} from 'react-i18next';
import {useNotifications} from '../../hooks/useNotification';
import {Button} from '@rneui/themed';
import {getToken} from '../../utils/token';

export default function NotificationScreen() {
  const {data: initialNotifications, isLoading, error} = useNotifications();
  const {t} = useTranslation();
  const [notifications, setNotifications] = useState([]);

  // Sync notifications state with fetched data
  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications]);

  const handleClick = async (id: number) => {
    const url = `http://10.2.35.53:3001/api/v1/notifications/${id}/mark_as_read`;
    const token = await getToken();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        // Remove the notification from the state after marking as read
        setNotifications(prevNotifications =>
          prevNotifications.filter(notification => notification.id !== id),
        );
      } else {
        console.error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const renderNotification = ({item}: any) => {
    const caseNumber = item.params?.case?.case_number || 'N/A';
    const title = item.params?.case?.title || 'N/A';
    const hearingType = item.params?.hearing?.hearing_type_id || 'N/A';
    const scheduleDate = item.params?.hearing_schedule?.scheduled_date
      ? new Date(item.params.hearing_schedule.scheduled_date).toLocaleString()
      : 'N/A';
    const status = item.params?.hearing_schedule?.schedule_status || 'N/A';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardCaseNumber}>{`${t(
            'Case-No',
          )}: ${caseNumber}`}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardDetail}>{`${t(
            'hearing_type',
          )}: ${hearingType}`}</Text>
          <Text style={styles.cardDetail}>{`${t(
            'Schedule_date',
          )}: ${scheduleDate}`}</Text>
          <Text style={styles.cardDetail}>{`${t('status')}: ${status}`}</Text>
        </View>
        <Button
          title={t('mark_as_read')}
          icon={{
            name: 'eye',
            type: 'ionicon',
            color: 'white',
            size: 16,
          }}
          iconRight
          buttonStyle={styles.viewButton}
          titleStyle={styles.viewTitle}
          onPress={() => handleClick(item.id)}
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <MainLayout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Text style={styles.error}>{t('error_loading_notifications')}</Text>
      </MainLayout>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <MainLayout>
        <Text style={styles.noNotifications}>{t('no_notifications')}</Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>{t('notification')}</Text>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 80}}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    marginBottom: SIZES.small,
    color: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.small,
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  error: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    marginTop: SIZES.large,
    color: COLORS.error,
  },
  noNotifications: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    marginTop: SIZES.large,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: '#fff',
    padding: SIZES.medium,
    borderRadius: SIZES.large,
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    flex: 1,
    marginRight: SIZES.small,
  },
  cardCaseNumber: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  cardBody: {
    marginTop: SIZES.small,
  },
  cardDetail: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewTitle: {
    fontSize: 13,
    fontFamily: FONTS.medium,
  },
});
