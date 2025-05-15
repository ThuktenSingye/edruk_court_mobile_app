import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text as RNText,
  TouchableOpacity,
} from 'react-native';
import {Text} from '@rneui/themed';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
// import {useQuery} from '@tanstack/react-query';
// import {getToken} from '../../utils/token';
import {useProfile} from '../../hooks/useProfile';
import useUserStore from '../../store/useUserStore';
import {User} from '../../types/user';
import {useTranslation} from 'react-i18next';
import {SIZES} from '../../constant/designTokens';
import {ImageBackground, Image} from 'react-native';
import backgroundImage from '../../assets/images/background.png'

const AddressIcon = () => (
  <View style={styles.iconBox}>
    <RNText style={{fontSize: 24, color: COLORS.primary}}>🏠</RNText>
  </View>
);
const PhoneIcon = () => (
  <View style={styles.iconBox}>
    <RNText style={{fontSize: 24, color: COLORS.primary}}>📞</RNText>
  </View>
);
const CIDIcon = () => (
  <View style={styles.iconBox}>
    <RNText style={{fontSize: 24, color: COLORS.primary}}>🆔</RNText>
  </View>
);
const EditIcon = () => (
  <View style={styles.editIcon}>
    <RNText style={{fontSize: 16, color: COLORS.primary}}>✏️</RNText>
  </View>
);

interface ProfileData {
  id: number;
  avatar: {avatar: string};
  first_name: string;
  last_name: string;
  email?: string;
  present_address?: string;
  permanent_address?: string;
  cid_no: string;
  phone_number: string;
  gender?: string;
  age?: number;
}

export default function ProfileScreen() {
  const user: User | null = useUserStore(state => state.user);
  const {data, isLoading, error} = useProfile(user?.id.toString() || '0');
  const {t} = useTranslation();
  // const {data, isLoading, error} = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: async () => {
  //     const token = await getToken();
  //     if (!token) throw new Error('No authentication token found');
  //     const response = await fetch(
  //       'http://10.2.5.25:3001/api/v1/users/22/profile',
  //       {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(
  //         errorData.message || `HTTP error! status: ${response.status}`,
  //       );
  //     }
  //     const result = await response.json();
  //     return result.data as ProfileData;
  //   },
  // });

  if (isLoading) {
    return (
      <MainLayout>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </MainLayout>
    );
  }
  if (error) {
    return (
      <MainLayout>
        <View style={styles.container}>
          <Text>Error loading profile</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Green Header with curve */}
      <View style={styles.headerCurve}>
        <View style={styles.headerContent}>
          <View style={{flex: 1}}>
            <Text style={styles.name}>
              {data?.first_name} {data?.last_name}
            </Text>
            <Text style={styles.email}>{data?.email || ' '}</Text>
          </View>
          <View style={styles.avatarWrap}>
            {data?.avatar?.avatar ? (
              <Image source={{uri: data.avatar.avatar}} style={styles.avatar} />
            ) : (
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: COLORS.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={{color: '#fff', fontSize: 28, fontFamily: FONTS.bold}}>
                  {data?.first_name?.[0]}
                  {data?.last_name?.[0]}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editIconWrap}>
              <EditIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.profileContent}>
        {/* User Details Section */}
        <View style={styles.infoSection}>
          {/* Contact Number */}
          <View style={styles.infoRowBox}>
            <PhoneIcon />
            <View style={styles.infoTextBox}>
              <Text style={styles.label}>{t('contact_number')}</Text>
              <Text style={styles.infoValue}>{data?.phone_number}</Text>
            </View>
          </View>
          {/* CID */}
          <View style={styles.infoRowBox}>
            <CIDIcon />
            <View style={styles.infoTextBox}>
              <Text style={styles.label}>{t('cid')}</Text>
              <Text style={styles.infoValue}>{data?.cid_no}</Text>
            </View>
          </View>
          {/* Gender */}
          <View style={styles.infoRowBox}>
            <RNText
              style={{fontSize: 24, color: COLORS.primary, marginRight: 16}}>
              👤
            </RNText>
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>
                {data?.gender || 'Not provided'}
              </Text>
            </View>
          </View>
          {/* Age */}
          <View style={styles.infoRowBox}>
            <RNText
              style={{fontSize: 24, color: COLORS.primary, marginRight: 16}}>
              🎂
            </RNText>
            <View style={styles.infoTextBox}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>
                {data?.age || 'Not provided'}
              </Text>
            </View>
          </View>
        </View>

        {/* Address Information Section */}
        <View style={styles.infoSection}>
          <Text style={[styles.infoLabel, {marginBottom: 8}]}>
            Address Information
          </Text>
          {/* Present Address */}
          <View style={styles.infoRowBox}>
            <AddressIcon />
            <View style={styles.infoTextBox}>
              <Text style={styles.label}>{t('present_address')}</Text>
              <Text style={styles.infoValue}>
                {data?.present_address || 'Not provided'}
              </Text>
            </View>
          </View>
          {/* Permanent Address */}
          <View style={styles.infoRowBox}>
            <AddressIcon />
            <View style={styles.infoTextBox}>
              <Text style={styles.label}>{t('permanent_address')}</Text>
              <Text style={styles.infoValue}>
                {data?.permanent_address || 'Not provided'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoPosition: {
    position: 'absolute',
    top: 90,
    left: -120,
    width: 240,
    height: 240,
    opacity: 0.15,
  },
  bottomRightLogo: {
    position: 'absolute',
    bottom: -120,
    right: -80,
    width: 240,
    height: 240,
    opacity: 0.15,
  },
  headerCurve: {
    backgroundColor: COLORS.primary,
    height: 140,
    borderBottomStartRadius: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 2,
  },
  email: {
    color: '#fff',
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
  avatarWrap: {
    marginLeft: 10,
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIconWrap: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  profileContent: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
  },
  infoRowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eaf6ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextBox: {
    flex: 1,
  },
  infoLabel: {
    color: '#b0b0b0',
    fontSize: 13,
    fontFamily: FONTS.regular,
  },
  infoValue: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontFamily: FONTS.medium,
    marginTop: 2,
  },
  editIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#eaf6ed',
  },
  infoSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
});
