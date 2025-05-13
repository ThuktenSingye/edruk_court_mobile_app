import React from 'react';
import {View, Text, StyleSheet, Modal, Platform} from 'react-native';
import {Input, Button} from '@rneui/themed';
import {BlurView} from '@react-native-community/blur';
import UploadDocumentCard from '../../components/common/UploadDocumentCard';
import {COLORS} from '../../constant/designTokens';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import CancelIcon from '../../assets/icons/Cases/CancelIcon';
import {useTranslation} from 'react-i18next';

interface WithdrawCaseModalProps {
  visible: boolean;
  onClose: () => void;
  fileName: string;
  onFilePick: () => void;
  message: string;
  onChangeMessage: (text: string) => void;
  onConfirm: () => void;
}

export default function WithdrawCaseModal({
  visible,
  onClose,
  fileName,
  onFilePick,
  message,
  onChangeMessage,
  onConfirm,
}: WithdrawCaseModalProps) {
  const {t} = useTranslation();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        {Platform.OS === 'ios' ? (
          <BlurView blurType="light" style={StyleSheet.absoluteFill} />
        ) : (
          <View style={styles.androidDim} />
        )}

        <View style={styles.modalCard}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <CancelIcon />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>{t('withdraw_case')}</Text>

          <UploadDocumentCard fileName={fileName} onPress={onFilePick} />

          <Input
            placeholder="Enter message"
            placeholderTextColor="#fff"
            value={message}
            onChangeText={onChangeMessage}
            inputStyle={{color: '#fff', fontSize: 14}}
            containerStyle={{paddingHorizontal: 0}}
          />

          <Button
            title={t('confirm')}
            buttonStyle={styles.confirmButton}
            titleStyle={styles.confirmText}
            onPress={onConfirm}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  androidDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 10,
    width: '30%',
    alignSelf: 'flex-end',
  },
  confirmText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 10,
  },
});
