import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Text, Button, Icon} from '@rneui/themed';
import {COLORS, FONTS} from '../../constant/designTokens';
import MainLayout from '../../components/common/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabParamList} from '../../components/common/TabNavigator';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainStackParamList} from '../../types/navigation';
import FileCaseIcon from '../../assets/icons/Cases/FileCaseIcon';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<MainStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Ongoing Case */}
        <Text style={styles.sectionTitle}>Ongoing Case</Text>
        {[
          {title: 'Family Dispute', type: 'Civil', typeColor: COLORS.primary},
          {title: 'Land Disputes', type: 'Criminal', typeColor: 'brown'},
        ].map((item, i) => (
          <Card containerStyle={styles.card} key={i}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.caseId}>Case ID</Text>
            </View>
            <Text style={styles.cardDesc}>
              This is caseer slnfsdf fsdofnsd ofsd dsf dfs fdsfds fdds . .
            </Text>
            <View style={styles.cardFooter}>
              <Text style={[styles.caseType, {color: item.typeColor}]}>
                {item.type}
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
              />
            </View>
          </Card>
        ))}

        {/* Upcoming Hearing */}
        <Text style={styles.sectionTitle}>Upcoming Hearing</Text>
        <Card containerStyle={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Preliminary Hearing</Text>
            <Text style={styles.caseId}>Case ID</Text>
          </View>
          <Text style={styles.cardDesc}>
            This is caser slnfsdf fsdofnsd ofsd dsf dfs fdsfds fdds . .
          </Text>

          <View style={styles.cardFooter}>
            <View style={styles.timeRow}>
              <Icon name="calendar-outline" type="ionicon" size={14} />
              <Text style={styles.timeText}>10:30 AM, 20th Dec 2024</Text>
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
            />
          </View>
        </Card>

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
});
