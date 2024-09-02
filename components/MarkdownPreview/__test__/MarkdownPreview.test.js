import React from 'react';
import {render, screen} from '@testing-library/react-native';
import MarkdownPreview from '../../MarkdownPreview';

describe('<MarkdownPreview />', () => {
    it('renders without crashing', () => {
        render(<MarkdownPreview code={'# Heading'}/>);
        expect(screen.getByText('Heading')).toBeTruthy();
    })

    it('renders without any code also', ( ) => {
        render(<MarkdownPreview/>);
        expect(screen.getByTestId('markdown-preview-container')).toBeTruthy();
    })
})
