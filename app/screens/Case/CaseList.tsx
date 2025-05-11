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

export default function CaseList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CaseStackParamList>>();
  const {data: cases, isLoading, error} = useCaseList();

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
      <Text style={styles.header}>Case List</Text>
      <FlatList
        data={cases}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('CaseDetail', {caseId: item.id.toString()})
            }>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
            <View style={styles.bottomRow}>
              <Text style={styles.status}>Status: {item.case_status}</Text>
              <Text style={styles.link}>View More</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{paddingBottom: 40}}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: '#666',
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
});
