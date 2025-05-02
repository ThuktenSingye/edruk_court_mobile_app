import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text, Input, Button, Icon} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';

import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import UploadDocumentCard from '../../components/common/UploadDocumentCard';

export default function FileCaseScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    currentAddress: '',
    permanentAddress: '',
    email: '',
    phone: '',
    dzongkhag: '',
    cid: '',
    fileName: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      handleInputChange('fileName', result.name || 'Document.pdf');
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.warn('Document pick error:', error);
      }
    }
  };

  const handleRegister = () => {
    Toast.show({
      type: 'success',
      text1: 'Case Registered Successfully',
    });

    setForm({
      firstName: '',
      lastName: '',
      currentAddress: '',
      permanentAddress: '',
      email: '',
      phone: '',
      dzongkhag: '',
      cid: '',
      fileName: '',
    });
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Registration</Text>

        <Card containerStyle={styles.card}>
          <Text style={styles.sectionTitle}>Defendant Information</Text>

          <View style={styles.row}>
            <Input
              label="First name"
              value={form.firstName}
              onChangeText={text => handleInputChange('firstName', text)}
              containerStyle={styles.halfInput}
            />
            <Input
              label="Last Name"
              value={form.lastName}
              onChangeText={text => handleInputChange('lastName', text)}
              containerStyle={styles.halfInput}
            />
          </View>

          <View style={styles.row}>
            <Input
              label="Current Address"
              value={form.currentAddress}
              onChangeText={text => handleInputChange('currentAddress', text)}
              containerStyle={styles.halfInput}
            />
            <Input
              label="Permanent Address"
              value={form.permanentAddress}
              onChangeText={text => handleInputChange('permanentAddress', text)}
              containerStyle={styles.halfInput}
            />
          </View>

          <View style={styles.row}>
            <Input
              label="Email *"
              keyboardType="email-address"
              value={form.email}
              onChangeText={text => handleInputChange('email', text)}
              containerStyle={styles.halfInput}
            />
            <Input
              label="Phone number *"
              keyboardType="numeric"
              value={form.phone}
              onChangeText={text => handleInputChange('phone', text)}
              containerStyle={styles.halfInput}
            />
          </View>

          <View style={styles.row}>
            <Input
              label="Dzongkhag"
              value={form.dzongkhag}
              onChangeText={text => handleInputChange('dzongkhag', text)}
              containerStyle={styles.halfInput}
            />
            <Input
              label="CID"
              keyboardType="numeric"
              value={form.cid}
              onChangeText={text => handleInputChange('cid', text)}
              containerStyle={styles.halfInput}
            />
          </View>

          {/* Upload Document */}
          <UploadDocumentCard
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />

          {/* Register Button */}
          <Button
            title="REGISTER CASE"
            onPress={handleRegister}
            buttonStyle={styles.submitButton}
            titleStyle={styles.submitTitle}
          />
        </Card>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginLeft: 14,
    marginBottom: 10,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 8,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  uploadButton: {
    backgroundColor: '#DDE9D0',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  uploadTitle: {
    color: '#000',
    fontFamily: FONTS.medium,
  },
  uploadHint: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 6,
    marginLeft: 8,
    color: COLORS.textSecondary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
  },
  submitTitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
});
