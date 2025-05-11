import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCaseHearings} from '../../hooks/useCaseHearings'; // Import the hook
import Icon from 'react-native-vector-icons/Ionicons';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CaseProceedingScreen'
>;

type RootStackParamList = {
  CaseProceedingScreen: undefined;
  CaseProceedingDetail: {
    title: string;
    hearing: any; // Replace 'any' with a defined Hearing type if available
    caseId: number;
  };
};

export default function CaseProceedingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const caseId = 6; // Replace with dynamic caseId
  const {data: caseProceedings, isLoading, error} = useCaseHearings(caseId);

  const renderItem = ({item}: any) => (
    <View style={styles.rowContainer}>
      <View style={styles.stepperContainer}>
        <View style={styles.stepperLine} />
        <View style={styles.stepperIconContainer}>
          <Icon name="radio-button-on" size={16} color={COLORS.primary} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('CaseProceedingDetail', {
            title: item.hearing_type,
            hearing: item,
            caseId: caseId,
          })
        }>
        <Text style={styles.itemTitle}>{item.hearing_type}</Text>
        <Text style={styles.itemSubtitle}>{item.hearing_status}</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <MainLayout>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Text style={styles.errorText}>Error fetching case proceedings</Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.heading}>Case Proceedings</Text>
        <FlatList
          data={caseProceedings}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 16,
    color: COLORS.primary,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  stepperContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
    marginTop: 8,
    position: 'relative',
  },
  stepperLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: COLORS.primary,
    top: 24,
    bottom: -34,
    left: 11,
  },
  stepperIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  itemContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
  },
  itemSubtitle: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  errorText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.error,
    textAlign: 'center',
  },
});
