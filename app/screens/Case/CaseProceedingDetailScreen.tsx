// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Linking,
// } from 'react-native';
// import {Card, Text, Button, Icon} from '@rneui/themed';
// import MainLayout from '../../components/common/MainLayout';
// import {COLORS, FONTS, SIZES} from '../../constant/designTokens';
// import {useNavigation} from '@react-navigation/native';
// import {pick, types} from '@react-native-documents/picker';
// import {useUploadHearingDocument} from '../../hooks/useUploadHearingDocuments';
// import {useHearingDocuments} from '../../hooks/useGetHearingDocuments';
// import {getToken} from '../../utils/token';
// import {useTranslation} from 'react-i18next';

// interface FileDoc {
//   uri: string;
//   name: string;
//   type: string;
//   document_name?: string;
//   fileName?: string;
//   document?: {
//     name: string;
//     filename: string;
//     url: string;
//     content_type: string;
//     byte_size: number;
//   };
//   url?: string;
//   document_status?: string;
//   verified_at?: string | null;
//   created_at?: string;
// }

// export default function CaseProceedingDetailScreen({route}: any) {
//   const {title, hearing, caseId} = route.params;
//   const navigation = useNavigation();
//   const [documents, setDocuments] = useState<FileDoc[]>([]);
//   const {mutate: uploadDocument, isPending} = useUploadHearingDocument();
//   const {t} = useTranslation();

//   const {data: hearingDocuments, refetch} = useHearingDocuments(
//     caseId,
//     hearing.id,
//   );

//   useEffect(() => {
//     console.log('Hearing Documents:', hearingDocuments);
//     console.log('Local Documents:', documents);
//   }, [hearingDocuments, documents]);

//   const handleFilePick = async () => {
//     try {
//       const result = await pick({
//         type: [types.pdf], // Only PDF files allowed
//         allowMultiSelection: true, // Allow multiple files
//         mode: 'open',
//       });

//       // Format files for upload
//       const files = Array.isArray(result) ? result : [result];
//       const formattedFiles = files.map(file => ({
//         uri: file.uri || '',
//         name: file.name || '',
//         type: file.type || 'application/pdf',
//       }));

//       // Update state with selected files
//       setDocuments(prevDocuments => [...prevDocuments, ...formattedFiles]);
//     } catch (err) {
//       console.error('Document Picker Error:', err);
//     }
//   };

//   const handleFileUpload = async () => {
//     try {
//       const result = await pick({
//         type: [types.pdf],
//         allowMultiSelection: true,
//         mode: 'open',
//       });

//       // Ensure result is an array of files
//       const files = Array.isArray(result) ? result : [result];
//       console.log('Selected Files:', files);

//       // Format the files
//       const formattedFiles: FileDoc[] = files.map(file => ({
//         uri: file.uri || '',
//         name: file.name || '',
//         type: file.type || 'application/pdf',
//       }));

//       // Upload the newly selected documents
//       uploadDocument(
//         {
//           caseId,
//           hearingId: hearing.id,
//           file: formattedFiles,
//         },
//         {
//           onSuccess: response => {
//             console.log('Upload Response:', response);
//             Alert.alert('Success', 'Documents uploaded successfully');
//             if (response?.data) {
//               const newDocs = Array.isArray(response.data)
//                 ? response.data
//                 : [response.data];
//               // Clear the local documents state after successful upload
//               setDocuments([]);
//               // Let the refetch handle updating the documents list
//               refetch();
//             }
//           },
//           onError: (err: any) => {
//             console.error('Upload Error:', err);
//             Alert.alert('Error', err?.message || 'Upload failed');
//           },
//         },
//       );
//     } catch (err: any) {
//       console.error('Document Picker Error:', err);
//     }
//   };

//   const handleDocumentPress = async (doc: any) => {
//     try {
//       console.log('Full Document Object:', JSON.stringify(doc, null, 2));

//       const documentUrl =
//         doc.document?.url || doc.url || doc.document_url || doc.uri;
//       console.log('Attempting to open URL:', documentUrl);

