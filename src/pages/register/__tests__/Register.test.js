import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import expect from "expect";
import Register from "../Register";



const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
};



describe('Register Component', () => {

    it('renders all input fields', () => {
        const { getByText, getByLabelText } = render(<Register />)
        expect(getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(getByLabelText(/Email/i)).toBeInTheDocument();
        expect(getByLabelText(/Enter your Mobile Number/i)).toBeInTheDocument();
        expect(getByLabelText(/^Password/i)).toBeInTheDocument();
        expect(getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(getByText(/Submit/i)).toBeInTheDocument();
    })

    it('submits the form only when all validations pass', async () => {
        window.alert = jest.fn();
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ message: "Registration Successful" }),
        }));
        const { getByLabelText, container, getByRole } = renderWithRouter(<Register />)

        await act(async () => {
            fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
            fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
            fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(getByLabelText(/Enter your Mobile Number/i), { target: { value: '1234567890' } });
            fireEvent.change(getByLabelText(/^Password/i), { target: { value: 'password123' } });
            fireEvent.change(getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
            fireEvent.click(getByRole('button', { name: /submit/i }));
        });

        const errorMessage = container.querySelector('#errorMessage');
        expect(errorMessage).toBeNull();
        global.fetch.mockRestore();
        window.alert.mockRestore();
    });

    it('shows a password validation error when passwords dont match', () => {
        const { getByLabelText, queryByText, container } = renderWithRouter(<Register />);
        const passwordInput = getByLabelText(/^Password/i);
        const confirmPasswordInput = getByLabelText(/Confirm Password/i);
        act(() => {
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.change(confirmPasswordInput, { target: { value: '2' } });
        }
        )
        const errorMessage = queryByText(/Passwords do not match/)
        expect(errorMessage).toBeInTheDocument();

    })    

}
)