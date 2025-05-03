import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {Card, Button} from '@rneui/themed';
import DocumentPicker from '@react-native-documents/picker';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import WithdrawCaseModal from './WithdrawCaseModal';
import {CaseStackParamList} from '../../types/navigation';

const caseSections = [
  {
    title: 'Case',
    data: [
      {label: 'Case Title', value: 'Attempted Murder blash blash blkash'},
      {label: 'Nature', value: 'Criminal'},
      {label: 'Registerated Date', value: 'Nov 11, 2024'},
      {label: 'Severity', value: 'Normal'},
      {label: 'Action', value: '-'},
      {label: 'Status', value: 'Active'},
    ],
  },
  {
    title: 'Case Status',
    data: [
      {label: 'Appeal', value: 'No'},
      {label: 'Enforcement', value: 'No'},
      {label: 'Hearing', value: 'Judgment'},
    ],
  },
  {
    title: 'Dealing Official',
    data: [
      {label: 'Judge', value: 'Dasho Jigme Gyaltsen'},
      {label: 'Dealing Clerk', value: 'Moni Kumar'},
      {label: 'Bench No', value: 'II'},
    ],
  },
];

export default function CaseScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CaseStackParamList>>();

  const [isWithdrawVisible, setIsWithdrawVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      setFileName(result.name ?? '');
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Document pick error:', err);
      }
    }
  };

  const handleConfirm = () => {
    Toast.show({
      type: 'success',
      text1: 'Case withdrawal in progress',
    });

    setTimeout(() => {
      setIsWithdrawVisible(false);
      setFileName('');
      setMessage('');
    }, 1500);
  };

  const renderItem: ListRenderItem<(typeof caseSections)[number]> = ({
    item,
    index,
  }) => (
    <View style={{marginBottom: 10}}>
      {index === 0 ? (
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Button
            title="View Proceeding"
            buttonStyle={styles.viewProceedingButton}
            titleStyle={styles.buttonText}
            containerStyle={styles.viewProceedingContainer}
            onPress={() => navigation.navigate('CaseProceeding')}
          />
        </View>
      ) : (
        <Text style={styles.sectionTitle}>{item.title}</Text>
      )}

      <Card containerStyle={styles.card}>
        {item.data.map((entry, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.label}>{entry.label}:</Text>
            <Text style={styles.value} numberOfLines={2}>
              {entry.value}
            </Text>
          </View>
        ))}
      </Card>
    </View>
  );

  return (
    <MainLayout>
      <FlatList
        data={caseSections}
        keyExtractor={(item, index) => `${item.title}_${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListFooterComponent={
          <View style={styles.buttonRow}>
            <Button
              title="Withdraw Case"
              buttonStyle={styles.actionButton}
              titleStyle={styles.buttonText}
              onPress={() => setIsWithdrawVisible(true)}
            />
            <Button
              title="Defendent Info"
              buttonStyle={styles.actionButton}
              titleStyle={styles.buttonText}
              onPress={() => navigation.navigate('DefendentInfo')}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {isWithdrawVisible && (
        <WithdrawCaseModal
          visible={true}
          onClose={() => setIsWithdrawVisible(false)}
          fileName={fileName}
          onFilePick={handleFilePick}
          message={message}
          onChangeMessage={setMessage}
          onConfirm={handleConfirm}
        />
      )}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: -5,
    marginLeft: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewProceedingContainer: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  viewProceedingButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  label: {
    flex: 1.2,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  value: {
    flex: 2,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 6,
    paddingBottom: 20,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
});