//       if (!documentUrl) {
//         console.log('Document structure:', {
//           hasDocument: !!doc.document,
//           documentKeys: doc.document ? Object.keys(doc.document) : [],
//           docKeys: Object.keys(doc),
//         });
//         Alert.alert('Error', 'Document URL not found');
//         return;
//       }

//       const canOpen = await Linking.canOpenURL(documentUrl);
//       console.log('Can open URL:', canOpen);

//       if (canOpen) {
//         try {
//           await Linking.openURL(documentUrl);
//         } catch (openError) {
//           console.error('Error opening URL:', openError);
//           Alert.alert('Error', 'Failed to open document. Please try again.');
//         }
//       } else {
//         console.log('URL cannot be opened:', documentUrl);
//         Alert.alert(
//           'Error',
//           'Cannot open this document. The URL may be invalid or inaccessible.',
//         );
//       }
//     } catch (error) {
//       console.error('Error in handleDocumentPress:', error);
//       Alert.alert('Error', 'Failed to process document');
//     }
//   };

//   const handleSignAll = async () => {
//     try {
//       const token = await getToken();
//       if (!token) {
//         Alert.alert('Error', 'Authentication token not found');
//         return;
//       }

//       // Get document IDs from both hearingDocuments and local documents
//       const documentIds = [
//         ...(hearingDocuments?.map((doc: any) => doc.id) || []),
//         ...(documents.map((doc: any) => doc.id) || []),
//       ].filter(Boolean);

//       console.log('Document IDs to sign:', documentIds);

//       if (documentIds.length === 0) {
//         Alert.alert('Error', 'No documents available to sign');
//         return;
//       }

//       // Sign documents one by one
//       let successCount = 0;
//       let failureCount = 0;
//       let failedDocIds: number[] = [];

//       // Helper function to wait between requests
//       const wait = (ms: number) =>
//         new Promise(resolve => setTimeout(resolve, ms));

//       // Helper function to attempt signing with retries
//       const attemptSigning = async (docId: number, retries = 2) => {
//         for (let attempt = 0; attempt <= retries; attempt++) {
//           try {
//             console.log(
//               `Attempting to sign document ${docId} (attempt ${attempt + 1}/${
//                 retries + 1
//               })...`,
//             );

//             const response = await fetch(
//               `http://10.2.35.53:3001/api/v1/user/cases/${caseId}/hearings/${hearing.id}/documents/${docId}/sign`,
//               {
//                 method: 'POST',
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                   Accept: 'application/json',
//                 },
//               },
//             );

//             const data = await response.json();
//             console.log(`Response for document ${docId}:`, {
//               status: response.status,
//               ok: response.ok,
//               data: data,
//               attempt: attempt + 1,
//             });

//             if (response.ok) {
//               return true;
//             }

//             // If this wasn't the last attempt, wait before retrying
//             if (attempt < retries) {
//               console.log(`Retrying document ${docId} after 2 seconds...`);
//               await wait(2000);
//             }
//           } catch (error) {
//             console.error(
//               `Error signing document ${docId} (attempt ${attempt + 1}):`,
//               error,
//             );
//             if (attempt < retries) {
//               await wait(2000);
//             }
//           }
//         }
//         return false;
//       };

//       for (const docId of documentIds) {
//         const success = await attemptSigning(docId);

//         if (success) {
//           successCount++;
//           console.log(`Successfully signed document ${docId}`);
//         } else {
//           failureCount++;
//           failedDocIds.push(docId);
//           console.error(`Failed to sign document ${docId} after all retries`);
//         }

//         // Wait for 1 second before processing the next document
//         await wait(1000);
//       }

//       // Show appropriate message based on results
//       if (successCount > 0 && failureCount === 0) {
//         Alert.alert('Success', 'All documents have been signed successfully');
//         refetch(); // Refresh the documents list
//       } else if (successCount > 0 && failureCount > 0) {
//         Alert.alert(
//           'Partial Success',
//           `${successCount} document(s) signed successfully.\n\nFailed to sign document(s) with ID(s): ${failedDocIds.join(
//             ', ',
//           )}.\n\nPlease try signing the failed documents individually.`,
//         );
//         refetch(); // Refresh the documents list
//       } else {
//         Alert.alert('Error', 'Failed to sign any documents. Please try again.');
//       }
//     } catch (error: any) {
//       console.error('Sign All Error:', error);
//       console.error('Error details:', {
//         message: error.message,
//         stack: error.stack,
//         name: error.name,
//       });
//       Alert.alert('Error', 'Failed to sign documents. Please try again.');
//     }
//   };

