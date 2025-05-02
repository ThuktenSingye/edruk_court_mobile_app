import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constant/designTokens';

//icons
import PhoneIcon from '../../assets/icons/profile/PhoneIcon';
import CottageIcon from '../../assets/icons/profile/CottageIcon';
import CardIcon from '../../assets/icons/profile/CardIcon';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Rotated Green Header */}
      <View style={styles.rotatedHeader}>
        <View style={styles.headerContent}>
          <View style={styles.nameSection}>
            <Text style={styles.name}>Rigzin Samdrup</Text>
            <Text style={styles.email}>rigzinsamdrup0@gmail.com</Text>
          </View>
          <Image
            source={require('../../assets/images/1387217.png')}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Content Below */}
      <View style={styles.content}>
        <View style={styles.row}>
          <CottageIcon size={24} color={COLORS.primary} />
          <View>
            <Text style={styles.label}>Present Address</Text>
            <Text style={styles.value}>Trashigang</Text>
          </View>
        </View>

        <View style={styles.row}>
          <CottageIcon size={24} color={COLORS.primary} />
          <View>
            <Text style={styles.label}>Permanent Address</Text>
            <Text style={styles.value}>Trashigang</Text>
          </View>
        </View>

        <View style={styles.row}>
          <PhoneIcon size={24} color={COLORS.primary} />
          <View>
            <Text style={styles.label}>Contact Number</Text>
            <Text style={styles.value}>17935412</Text>
          </View>
        </View>

        <View style={styles.row}>
          <CardIcon size={24} color={COLORS.primary} />
          <View>
            <Text style={styles.label}>CID</Text>
            <Text style={styles.value}>11501000512</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E8EF',
  },
  rotatedHeader: {
    position: 'absolute',
    top: -255,
    left: -70,
    width: '150%',
    height: 450,
    transform: [{rotate: '-20deg'}],
    zIndex: 2,
    borderBottomLeftRadius: 40,
    overflow: 'visible',
    backgroundColor: COLORS.primary,
  },
  headerContent: {
    transform: [{rotate: '20deg'}],
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: '60%',
  },
  nameSection: {
    marginTop: 10,
  },
  name: {
    fontSize: 25,
    color: '#fff',
    fontFamily: FONTS.bold,
  },
  email: {
    color: '#fff',
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
  },
  profileImage: {
    position: 'absolute',
    right: 20,
    bottom: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 0,
    zIndex: 999,
  },
  content: {
    marginTop: 340,
    paddingHorizontal: 60,
    gap: 27,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 45,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  value: {
    fontSize: SIZES.medium,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
});
