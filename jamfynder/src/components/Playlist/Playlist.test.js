import { render, screen } from '@testing-library/react';
import React from 'react';
import Playlist from './Playlist.js';

describe('Playlist', () => {

    test('Telling user to search for song and artists', () => {
      render(<Playlist/>);
      const description = screen.getByText("Search for songs or artists");
      expect(description).toBeInTheDocument();
    });

    test('Search button', () => {
        render(<Playlist/>);
        const description = screen.getByText("Search");
        expect(description).toBeInTheDocument();
      });

})