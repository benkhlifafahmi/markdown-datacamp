import React from 'react';
import {render, screen} from '@testing-library/react-native';
import MarkdownEditor from '../../MarkdownEditor';


describe('<MarkdownEditor />', () => {
    it('renders correctly', () => {
        render(<MarkdownEditor />);
        expect(screen.getByPlaceholderText('You can write your markdown text here.')).toBeTruthy();
    })
})
