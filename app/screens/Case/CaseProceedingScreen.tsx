// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import MainLayout from '../../components/common/MainLayout';
// import {COLORS, FONTS} from '../../constant/designTokens';
// import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useCaseHearings} from '../../hooks/useCaseHearings'; // Import the hook
// import Icon from 'react-native-vector-icons/Ionicons';

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'CaseProceedingScreen'
// >;

// type RootStackParamList = {
//   CaseProceedingScreen: undefined;
//   CaseProceedingDetail: {
//     title: string;
//     hearing: any; // Replace 'any' with a defined Hearing type if available
//     caseId: number;
//   };
// };

// export default function CaseProceedingScreen() {
//   const navigation = useNavigation<NavigationProp>();
//   const route =
//     useRoute<RouteProp<RootStackParamList, 'CaseProceedingScreen'>>();
//   const {caseId} = route.params;
//   const {data: caseProceedings, isLoading, error} = useCaseHearings(caseId);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const renderItem = ({item}: any) => (
//     <View style={styles.rowContainer}>
//       <View style={styles.stepperContainer}>
//         <View style={styles.stepperLine} />
//         <View style={styles.stepperIconContainer}>
//           <Icon name="radio-button-on" size={16} color={COLORS.primary} />
//         </View>
//       </View>
//       <TouchableOpacity
//         style={styles.itemContainer}
//         onPress={() =>
//           navigation.navigate('CaseProceedingDetail', {
//             title: item.hearing_type,
//             hearing: item,
//             caseId: caseId,
//           })
//         }>
//         <Text style={styles.itemTitle}>{item.hearing_type}</Text>
//         <Text style={styles.itemSubtitle}>{item.hearing_status}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (isLoading) {
//     return (
//       <MainLayout>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </MainLayout>
//     );
//   }

//   if (error) {
//     return (
//       <MainLayout>
//         <Text style={styles.errorText}>Error fetching case proceedings</Text>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Case Proceedings</Text>
//         <FlatList
//           data={caseProceedings}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//     </MainLayout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   heading: {
//     fontSize: 20,
//     fontFamily: FONTS.bold,
//     marginBottom: 16,
//     color: COLORS.primary,
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 10,
//   },
//   stepperContainer: {
//     width: 24,
//     alignItems: 'center',
//     marginRight: 12,
//     marginTop: 8,
//     position: 'relative',
//   },
//   stepperLine: {
//     position: 'absolute',
//     width: 2,
//     backgroundColor: COLORS.primary,
//     top: 24,
//     bottom: -34,
//     left: 11,
//   },
//   stepperIconContainer: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//   },
//   itemContainer: {
//     flex: 1,
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     elevation: 4,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontFamily: FONTS.medium,
//     color: COLORS.textPrimary,
//   },
//   itemSubtitle: {
//     fontSize: 12,
//     fontFamily: FONTS.regular,
//     color: COLORS.textSecondary,
//     marginTop: 4,
//   },
//   errorText: {
//     fontSize: 16,
//     fontFamily: FONTS.regular,
//     color: COLORS.error,
//     textAlign: 'center',
//   },
// });

import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCaseHearings} from '../../hooks/useCaseHearings'; // Import the hook
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from '@rneui/themed';
import EyeIcon from '../../assets/icons/Cases/EyeIcon';
import StatusIcon from '../../assets/icons/Cases/StatusIcon';

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
                  <Text style={styles.viewMore}>View More</Text>
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
      <Text style={styles.pageTitle}>Case Proceeding</Text>
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
