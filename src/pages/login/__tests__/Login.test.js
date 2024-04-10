import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import expect from "expect";
import Login from "../Login";

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate, 
}));


const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
};

beforeAll(() => {
    // Mock window.alert to be a jest function
    window.alert = jest.fn();
});

afterAll(() => {
    // Restore window.alert to its original state
    window.alert.mockRestore();
});

describe('Login Component', () => {
    it('renders email and password input fields', () => {
        const { getByText, getByLabelText } = render(<Login />)
        expect(getByLabelText("Email")).toBeInTheDocument();
        expect(getByLabelText("Password")).toBeInTheDocument();
        expect(getByText("Login")).toBeInTheDocument();
        expect(getByText("SignUp")).toBeInTheDocument();
    })

    it('should update email and password on input change', () => {
        const { getByLabelText } = render(<Login />);
        const emailInput = getByLabelText(/Email/i);
        const passwordInput = getByLabelText(/Password/i)
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');
    });

    it('should call authenticateHandler on login button click', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );
        const { getByText } = renderWithRouter(<Login />);
        const loginButton = getByText(/Login/i);
        fireEvent.click(loginButton);
        // await new Promise(resolve => setTimeout(resolve, 0));
        expect(fetch).toHaveBeenCalled();
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('should navigate to the registration page on Register button click', () => {
        const { getByText } = renderWithRouter(<Login />);
        const signUpButton = getByText(/SignUp/i);
        fireEvent.click(signUpButton);
        expect(mockedNavigate).toHaveBeenCalled()
    });


}
)


