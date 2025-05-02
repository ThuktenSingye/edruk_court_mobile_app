import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Text, Button, Icon} from '@rneui/themed';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import UploadDocumentCard from '../../components/common/UploadDocumentCard';
import {useNavigation} from '@react-navigation/native';

export default function CaseProceedingDetailScreen({route}: any) {
  const {title} = route.params;
  const navigation = useNavigation();

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon
            name="arrow-back"
            type="ionicon"
            color={COLORS.primary}
            size={24}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.heading}>{title}</Text>

        {/* Main Detail Card */}
        <Card containerStyle={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.caseId}>Case ID</Text>
          </View>

          <Text style={styles.label}>Short Description</Text>

          <Text style={styles.subHeading}>Date & Time:</Text>
          <Text style={styles.detail}>10:30 AM, 20th Dec 2024</Text>

          <Text style={styles.subHeading}>Status:</Text>
          <Text style={styles.detail}>Pending</Text>

          {/* Upload Section */}
          <UploadDocumentCard
            onPress={() => console.log('Upload Document Pressed')}
          />

          {/* Document List Section */}
          <Text style={styles.subHeading}>List of Document</Text>
          {['FileName.pdf', 'FileName.pdf'].map((file, index) => (
            <Card key={index} containerStyle={styles.docCard}>
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.fileName}>{file}</Text>
                  <Text style={styles.fileMeta}>10:30 AM, 20th Dec 2024</Text>
                </View>

                <View style={styles.actionRow}>
                  <Button
                    title="Replace"
                    buttonStyle={styles.actionButton}
                    titleStyle={styles.actionTitle}
                  />
                  <Button
                    title="Delete"
                    buttonStyle={[styles.actionButton, {marginLeft: 6}]}
                    titleStyle={styles.actionTitle}
                  />
                </View>
              </View>

              <View style={styles.viewMoreRow}>
                <Text style={styles.viewMoreText}>View More</Text>
                <Icon
                  name="eye"
                  type="ionicon"
                  size={16}
                  color={COLORS.primary}
                />
              </View>
            </Card>
          ))}
        </Card>

        <Button
          title="View All Case Proceeding"
          buttonStyle={styles.footerButton}
          titleStyle={{color: '#fff', fontFamily: FONTS.medium}}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
    paddingBottom: 100,
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  heading: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginBottom: 10,
    marginLeft: 10,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 10,
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  caseId: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  label: {
    fontFamily: FONTS.regular,
    marginVertical: 4,
  },
  subHeading: {
    fontFamily: FONTS.medium,
    marginTop: 12,
  },
  detail: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    marginBottom: 6,
  },
  docCard: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 12,
    marginLeft: 1,
    elevation: 4,
  },
  fileName: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  fileMeta: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionTitle: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  viewMoreRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 6,
  },
  viewMoreText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primary,
    marginRight: 4,
  },
  footerButton: {
    marginTop: 20,
    marginRight: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    width: '70%',
    alignSelf: 'center',
  },
});
