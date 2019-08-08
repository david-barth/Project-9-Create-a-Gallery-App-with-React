//Project 9: Header Component (Contains form element)


import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'; 



class Header extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            inputValue: '',
        }; 
        this.searchUpdate = this.searchUpdate.bind(this); 
    }

    /* Purpose: State contains a single inputValue state where the search input value is stored for use.  searchUpdate is bound to the class here for scope reaosns. */

    match = (pathName, collection) => {
        for (let i=0; i < collection.length; i++) {
            if (pathName === collection[i]) {
                let matchIndex = i; 
                return matchIndex
            }
        }
    }    

    /*Purpose: match() takes a pathName and an array of photo themes to create a reference to the current active gallery.  
    This reference is the index of the collection array corresponding to the pathName obtained. */

    mutate = (array, index, searchTerm) => {
        array.splice(index, 1); 
        array.splice(index, 0, searchTerm)
        return array
    }

    /*Purpose: Accepts an array, an index, and the search input value.  This mutates the old array into a new array that includes the seatch term.
    This mutated array is returned. */

    searchUpdate(e) {
        e.preventDefault()
        let pathName = this.props.location.pathname; 
        let searchTerm = this.inputValue.value;
        let pathCollection = this.props.urlTheme;
        let themeCollection = this.props.photoTheme; 
        let matchIndex = this.match(pathName, pathCollection);
        let newThemes = this.mutate(themeCollection, matchIndex, searchTerm);
        this.props.update(newThemes); 
    }

    /*Purpose: Part of the onSubmit event handling. Prevents default behavior.  Uses withRouter to obtain the current active pathName. 
    The search input value is obtained via refs and the pathCollection + theme collection via props from urlTheme and photoTheme in App.
    The active gallery reference is obtained and used to create a new photoTheme array.  This array is sent to App via the update() prop to update the photoTheme state.
    A new fetch request is performed to update the active gallery with photos corresponding to the search term. */

    render() {

        return (
            <form className="search-form"
                  onSubmit={this.searchUpdate} //Submit event handling to execute gallery updating. Mediated at the App component for state updating.
            >
                
                <input type="search" 
                       name="search" 
                       placeholder="Search"
                       ref={(input) => this.inputValue = input} //Search input value ref.
                       required/>
                
                <button type="submit"
                        className="search-button">
                    
                    <svg fill="#fff" 
                         height="24" 
                         viewBox="0 0 23 23" 
                         width="24" 
                         xmlns="http://www.w3.org/2000/svg">
                        
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        
                        <path d="M0 0h24v24H0z" 
                              fill="none"/>
                    </svg>
                </button>
            </form>
        )}
    }


export default withRouter(Header); 

/*Explanation: withRouter is used to obtain the current active url pathName for the purposes of gallery updating on form submission. 
Despite the Header name, the rendered HTML is actually a form element. */