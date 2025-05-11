import {useMutation} from '@tanstack/react-query';
import {uploadHearingDocument} from '../services/uploadDocumentService';

export const useUploadHearingDocument = () => {
  return useMutation({
    mutationFn: ({
      caseId,
      hearingId,
      file,
    }: {
      caseId: number;
      hearingId: number;
      file: any;
    }) => uploadHearingDocument(caseId, hearingId, file),
  });
};
