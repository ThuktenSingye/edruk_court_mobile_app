import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../types/navigation';
import {COLORS, FONTS, SIZES} from '../../constant/designTokens';
import useUserStore from '../../store/useUserStore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import backgroundImage from '../../assets/images/background.png'
import {useTranslation} from 'react-i18next';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({children}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const logout = useUserStore(state => state.logout);
  const user = useUserStore(state => state.user);
  const {t} = useTranslation()

  const confirmLogout = () => {
    Alert.alert(
      t('confirm_logout'), // title as string
      null, // optional message
      [ // buttons array
        {text: t('no'), style: 'cancel'},
        {
          text: t('yes'),
          onPress: () => {
            logout();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaProvider>

        {/* Bottom Right Logo */}

       <View style={styles.container}>
         <ImageBackground
           source={backgroundImage}
           style={styles.container}
           imageStyle={styles.logoPosition}
           resizeMode="contain">
         <Image
           source={backgroundImage}
           style={styles.bottomRightLogo}
           resizeMode="contain"
         />
        {/* Top Bar */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {/* <View style={styles.avatar} /> */}
            <Avatar
              rounded
              size="medium"
              source={{uri: user?.profile.avatar}}
              containerStyle={styles.avatar}
            />
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{t('kuzu_zangpo')}</Text>
              <Text style={styles.name}>
                {user?.profile.first_name} {user?.profile.last_name}
              </Text>
            </View>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <View style={styles.bellWrap}>
                <Text style={styles.badge}>2</Text>
                <Text style={styles.bell}>🔔</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmLogout} style={styles.logoutIcon}>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Page Content */}
        <View style={{flex: 1}}>{children}</View>
         </ImageBackground>
      </View>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 10,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    fontWeight: '700',
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  greetingContainer: {
    flexDirection: 'column', // Added to display text in a column
  },
  greeting: {
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
  },
  bold: {
    fontFamily: FONTS.bold,
  },
  bellWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    fontSize: SIZES.small,
    color: COLORS.error,
    marginRight: 4,
  },
  bell: {
    fontSize: SIZES.large,
  },
  logoutIcon: {
    marginLeft: -2,
  },
  divider: {
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});