//   return (
//     <MainLayout>
//       <ScrollView contentContainerStyle={styles.container}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}>
//           <Icon
//             name="arrow-back"
//             type="ionicon"
//             color={COLORS.primary}
//             size={24}
//           />
//         </TouchableOpacity>

//         <Text style={styles.title}>{title} Hearing</Text>

//         {/* <View style={styles.contentWrapper}> */}
//         {/* Hearing Details Card */}
//         <Card containerStyle={styles.card}>
//           <View style={styles.rowBetween}>
//             {/* <Text style={styles.title}>{hearing.hearing_type}</Text> */}
//             <Text style={styles.caseId}>Case ID: {hearing.case_number}</Text>
//           </View>

//           <Text style={styles.label}>Short Description</Text>
//           <Text style={styles.detail}>{hearing.summary}</Text>

//           <Text style={styles.subHeading}>Date & Time:</Text>
//           {hearing.schedules.map((schedule: any) => (
//             <Text key={schedule.id} style={styles.detail}>
//               {schedule.scheduled_date} - {schedule.schedule_status}
//             </Text>
//           ))}

//           <Text style={styles.subHeading}>Status:</Text>
//           <Text style={styles.detail}>{hearing.hearing_status}</Text>
//         </Card>
//         {/* </View> */}

//         {/* Upload Card */}
//         {hearing.hearing_type !== 'Miscellaneous' && (
//           <>
//             {hearing.hearing_status !== 'completed' && (
//               <Card containerStyle={styles.card}>
//                 <Text style={styles.uploadHeading}>Upload Documents</Text>
//                 <Button
//                   title={isPending ? 'Uploading...' : 'Select & Upload PDFs'}
//                   onPress={handleFileUpload}
//                   buttonStyle={styles.uploadButton}
//                   disabled={isPending}
//                 />
//               </Card>
//             )}

