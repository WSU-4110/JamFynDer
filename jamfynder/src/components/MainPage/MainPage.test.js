import{render, screen} from '@testing-library/react';
import React from 'react';
import MainPage from './MainPage';

describe('Main Page',() =>{

test('Like/Dislike counter', ()=>{
    render(<MainPage/>);
    const description = screen.getByText("Like/Dislike: ");
    expect(description).toBeInTheDocument();
});

test('Create Playlist Button', ()=>{
    render(<MainPage/>);
    const description = screen.getByText("Create Playlist ");
    expect(description).toBeInTheDocument();
});

test('Like Song Button', ()=>{
    render(<MainPage/>);
    const description = screen.getByText("Song Was Liked! ");
    expect(description).toBeInTheDocument();
});

test('Dislike Song Button', ()=>{
    render(<MainPage/>);
    const description = screen.getByText("Song Was Disliked! ");
    expect(description).toBeInTheDocument();
});

test('Album cover Image', ()=>{
    render(<MainPage/>);
    const description = screen.getByText("Image is rendered ");
    expect(description).toBeInTheDocument();
});

test('Testing Search Bar', ()=>{
    render(<MainPage/>);
    const description = screen.getByText("Search bar is rendered ");
    expect(description).toBeInTheDocument();
});


} )
