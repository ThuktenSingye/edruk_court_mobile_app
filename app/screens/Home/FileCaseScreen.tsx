import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Card, Input, Button} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import {pick, types} from '@react-native-documents/picker';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import {useFileCase} from '../../hooks/useFileCase';
import {useCourts} from '../../hooks/useCourts';
import {Court} from '../../types/court';
// import RNPickerSelect from 'react-native-picker-select';
import {Dropdown} from '@rneui/themed';

// Define the type for the document in the form state
interface FileDoc {
  uri: string;
  name: string;
  type: string;
}

type FormState = {
  title: string;
  court_id: string;
  summary: string;
  first_name: string;
  last_name: string;
  cid_no: string;
  phone_number: string;
  email: string;
  dzongkhag: string;
  gewog: string;
  street_address: string;
  address_type: string;
  documents: FileDoc[];
  documentNames: string[];
  registration_number: string;
  judgement_number: string;
};

export default function FileCaseScreen() {
  const [form, setForm] = useState<FormState>({
    title: '',
    court_id: '',
    summary: '',
    first_name: '',
    last_name: '',
    cid_no: '',
    phone_number: '',
    email: '',
    dzongkhag: '',
    gewog: '',
    street_address: '',
    address_type: '',
    documents: [],
    documentNames: [],
    registration_number: 'REG-2024-001',
    judgement_number: 'JUD-2024-001',
  });

  const mutation = useFileCase();
  const {data, isLoading, error} = useCourts();
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleFilePick = async () => {
    try {
      const result = await pick({
        type: [types.pdf],
        allowMultiSelection: true,
        mode: 'open',
      });

      // Ensure we have an array of files
      const files = Array.isArray(result) ? result : [result];

      const newDocuments = files.map(file => ({
        uri: file.uri || '',
        name: file.name || '',
        type: file.type || 'application/pdf',
      }));

      setForm(prev => ({
        ...prev,
        documents: newDocuments,
        documentNames: newDocuments.map(doc => doc.name || 'Document.pdf'),
      }));
    } catch (err) {
      // User cancelled or error occurred
      console.log('File picker error:', err);
    }
  };

  const handleRegister = async () => {
    if (form.documents.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please upload at least one PDF document.',
      });
      return;
    }
    const payload = {
      case: {
        title: form.title,
        court_id: form.court_id,
        summary: form.summary,
        registration_number: form.registration_number,
        judgement_number: form.judgement_number,
        case_documents_attributes: form.documents.map(doc => ({
          document: doc,
        })),
        defendants_attributes: [
          {
            first_name: form.first_name,
            last_name: form.last_name,
            cid_no: form.cid_no,
            phone_number: form.phone_number,
            email: form.email,
            addresses_attributes: [
              {
                dzongkhag: form.dzongkhag,
                gewog: form.gewog,
                street_address: form.street_address,
                address_type: form.address_type,
              },
            ],
          },
        ],
      },
    };
    mutation.mutate(payload, {
      onSuccess: () => {
        Toast.show({type: 'success', text1: 'Case Registered Successfully'});
        setForm({
          title: '',
          court_id: '',
          summary: '',
          first_name: '',
          last_name: '',
          cid_no: '',
          phone_number: '',
          email: '',
          dzongkhag: '',
          gewog: '',
          street_address: '',
          address_type: '',
          documents: [],
          documentNames: [],
          registration_number: 'REG-2024-001',
          judgement_number: 'JUD-2024-001',
        });
      },
      onError: (error: any) => {
        Toast.show({
          type: 'error',
          text1: 'Failed to register case',
          text2: error?.message,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error fetching courts: {error.message}</Text>
      </View>
    );
  }

  const courtOptions = data?.data.map(court => ({
    label: court.name,
    value: court.id.toString(),
  }));

  // const isLoading = mutation.status === 'pending';

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>File New Case</Text>
        <Card containerStyle={styles.card}>
          <Text style={styles.sectionTitle}>Case Information</Text>
          <Input
            label="Case Title"
            value={form.title}
            onChangeText={text => handleInputChange('title', text)}
          />
          <Text style={styles.sectionTitle}>Select Court</Text>
          <Dropdown
            label="Select Court"
            data={courtOptions || []}
            value={form.court_id}
            onChange={value => handleInputChange('court_id', value)}
          />
          <Input
            label="Summary"
            value={form.summary}
            onChangeText={text => handleInputChange('summary', text)}
            multiline
          />
          <Text style={styles.sectionTitle}>Defendant Information</Text>
          <Input
            label="First Name"
            value={form.first_name}
            onChangeText={text => handleInputChange('first_name', text)}
          />
          <Input
            label="Last Name"
            value={form.last_name}
            onChangeText={text => handleInputChange('last_name', text)}
          />
          <Input
            label="CID No"
            value={form.cid_no}
            onChangeText={text => handleInputChange('cid_no', text)}
            keyboardType="numeric"
          />
          <Input
            label="Phone Number"
            value={form.phone_number}
            onChangeText={text => handleInputChange('phone_number', text)}
            keyboardType="numeric"
          />
          <Input
            label="Email"
            value={form.email}
            onChangeText={text => handleInputChange('email', text)}
            keyboardType="email-address"
          />
          <Text style={styles.sectionTitle}>Address</Text>
          <Input
            label="Dzongkhag"
            value={form.dzongkhag}
            onChangeText={text => handleInputChange('dzongkhag', text)}
          />
          <Input
            label="Gewog"
            value={form.gewog}
            onChangeText={text => handleInputChange('gewog', text)}
          />
          <Input
            label="Street Address"
            value={form.street_address}
            onChangeText={text => handleInputChange('street_address', text)}
          />
          <Input
            label="Address Type"
            value={form.address_type}
            onChangeText={text => handleInputChange('address_type', text)}
          />
          <Text style={styles.sectionTitle}>Upload Documents</Text>
          <Button
            title="Select Documents"
            onPress={handleFilePick}
            buttonStyle={styles.addDocumentButton}
          />
          {form.documentNames.length > 0 && (
            <View style={styles.selectedDocumentsContainer}>
              <Text style={styles.selectedDocumentsTitle}>
                Selected Documents:
              </Text>
              {form.documentNames.map((name, index) => (
                <View key={index} style={styles.documentItem}>
                  <Text style={styles.documentName}>{name}</Text>
                </View>
              ))}
            </View>
          )}
          <Button
            title={isLoading ? 'Registering...' : 'REGISTER CASE'}
            onPress={handleRegister}
            buttonStyle={styles.submitButton}
            titleStyle={styles.submitTitle}
            disabled={isLoading}
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
  pickerInput: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textPrimary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
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
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  documentContainer: {
    marginBottom: 20,
  },
  addDocumentButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 12,
  },
  selectedDocumentsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  selectedDocumentsTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  documentItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  documentName: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
