import React from 'react';
import {fireEvent, render, screen, act} from '@testing-library/react-native';
import App from "../App";

describe('<App />', () => {
    it('renders without crashing', () => {
        render(<App />);
        expect(screen.getByTestId('markdown-editor-input')).toBeTruthy()
        expect(screen.getByTestId('markdown-preview-container')).toBeTruthy()
    })
    it('renders markdown correctly', () => {
        render(<App />);
        const input = screen.getByTestId('markdown-editor-input')
        fireEvent.changeText(input, '# Heading Test')
        expect(screen.getByText('Heading Test')).toBeTruthy()
    })
})
