import React from 'react'
import axios from 'axios'
import './../style/theme.css'
import CountriesStatistics from './CountriesStatistics'
import GlobalStatistics from './GlobalStatistics'
import CountriesModal from './CountriesModal'

export default class PageDisplay extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        global: [],
        countries: [],
        error: '',
        displayedCountries: [],
        searchInput: '',
        modalContent: {}
      }
      this.getContent = this.getContent.bind(this);
    }    

    componentDidMount() {
        this.getContent()
    }

    getContent = () => {
      axios.get(`https://api.covid19api.com/summary`)
        .then(res => {
          if (res.status === 200) {
            const content = res.data;
            this.setState({ 
              global: {...content.Global},
              countries: [...content.Countries],
              //displayedCountries: [...content.Countries]
            })
          }
      })
    }

    updateSearchForm = e => {
      this.setState({
        searchInput: e.target.value
      })
    }

    searchForCountries = e => {
      e.preventDefault()
  
      const countriesArray = [...this.state.countries]
      const searchInput = this.state.searchInput
      let countriesToDisplay = []
      
      for (let i = 0; i < countriesArray.length; i++) {
        let country = countriesArray[i].Country
        if (country.toLowerCase().includes(searchInput.toLowerCase()) || 
        searchInput.toLowerCase().includes(country.toLowerCase())) {
          let clonedCountry = Object.assign({}, countriesArray[i])
          countriesToDisplay.push(clonedCountry)
        }
      }
      this.setState({
        displayedCountries: countriesToDisplay,
      })
    }

    displayModal = e => {
      const countriesArray = [...this.state.countries]
      let clonedCountry = {}

      for (let i = 0; i < countriesArray.length; i++) {
        if (e.target.innerText === countriesArray[i].Country) {
          clonedCountry = Object.assign({}, countriesArray[i])
        }
      }
      axios.get(`https://api.covid19api.com/live/country/${clonedCountry.Slug}/status/confirmed`)
        .then(res => {
          if (res.status === 200) {
            const content = res.data
            this.setState({
              modalContent: { country: clonedCountry, data: content}
            })
          } 
      })     
    }

    refreshSearching = () => {
      this.setState({
        displayedCountries: [...this.state.countries],
        searchInput: ""
      })
      document.getElementById('Countries-search-input').value = ""
    }

    closeModal = () => {
      this.setState({
        modalContent: {}
      })
    }

    print = () => {
      console.log(this.state)
    }
    
    render() {
      return (
        <div className="Page-display-container">
          <div className="Page-display-logo">
            <p className="Logo-top-line">COVID
              <span className="Logo-top-number">19
              </span>
            </p>
            <p className="Logo-bottom-line">STATISTICS</p>
          </div>
            <div className="Page-display-content">
              {
                [...this.state.countries].length !== 0 ? (
                  <React.Fragment>
                    <GlobalStatistics globalStatsContent={{...this.state.global}}/>
                    <hr className="Divider-line"/>
                    <div className="Countries-stats-container">
                      <p className="Countries-stats-caption">#COUNTRIES</p>
                      <div className="Page-buttons-row">
                        <form className="Countries-search-form" onSubmit={this.searchForCountries}>
                          <input  className="Countries-search-input" id="Countries-search-input" 
                                  onChange={this.updateSearchForm} type="text" 
                                  placeholder='Find your country'></input>
                          <button className="Countries-search-button"  type="submit">SEARCH</button>
                        </form> 
                        <button className="Page-refresh-button" onClick={this.refreshSearching}>REFRESH</button>
                      </div>
                      {
                        Object.keys(this.state.modalContent).length !== 0 ? (
                        <CountriesModal closeModal={this.closeModal} 
                                        modalContent={{...this.state.modalContent}}/>
                          ) : (
                            <CountriesStatistics displayModal={this.displayModal} 
                              countriesStatsContent={[...this.state.displayedCountries]}/>                   
                          )
                      } 
                    </div> 
                  </React.Fragment>
                ) : (
                  <p className="Page-display-error">An error occured. Refresh the page.</p>
                )
              }
            </div>            
          </div>
        )
    }
}