//             {/* Documents List Card */}
//             {(hearingDocuments?.length > 0 || documents.length > 0) && (
//               <Card containerStyle={styles.card}>
//                 <View style={styles.documentHeader}>
//                   <Text style={styles.uploadHeading}>{t('documents')}</Text>
//                   <Button
//                     title="Sign All"
//                     onPress={handleSignAll}
//                     buttonStyle={styles.signAllButton}
//                   />
//                 </View>
//                 <View style={styles.uploadedList}>
//                   {/* Show existing documents */}
//                   {hearingDocuments?.map((doc: any, index: number) => (
//                     <TouchableOpacity
//                       key={`existing-${index}`}
//                       style={styles.documentRow}
//                       onPress={() => handleDocumentPress(doc)}
//                       activeOpacity={0.7}>
//                       <View style={styles.documentInfo}>
//                         <View style={styles.documentHeader}>
//                           <Icon
//                             name="document-text-outline"
//                             type="ionicon"
//                             color={COLORS.primary}
//                             size={20}
//                             style={styles.documentIcon}
//                           />
//                           <Text style={styles.documentName}>
//                             {doc.document?.filename ||
//                               doc.document_name ||
//                               doc.name ||
//                               'Document'}
//                           </Text>
//                         </View>
//                         <View style={styles.documentStatus}>
//                           <Text
//                             style={[
//                               styles.statusText,
//                               {
//                                 color:
//                                   doc.document_status === 'Verified'
//                                     ? COLORS.success
//                                     : COLORS.textSecondary,
//                               },
//                             ]}>
//                             {doc.document_status || 'Pending'}
//                           </Text>
//                           <Text style={styles.verifiedText}>
//                             {doc.verified_at
//                               ? `Verified: ${new Date(
//                                   doc.verified_at,
//                                 ).toLocaleDateString()}`
//                               : `Uploaded: ${new Date(
//                                   doc.created_at || new Date(),
//                                 ).toLocaleDateString()}`}
//                           </Text>
//                           {doc.document_status === 'Verified' && (
//                             <View style={styles.signedContainer}>
//                               <Icon
//                                 name="checkmark-circle"
//                                 size={14}
//                                 color={COLORS.success}
//                               />
//                               <Text style={styles.signedText}>Signed</Text>
//                             </View>
//                           )}
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   ))}
//                   {/* Show newly uploaded documents */}
//                   {documents.map((doc, index) => (
//                     <TouchableOpacity
//                       key={`existing-${index}`}
//                       style={styles.documentRow}
//                       onPress={() => handleDocumentPress(doc)}
//                       activeOpacity={0.7}>
//                       <Icon
//                         name="document-text-outline"
//                         type="ionicon"
//                         color={COLORS.primary}
//                         size={24}
//                         style={styles.documentIcon}
//                       />
//                       <View style={styles.documentInfo}>
//                         <Text style={styles.documentName} numberOfLines={1}>
//                           {doc.document?.filename ||
//                             doc.document_name ||
//                             doc.name ||
//                             'Document'}
//                         </Text>
//                         <View style={styles.documentStatus}>
//                           <Text
//                             style={[
//                               styles.statusText,
//                               {
//                                 color:
//                                   doc.document_status === 'Verified'
//                                     ? COLORS.success
//                                     : COLORS.textSecondary,
//                               },
//                             ]}>
//                             {doc.document_status || 'Pending'}
//                           </Text>
//                           <Text style={styles.verifiedText}>
//                             {doc.verified_at
//                               ? `Verified: ${new Date(
//                                   doc.verified_at,
//                                 ).toLocaleDateString()}`
//                               : `Uploaded: ${new Date(
//                                   doc.created_at || new Date(),
//                                 ).toLocaleDateString()}`}
//                           </Text>
//                         </View>
//                         {doc.document_status === 'Verified' && (
//                           <View style={styles.signedContainer}>
//                             <Icon
//                               name="checkmark-circle"
//                               size={14}
//                               color={COLORS.success}
//                             />
//                             <Text style={styles.signedText}>Signed</Text>
//                           </View>
//                         )}
//                       </View>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </Card>
//             )}
//           </>
//         )}
//       </ScrollView>
//     </MainLayout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom: 100,
//   },
//   backButton: {
//     marginLeft: 10,
//     marginTop: 10,
//   },
//   heading: {
//     fontSize: 16,
//     fontFamily: FONTS.semiBold,
//     color: COLORS.primary,
//     marginLeft: 14,
//     marginBottom: 10,
//   },
//   contentWrapper: {
//     // paddingHorizontal: 14,
//     // width: '100%',
//   },
//   card: {
//     elevation: 2,
//     borderRadius: 16,
//   },
//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: FONTS.bold,
//     color: COLORS.primary,
//   },
//   caseId: {
//     fontSize: 14,
//     fontFamily: FONTS.medium,
//     color: COLORS.textSecondary,
//   },
//   label: {
//     fontSize: 14,
//     fontFamily: FONTS.medium,
//     marginTop: 10,
//     color: COLORS.textPrimary,
//   },
//   detail: {
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//     color: COLORS.textSecondary,
//     marginBottom: 10,
//   },
//   subHeading: {
//     fontSize: 16,
//     fontFamily: FONTS.semiBold,
//     marginTop: 10,
//     color: COLORS.textPrimary,
//   },
//   uploadHeading: {
//     fontSize: 16,
//     fontFamily: FONTS.semiBold,
//     color: COLORS.textPrimary,
//     marginBottom: 16,
//   },
//   uploadButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 5,
//     paddingVertical: 10,
//   },
//   uploadedList: {
//     marginTop: 8,
//   },
//   documentHeader: {
//     flexDirection: 'row', // Arrange items in a row
//     justifyContent: 'space-between', // Space out the Text and Button
//     alignItems: 'center', // Align items vertically in the center
//     marginBottom: 12, // Add spacing below the header
//   },
//   documentRow: {
//     flexDirection: 'row', // Align icon and document info horizontally
//     alignItems: 'center', // Center items vertically
//     marginBottom: 12,
//     backgroundColor: '#ffffff', // White background for better contrast
//     borderRadius: 8,
//     padding: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     borderWidth: 1, // Add a border for better separation
//     borderColor: '#e0e0e0', // Light gray border
//   },
//   documentInfo: {
//     flex: 1, // Take up remaining space
//     flexDirection: 'column', // Stack text vertically
//     marginLeft: 12, // Add spacing between icon and text
//   },
//   documentIcon: {
//     marginRight: 8,
//   },
//   documentName: {
//     fontSize: 14,
//     fontFamily: FONTS.medium,
//     color: COLORS.textPrimary,
//     flex: 1,
//     textDecorationLine: 'underline',
//   },
//   documentStatus: {
//     marginTop: 4,
//     flexDirection: 'row', // Align status and verified text horizontally
//     justifyContent: 'space-between', // Space out the elements
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 12,
//     fontFamily: FONTS.medium,
//     color: COLORS.textSecondary,
//   },
//   verifiedText: {
//     fontSize: 11,
//     fontFamily: FONTS.regular,
//     color: COLORS.textSecondary,
//     marginTop: 2,
//   },
//   signedContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//     backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green background for signed status
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//   },
//   signedText: {
//     fontSize: 12,
//     fontFamily: FONTS.medium,
//     color: COLORS.success,
//     marginLeft: 4,
//   },
//   signAllButton: {
//     backgroundColor: COLORS.primary,
//     borderRadius: 5,
//     paddingVertical: 10,
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {Card, Text, Button, Icon} from '@rneui/themed';
import MainLayout from '../../components/common/MainLayout';
import {COLORS, FONTS} from '../../constant/designTokens';
import {useNavigation} from '@react-navigation/native';
import {pick, types} from '@react-native-documents/picker';
import {useUploadHearingDocument} from '../../hooks/useUploadHearingDocuments';
import {useHearingDocuments} from '../../hooks/useGetHearingDocuments';
import {getToken} from '../../utils/token';
import {useTranslation} from 'react-i18next';
import API_HOST from '../../utils/ip.ts';

