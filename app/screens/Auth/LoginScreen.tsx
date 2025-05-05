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
} from 'react-native';
import {Input, Button, Icon} from '@rneui/themed';
import {COLORS, SIZES} from '../../constant/designTokens';
import {useLogin} from '../../hooks/useLogin';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter both email and password');
      return;
    }

    loginMutation.mutate({email, password});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Login Form */}
          <Text style={styles.loginTitle}>Log in</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <Input
              placeholder="pema@exemple.com"
              value={email}
              onChangeText={setEmail}
              containerStyle={styles.inputWrapper}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <Input
              placeholder=""
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              containerStyle={styles.inputWrapper}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              autoCapitalize="none"
              rightIcon={{
                type: 'font-awesome',
                name: showPassword ? 'eye-slash' : 'eye',
                onPress: () => setShowPassword(prev => !prev),
              }}
            />
          </View>

          <Button
            title={loginMutation.isPending ? 'Logging in...' : 'Log in'}
            buttonStyle={styles.loginButton}
            containerStyle={styles.loginButtonContainer}
            onPress={handleLogin}
            disabled={loginMutation.isPending}
          />

          {/* Error Message */}
          {loginMutation.isError && (
            <Text style={styles.errorText}>
              {loginMutation.error?.message || 'Login failed'}
            </Text>
          )}

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>No account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
    borderTopLeftRadius: 130,
    paddingHorizontal: 40,
    paddingTop: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  loginTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: COLORS.primary,
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
  loginButtonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 25,
  },
  socialContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  socialText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  noAccountText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  signupText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.error,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
