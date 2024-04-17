import React from 'react';
import { render, fireEvent,prettyDOM } from '@testing-library/react';
import PasswordRecovery from '../PasswordRecovery';

describe('PasswordRecovery component', () => {
  test('renders email input component initially', () => {
    const { getByLabelText } = render(<PasswordRecovery />);
    const emailInput = getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
  });

  test('displays error message for invalid email format', () => {
    const { getByLabelText, getByText } = render(<PasswordRecovery />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(getByText('Send OTP'));
    expect(getByText('Please enter a valid email')).toBeInTheDocument();
  });

  test('renders OTP input component after sending OTP', () => {
    const { getByText, getByLabelText } = render(<PasswordRecovery />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Send OTP'));
    const otpInput = getByLabelText('OTP');
    expect(otpInput).toBeInTheDocument();
  });

  test('displays error message for invalid OTP format', () => {
    const { getByText, getByLabelText,container } = render(<PasswordRecovery />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Send OTP'));
    const otpInput = getByLabelText('OTP');
    fireEvent.change(otpInput, { target: { value: '123' } });
    fireEvent.click(getByText('Confirm'));
    console.log(prettyDOM(container));
    expect(getByText('Invalid OTP format')).toBeInTheDocument();
  });

  test('renders password reset component after validating OTP', () => {
    const { getByText, getByLabelText } = render(<PasswordRecovery />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Send OTP'));
    const otpInput = getByLabelText('OTP');
    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(getByText('Confirm'));
    const passwordInput = getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();
  });

  test('displays error message for  password mismatch', () => {
    const { getByText, getByLabelText } = render(<PasswordRecovery />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Send OTP'));
    const otpInput = getByLabelText('OTP');
    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(getByText('Confirm'));
    const passwordInput = getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'hello' } });
    const confirmInput = getByLabelText('Confirm Password')
    fireEvent.change(confirmInput, { target: { value: 'diffs' }})
    fireEvent.click(getByText('Confirm'));
    
     expect(getByText('Passwords Dont Match')).toBeInTheDocument();
  });
});