interface FileDoc {
  uri: string;
  name: string;
  type: string;
  id?: number;
  document?: {
    id: number;
    filename: string;
    url: string;
    document_status?: string;
  };
  url?: string;
  document_status?: string;
}

export default function CaseProceedingDetailScreen({route}: any) {
  const {title, hearing, caseId} = route.params;
  const navigation = useNavigation();
  const [documents, setDocuments] = useState<FileDoc[]>([]);
  const [signedIds, setSignedIds] = useState<number[]>([]);
  const {mutate: uploadDocument, isPending} = useUploadHearingDocument();
  const {t} = useTranslation();
  const {data: hearingDocuments = [], refetch} = useHearingDocuments(
    caseId,
    hearing.id,
  );
  console.log('hearing docuemnt', hearingDocuments);

  useEffect(() => {
    console.log('Docs:', {hearingDocuments, documents, signedIds});
  }, [hearingDocuments, documents, signedIds]);

  const handleFileUpload = async () => {
    try {
      const result = await pick({
        type: [types.pdf],
        allowMultiSelection: true,
        mode: 'open',
      });
      const files = Array.isArray(result) ? result : [result];
      const formatted = files.map(f => ({
        uri: f.uri || '',
        name: f.name || '',
        type: f.type || 'application/pdf',
      }));
      uploadDocument(
        {caseId, hearingId: hearing.id, file: formatted},
        {
          onSuccess: () => {
            Alert.alert('Success', 'Uploaded');
            setDocuments([]);
            refetch();
          },
          onError: (err: any) =>
            Alert.alert('Error', err?.message || 'Upload failed'),
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDocumentPress = async (doc: FileDoc) => {
    const url = doc.document?.url || doc.url || doc.uri;
    if (!url) return Alert.alert('Error', 'URL not found');
    if (await Linking.canOpenURL(url)) await Linking.openURL(url);
    else Alert.alert('Error', 'Cannot open this document');
  };

  const handleSign = async (docId: number) => {
    console.log('Signing document with ID:', docId);
    try {
      const token = await getToken();
      if (!token) return Alert.alert('Error', 'Auth token missing');
      const res = await fetch(
        `${API_HOST}/api/v1/user/cases/${caseId}/hearings/${hearing.id}/documents/${docId}/sign`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Signed');
        setSignedIds(prev => [...prev, docId]);
        refetch();
      } else Alert.alert('Error', data.message || 'Sign failed');
    } catch (e) {
      console.error('Sign Error:', e);
      Alert.alert('Error', 'Sign failed');
    }
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
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
        <Text style={styles.title}>{title} Hearing</Text>
        <Card containerStyle={styles.card}>
          <Text style={styles.caseId}>Case ID: {hearing.case_number}</Text>
          <Text style={styles.label}>Summary</Text>
          <Text style={styles.detail}>{hearing.summary}</Text>
          <Text style={styles.subHeading}>Date & Time:</Text>
          {hearing.schedules.map(s => (
            <Text key={s.id} style={styles.detail}>
              {s.scheduled_date}
            </Text>
          ))}
          <Text style={styles.subHeading}>Status:</Text>
          <Text style={styles.detail}>{hearing.hearing_status}</Text>
        </Card>
        {hearing.hearing_type !== 'Miscellaneous' &&
          hearing.hearing_status !== 'completed' && (
            <Card containerStyle={styles.card}>
              <Text style={styles.uploadHeading}>Upload Documents</Text>
              <Button
                title={isPending ? 'Uploading...' : 'Select & Upload PDFs'}
                onPress={handleFileUpload}
                buttonStyle={styles.uploadButton}
                disabled={isPending}
              />
            </Card>
          )}
        {(hearingDocuments.length || documents.length) > 0 && (
          <Card containerStyle={styles.card}>
            <Text style={styles.uploadHeading}>{t('documents')}</Text>
            <View style={styles.uploadedList}>
              {[...hearingDocuments, ...documents].map((doc, idx) => {
                const docId = doc.id;
                const isVerified =
                  doc.document_status === 'Signed' || doc.document_status === 'Verified' ||
                  signedIds.includes(docId!);

                return (
                  <View key={idx} style={styles.documentRow}>
                    {/* Document Info */}
                    <TouchableOpacity
                      style={styles.documentInfo}
                      onPress={() => handleDocumentPress(doc)}
                      activeOpacity={0.7}>
                      <View style={styles.documentHeaderInner}>
                        <Icon
                          name="document-text-outline"
                          type="ionicon"
                          color={COLORS.primary}
                          size={20}
                        />
                        <Text style={styles.documentName}>
                          {doc.document?.filename || doc.name || 'Document'}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color: isVerified
                              ? COLORS.success
                              : COLORS.textSecondary,
                          },
                        ]}>
                        {doc.document_status || 'Pending'}
                      </Text>
                      {doc.verified_at && (
                        <Text style={styles.verifiedText}>
                          Verified:{' '}
                          {new Date(doc.verified_at).toLocaleDateString()}
                        </Text>
                      )}
                    </TouchableOpacity>

                    {/* Sign Button */}
                    {!isVerified && docId && (
                      <Button
                        title="Sign"
                        onPress={() => handleSign(docId)}
                        buttonStyle={styles.signButton}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </Card>
        )}
        {/* )} */}
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom: 100},
  backButton: {marginLeft: 10, marginTop: 10},
  card: {elevation: 2, borderRadius: 16, padding: 12},
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    margin: 12,
  },
  caseId: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  label: {fontSize: 14, fontFamily: FONTS.medium, color: COLORS.textPrimary},
  detail: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    marginTop: 8,
    color: COLORS.textPrimary,
  },
  uploadHeading: {fontSize: 16, fontFamily: FONTS.semiBold, marginBottom: 12},
  uploadButton: {backgroundColor: COLORS.primary, borderRadius: 5},
  uploadedList: {marginTop: 8},
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 1,
  },
  documentInfo: {flex: 1},
  documentHeaderInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  documentName: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
    marginLeft: 8,
    flex: 1,
    textDecorationLine: 'underline',
  },
  statusText: {fontSize: 12, fontFamily: FONTS.medium},
  signButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
