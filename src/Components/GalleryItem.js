//Project 9: GalleryItem Component

import React from 'react';

function GalleryItem(props) {
    return (
        <li>
            <img src={props.url} alt='Unsplash_image'/>
        </li>
    )
}

/*Purpose: The url prop is used to update the src attribute of the rendered li element with an image url obtained from the fetch request in App. */

export default GalleryItem;