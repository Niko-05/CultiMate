import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../src/screens/login/RegisterScreen';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

jest.mock('../assets/check-solid.svg', () => 'CheckIcon');

jest.mock('../src/api/user', () => ({
  checkDuplicateUsername: jest.fn(),
  checkDuplicateEmail: jest.fn(),
  registerUser: jest.fn()
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({ top: 0, bottom: 0 })
}));
jest.mock('expo-secure-store', () => ({
}));

describe('GuiaPlantado Screen Test', () => {
    it('should update to the next step on button press', async () => {
    const { getByText } = render(<RegisterScreen />);
    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);
    
    expect(Alert.alert).toHaveBeenCalledWith("Error", "You must fill all the fields");

  });
});
