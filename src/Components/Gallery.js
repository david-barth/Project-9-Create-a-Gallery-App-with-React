//Project 9: Gallery Component


import React from 'react';
import GalleryItem from './GalleryItem';

function Gallery(props) { 
    return (
      <div className="photo-container">
        <h2>Images: {props.result} </h2>
        <ul>
            {props.urls.map((url, index) => <GalleryItem key={index} url={url} />)}
        </ul>
      </div>
    )
}

/*Purpose: h2 tag is programmatically updated with props based on the Search input that updates the photoTheme state in the App component.
Map() is used to iteratively create GalleryItem components with unique key props and urls aside to a url prop from the relevant url state in App. */

export default Gallery;


