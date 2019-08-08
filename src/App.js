//Fullstack JS Project 9: React Photo Gallery App. 

//App Component. 

//A. Necessary Imports 

import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import clientId from './config';
import Gallery from './Components/Gallery'; 
import Header from './Components/Header'; 
import Nav from './Components/Nav'; 
import './css/index.css';

//B. Modules

const axios = require('axios')


//C. Class Component and Methods: 
class App extends Component {

  constructor() {
    super(); 
    this.state = {    
      url1: null, 
      url2: null, 
      url3: null,
      photoTheme: ['sunset', 'combat', 'jeep'],
      urlTheme: ['/', '/category1', '/category2']
    }

  };

/*Purpose: 3 Url states to hold 3 arrays of 10 photos each to display in the Gallery components.  PhotoTheme array state contains the query word used to define the 'theme' of the photo fetched. 
The urlTheme array state contains the route names used for the gallery routes.*/

componentDidMount() {
  this.fetchData();
}

/*Purpose: Renders the data fetching method when the component renders/mounts. */

urlSort = (response) => {
  let urlContainer = []; 
        for (let i=0; i < response.data.length; i++) {
          let photo = response.data[i].urls.full
          urlContainer.push(photo); 
        }
  return urlContainer
}

/*Purpose: Takes a response input and extracts the url data from the response object.  The Urls are sorted into a container array and returned */

determinator = (urlContainer, photoTheme) => {
  switch(photoTheme) {
    case this.state.photoTheme[0]:
      this.setState({
        url1: urlContainer,
      })
      break;
    case this.state.photoTheme[1]:
        this.setState({
          url2: urlContainer,
        })
      break;
    case this.state.photoTheme[2]:   
        this.setState({
          url3: urlContainer,
        })
      break;
    default: 
      break;
  } 
}

/*Purpose: Accepts an array of urls and sorts the array into the appropriate state, based on matching the photo theme of the fetch request with the appropriate url state
url1 corresponds to index 0 of photoTheme, url2 to index 1 of photoTheme, and url3 to index 2 of photoTheme*/

fetchData = () => {
  axios.all([
    axios.get(`https://api.unsplash.com/photos/random/?client_id=${clientId}&query=${this.state.photoTheme[0]}&count=10`),
    axios.get(`https://api.unsplash.com/photos/random/?client_id=${clientId}&query=${this.state.photoTheme[1]}&count=10`), 
    axios.get(`https://api.unsplash.com/photos/random/?client_id=${clientId}&query=${this.state.photoTheme[2]}&count=10`)
  ])
  .then(axios.spread((sunsetRes, combatRes, jeepRes) => {
    let responses = [sunsetRes, combatRes, jeepRes];
    for (let i = 0; i < responses.length; i++) {
      let photoTheme = this.state.photoTheme[i]
      let urlContainer = this.urlSort(responses[i]);
      this.determinator(urlContainer, photoTheme);
    }
  }))
  .catch(error => {
      console.log('Data fetch went Kaboom! Go back to the source NEO!', error);
  });
}

/*Purpose: Uses a clientId obtained from the unsplash API and the photoThemes array to fetch 3 sets of 10 photos, based on theme. 
Response objects have photo urls placed into container arrays, and arrays are set to their proper url states by relevant class methods */

update = (themes) => {
    this.setState({
      photoTheme: themes, 
    }); 
    this.fetchData(); 
}

/*Purpose: Event handler that updates photoTheme state with the search term entered into the search input of the 'Header' Component.
On submission of the form in "Header", the themes are updated and a new GET request is made based on the updated photoTheme state.
Handler is mediated from the "Header" component. */

render() {

  if (this.state.url1 === null || this.state.url2 === null || this.state.url3 === null) {return null} //Used as a check to ensure rendering is done upon completion of fetch request.  
  
  return (
  <BrowserRouter>
    <div className="container" >
      <Header update={this.update} 
              photoTheme={this.state.photoTheme}
              urlTheme={this.state.urlTheme}
              />
      <Nav categories={this.state.photoTheme} 
           path={this.state.urlTheme} 
              />

      
      <Route exact path={this.state.urlTheme[0]} render={() =>   <Gallery result={this.state.photoTheme[0]} urls={this.state.url1}/>}/> 
      <Route path={this.state.urlTheme[1]} render={() =>   <Gallery result={this.state.photoTheme[1]} urls={this.state.url2}/>}/> 
      <Route path={this.state.urlTheme[2]} render={() =>   <Gallery result={this.state.photoTheme[2]} urls={this.state.url3}/>}/>
      

    </div>
  </BrowserRouter>

  /*Render contains the child Gallery, Header and Nav components.  Inline rendering is used with route components to render Gallery components upon navigation to the appropriate route. */
  )
}
  }

export default App;

