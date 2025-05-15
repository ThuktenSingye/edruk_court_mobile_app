const buildSignupFormData = ({
                               email,
                               password,
                               passwordConfirmation,
                               firstName,
                               lastName,
                               cidNo,
                               phoneNumber,
                               gender,
                               profileImageUri,
                             }: {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  cidNo: string;
  phoneNumber: string;
  gender: string;
  profileImageUri: string | null;
}): FormData => {
  const formData = new FormData();

  formData.append('user[email]', email);
  formData.append('user[password]', password);
  formData.append('user[password_confirmation]', passwordConfirmation);

  formData.append('user[profile_attributes][first_name]', firstName);
  formData.append('user[profile_attributes][last_name]', lastName);
  formData.append('user[profile_attributes][cid_no]', cidNo);
  formData.append('user[profile_attributes][phone_number]', phoneNumber);
  formData.append('user[profile_attributes][gender]', gender);

  if (profileImageUri) {
    const fileName = profileImageUri.split('/').pop() || 'avatar.jpg';
    const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';
    formData.append('user[profile_attributes][avatar]', {
      uri: profileImageUri,
      name: fileName,
      type: fileType,
    } as any);
  }

  return formData;
};

export default buildSignupFormData;
