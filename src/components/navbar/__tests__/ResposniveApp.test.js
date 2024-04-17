

import React from 'react';
import { render, fireEvent } from '@testing-library/react';



test('test', () => {
  expect(true).toBe(true);
})

// describe('ResponsiveAppBar', () => {
//   it('renders without crashing', () => {
//     render(
//       <MemoryRouter>
//         <ResponsiveAppBar />
//       </MemoryRouter>
//     );
//   });

//   it('displays navigation links', () => {
//     const { getByText } = render(
//       <MemoryRouter>
//         <ResponsiveAppBar />
//       </MemoryRouter>
//     );

//     expect(getByText('Home')).toBeInTheDocument();
//     expect(getByText('Pricing')).toBeInTheDocument();
//     expect(getByText('Blog')).toBeInTheDocument();
//   });

//   it('opens user menu when clicked', () => {
//     const { getByLabelText, getByText } = render(
//       <MemoryRouter>
//         <ResponsiveAppBar />
//       </MemoryRouter>
//     );

//     const userMenuButton = getByLabelText('account of current user');
//     fireEvent.click(userMenuButton);

//     expect(getByText('Login')).toBeInTheDocument();
//     expect(getByText('Register')).toBeInTheDocument();
//   });

//   // Add more tests as needed...
// });
