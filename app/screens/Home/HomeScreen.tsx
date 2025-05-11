import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Card, Text, Button, Icon} from '@rneui/themed';
import {COLORS, FONTS} from '../../constant/designTokens';
import MainLayout from '../../components/common/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabParamList} from '../../components/common/TabNavigator';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainStackParamList} from '../../types/navigation';
// import FileCaseIcon from '../../assets/icons/Cases/FileCaseIcon';
import {getToken} from '../../utils/token.ts';
// import useUserStore from '../../store/useUserStore.ts';
// import {User} from '../../types/user.ts';
import {useActiveCase} from '../../hooks/useActiveCase.ts';
import {Case} from '../../types/case.ts';
import {useQueryClient} from '@tanstack/react-query';
import {useUpcomingCases} from '../../hooks/useUpcomingCases';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<MainStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [token, setToken] = React.useState<string | null>(null);
  // const user: User | null = useUserStore(state => state.user);
  const {data: activeCases, isLoading, error} = useActiveCase();
  const queryClient = useQueryClient();
  const {
    data: upcomingCases,
    isLoading: isLoadingUpcoming,
    error: upcomingError,
  } = useUpcomingCases();

  useEffect(() => {
    async function loadToken() {
      const storedToken = await getToken();
      if (!storedToken) {
        Alert.alert('Authentication', 'No token found, please login again.');
        navigation.navigate('Login');
      }
      setToken(storedToken);
    }
    loadToken();
  }, [navigation, token]);

  const getCaseTypeColor = (caseItem: Case) => {
    switch (caseItem.case_status.toLowerCase()) {
      case 'active':
        return COLORS.primary;
      case 'pending':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Ongoing Case */}
        <Text style={styles.sectionTitle}>Ongoing Case</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Icon
              name="alert-circle-outline"
              type="ionicon"
              size={24}
              color="red"
            />
            <Text style={styles.errorText}>Failed to load cases</Text>
            <Text style={styles.errorDetailText}>
              {error instanceof Error
                ? error.message
                : 'Unknown error occurred'}
            </Text>
            <Button
              title="Retry"
              onPress={() => {
                queryClient.invalidateQueries({queryKey: ['activeCases']});
              }}
              buttonStyle={styles.retryButton}
            />
          </View>
        ) : activeCases && activeCases.length > 0 ? (
          activeCases.map(caseItem => (
            <Card containerStyle={styles.card} key={caseItem.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{caseItem.title}</Text>
                <Text style={styles.caseId}>
                  Case ID: {caseItem.registration_number}
                </Text>
              </View>
              <Text style={styles.cardDesc}>{caseItem.summary}</Text>
              <View style={styles.cardFooter}>
                <Text
                  style={[
                    styles.caseType,
                    {color: getCaseTypeColor(caseItem)},
                  ]}>
                  {caseItem.case_status}
                </Text>
                <Button
                  title="View More"
                  icon={{
                    name: 'eye',
                    type: 'ionicon',
                    color: 'white',
                    size: 16,
                  }}
                  iconRight
                  buttonStyle={styles.viewButton}
                  titleStyle={styles.viewTitle}
                  onPress={() => {
                    navigation.navigate('Case', {
                      screen: 'CaseDetail',
                      params: {caseId: caseItem.id},
                    });
                  }}
                />
              </View>
            </Card>
          ))
        ) : (
          <Text style={styles.noCasesText}>No ongoing cases found</Text>
        )}

        {/* Upcoming Hearing */}
        <Text style={styles.sectionTitle}>Upcoming Hearing</Text>
        {isLoadingUpcoming ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : upcomingError ? (
          <View style={styles.errorContainer}>
            <Icon
              name="alert-circle-outline"
              type="ionicon"
              size={24}
              color="red"
            />
            <Text style={styles.errorText}>
              Failed to load upcoming hearings
            </Text>
            <Text style={styles.errorDetailText}>
              {upcomingError instanceof Error
                ? upcomingError.message
                : 'Unknown error occurred'}
            </Text>
            <Button
              title="Retry"
              onPress={() => {
                queryClient.invalidateQueries({queryKey: ['upcomingCases']});
              }}
              buttonStyle={styles.retryButton}
            />
          </View>
        ) : upcomingCases && upcomingCases.length > 0 ? (
          upcomingCases.map(hearing => (
            <Card containerStyle={styles.card} key={hearing.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{hearing.case_title}</Text>
                <Text style={styles.caseId}>
                  {hearing.case_number || `Hearing ID: ${hearing.id}`}
                </Text>
              </View>
              <Text style={styles.cardDesc}>
                {hearing.hearing_type_name} - {hearing.hearing_status}
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.timeRow}>
                  <Icon name="calendar-outline" type="ionicon" size={14} />
                  <Text style={styles.timeText}>
                    {formatDate(hearing.scheduled_date)}
                  </Text>
                </View>
                <Button
                  title="View More"
                  icon={{
                    name: 'eye',
                    type: 'ionicon',
                    color: 'white',
                    size: 16,
                  }}
                  iconRight
                  buttonStyle={styles.viewButton}
                  titleStyle={styles.viewTitle}
                  onPress={() => {
                    // Navigate to hearing details
                    navigation.navigate('CaseDetails', {caseId: hearing.id});
                  }}
                />
              </View>
            </Card>
          ))
        ) : (
          <Text style={styles.noCasesText}>No upcoming hearings found</Text>
        )}

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>Quick Link</Text>
        <View style={styles.quickLinkRow}>
          <QuickLinkButton
            label="File Case"
            icon="folder-outline"
            onPress={() =>
              navigation.navigate('Case', {
                screen: 'FileCase',
              })
            }
          />
          <QuickLinkButton
            label="Schedule"
            icon="calendar-outline"
            onPress={() => navigation.navigate('Schedule')}
          />
          <QuickLinkButton
            label="Case Progress"
            icon="timer-outline"
            onPress={() => {
              // You can link to a future CaseProgress screen
              console.log('Navigate to Case Progress');
            }}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
}

// Reusable Quick Link button
const QuickLinkButton = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.quickCard}>
    <Icon name={icon} type="ionicon" size={26} />
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginLeft: 12,
    marginVertical: 10,
  },
  card: {
    borderRadius: 16,
    elevation: 6,
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  caseId: {
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  cardDesc: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
  },
  caseType: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
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
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  quickLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  quickCard: {
    width: 100,
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  quickLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  errorDetailText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  noCasesText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: FONTS.medium,
  },
});
