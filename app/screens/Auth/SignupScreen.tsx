import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import {Input, Button} from '@rneui/themed';
import {COLORS, SIZES} from '../../constant/designTokens';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [cidNo, setCidNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const navigation = useNavigation();

  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri || null);
        }
      },
    );
  };

  const handleSignUp = () => {
    if (
      !email ||
      !cidNo ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match');
      return;
    }

    console.log('Signing up...');
    console.log('Profile image URI:', profileImage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.signupTitle}>Create Account</Text>

            <TouchableOpacity
              style={styles.imageUpload}
              onPress={handleChoosePhoto}>
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={{color: COLORS.textSecondary}}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <Input
                placeholder="pema@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                importantForAutofill="no"
                autoComplete="off"
                autoCorrect={false}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
              />

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.inputLabel}>CID No.</Text>
                  <Input
                    value={cidNo}
                    onChangeText={setCidNo}
                    keyboardType="numeric"
                    containerStyle={styles.inputWrapper}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.inputText}
                  />
                </View>
                <View style={styles.column}>
                  <Text style={styles.inputLabel}>Phone</Text>
                  <Input
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    containerStyle={styles.inputWrapper}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.inputText}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <Input
                    value={firstName}
                    onChangeText={setFirstName}
                    containerStyle={styles.inputWrapper}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.inputText}
                  />
                </View>
                <View style={styles.column}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <Input
                    value={lastName}
                    onChangeText={setLastName}
                    containerStyle={styles.inputWrapper}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.inputText}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                {['male', 'female', 'other'].map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.genderOption,
                      gender === option && styles.genderSelected,
                    ]}
                    onPress={() => setGender(option)}>
                    <Text
                      style={
                        gender === option
                          ? styles.genderTextSelected
                          : styles.genderText
                      }>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Password</Text>
              <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
                rightIcon={{
                  type: 'font-awesome',
                  name: showPassword ? 'eye-slash' : 'eye',
                  onPress: () => setShowPassword(prev => !prev),
                }}
              />

              <Text style={styles.inputLabel}>Confirm Password</Text>
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                containerStyle={styles.inputWrapper}
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
              />
            </View>

            <Button
              title="Sign Up"
              buttonStyle={styles.signupButton}
              containerStyle={styles.signupButtonContainer}
              onPress={handleSignUp}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.haveAccountText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.textPrimary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 20,
    paddingBottom: 30,
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  signupTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: COLORS.primary,
    textAlign: 'center',
  },
  imageUpload: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  inputContainer: {
    width: '100%',
  },
  inputLabel: {
    marginLeft: 10,
    marginBottom: 5,
    color: '#333',
  },
  inputWrapper: {
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 5,
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    height: 50,
  },
  inputText: {
    color: COLORS.textSecondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderOption: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderSelected: {
    backgroundColor: COLORS.primary,
  },
  genderText: {
    color: COLORS.textSecondary,
  },
  genderTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupButtonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  haveAccountText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
