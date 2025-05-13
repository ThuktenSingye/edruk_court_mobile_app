import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CaseStackParamList} from '../../types/navigation';
import MainLayout from '../../components/common/MainLayout';
import {useCaseList} from '../../hooks/useCaseList';
import {COLORS} from '../../constant/designTokens';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constant/designTokens';
import {Button, Card} from '@rneui/themed';

export default function CaseList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CaseStackParamList>>();
  const {data: cases, isLoading, error} = useCaseList();
  const {t} = useTranslation();

  if (isLoading) {
    return (
      <MainLayout>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error loading cases</Text>
          <Text style={styles.errorDetails}>
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.heading}>{t('cases')}</Text>
        <FlatList
          data={cases}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Card containerStyle={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.summary}>{item.summary}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.status}>{item.case_status}</Text>
                <Button
                  title={t('view_more')}
                  icon={{
                    name: 'eye',
                    type: 'ionicon',
                    color: 'white',
                    size: 16,
                  }}
                  iconRight
                  buttonStyle={styles.viewButton}
                  titleStyle={styles.viewTitle}
                  onPress={() =>
                    navigation.navigate('CaseDetail', {case: item})
                  }
                />
              </View>
            </Card>
          )}
          contentContainerStyle={{paddingBottom: 40}}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    // margin: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 8,
  },
  heading: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    marginHorizontal: 12,
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  link: {
    color: 'green',
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 8,
  },
  errorDetails: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
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
