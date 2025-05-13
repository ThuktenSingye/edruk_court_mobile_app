import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCaseHearings} from '../../hooks/useCaseHearings';
import {Card} from '@rneui/themed';
import EyeIcon from '../../assets/icons/Cases/EyeIcon';
import StatusIcon from '../../assets/icons/Cases/StatusIcon';
import {useTranslation} from 'react-i18next';

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
  const route =
    useRoute<RouteProp<RootStackParamList, 'CaseProceedingScreen'>>();
  const {caseId} = route.params;
  const {data: caseProceedings, isLoading, error} = useCaseHearings(caseId);
  const [activeIndex, setActiveIndex] = useState(0);
  const {t} = useTranslation();

  const renderItem = ({item, index}: any) => (
    <>
      <View style={styles.itemContainer}>
        {/* Timeline dot */}
        <View style={styles.timelineColumn}>
          <View
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        </View>

        {/* Card */}
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => setActiveIndex(index)}
          activeOpacity={0.9}>
          <Card
            containerStyle={[
              styles.card,
              index === activeIndex && styles.selectedCard,
            ]}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.hearing_type}</Text>
              <Text style={styles.caseId}>ID: {item.id}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.cardFooter}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <StatusIcon status={item.hearing_status} />
                <Text style={styles.statusText}>{item.hearing_status}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CaseProceedingDetail', {
                    title: item.hearing_type,
                    hearing: item,
                    caseId: caseId,
                  })
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.viewMore}>{t('view_more')}</Text>
                  <EyeIcon />
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Divider line */}
      {index !== caseProceedings.length - 1 && (
        <View style={styles.cardDivider} />
      )}
    </>
  );

  return (
    <MainLayout>
      <Text style={styles.pageTitle}>{t('case_proceeding')}</Text>
      <View style={{flex: 1}}>
        <View style={styles.absoluteLine} />
        <FlatList
          data={caseProceedings}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 50}}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginBottom: 10,
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  timelineColumn: {
    width: 40,
    alignItems: 'center',
    zIndex: 2,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    zIndex: 999,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  absoluteLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#ccc',
    top: 5,
    bottom: 0,
    left: 18.5,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    shadowColor: '#000',
    elevation: 8,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: 50,
    marginVertical: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 15,
  },
  caseId: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: FONTS.medium,
    marginLeft: 5,
    fontSize: 12,
  },
  viewMore: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: 13,
    marginRight: 4,
  },
});
