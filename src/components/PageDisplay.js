import React from 'react'
import axios from 'axios'
import './../style/theme.css'
import CountriesStatistics from './CountriesStatistics'
import GlobalStatistics from './GlobalStatistics'
import CountriesModal from './CountriesModal'
import CountriesList from './CountriesList'

export default class PageDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      global: [],
      countries: [],
      displayedCountries: [],
      searchInput: '',
      modalContent: {},
      ifStats: true
    }
    this.getContent = this.getContent.bind(this)
  }

  componentDidMount() {
    this.getContent()
  }

  getContent = () => {
    axios.get(`https://api.covid19api.com/summary`)
        .then(res => {
          if (res.status === 200) {
            const content = res.data
            this.setState({
              global: {...content.Global},
              countries: [...content.Countries],
              displayedCountries: [...content.Countries]
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
    const countriesToDisplay = []

    for (let i = 0; i < countriesArray.length; i++) {
      if (countriesArray[i].Country.toLowerCase().
          includes(searchInput.toLowerCase()) ||
      searchInput.toLowerCase().
          includes(countriesArray[i].Country.toLowerCase())) {
        countriesToDisplay.push(countriesArray[i])
      }
    }
    this.setState({
      displayedCountries: countriesToDisplay
    })
  }

  displayModal = e => {
    const countriesArray = [...this.state.countries]
    const displayedCountry = countriesArray.find(
        c => e.target.innerText === c.Country
    )

    axios.get(`https://api.covid19api.com/live/country/${displayedCountry.Slug}/status/confirmed`)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              modalContent: {country: displayedCountry, data: res.data}
            })
          }
        })
    document.getElementById('Page-switch-button').style.display = 'none'
  }

  refreshSearching = () => {
    this.setState({
      displayedCountries: [...this.state.countries],
      searchInput: ''
    })
    document.getElementById('Countries-search-input').value = ''
  }

  closeModal = () => {
    document.getElementById('Page-switch-button').style.display = 'block'
    this.setState({
      modalContent: {}
    })
  }

  changeDisplay = () => {
    this.setState(prevState => ({
      ifStats: !prevState.ifStats
    }))
  }

  render() {
    return (
      <div className="Page-display-container">
        <div className="Page-display-logo">
          <p className="Logo-top-line">
            COVID
            <span className="Logo-top-number">
            19
            </span>
          </p>
          <p className="Logo-bottom-line">STATISTICS</p>
        </div>
        <div className="Page-display-content">
          {
              !!this.state.countries.length ? (
                <React.Fragment>
                  <GlobalStatistics
                    globalStatsContent={{...this.state.global}}/>
                  <hr className="Divider-line"/>
                  <div className="Countries-stats-container">
                    <p className="Countries-stats-caption">
                      #COUNTRIES
                    </p>
                    <div className="Page-buttons-row">
                      <form className="Countries-search-form"
                        onSubmit={this.searchForCountries}>
                        <input className="Countries-search-input"
                          id="Countries-search-input"
                          onChange={this.updateSearchForm} type="text"
                          placeholder='Find your country'></input>
                        <button className="Countries-search-button"
                          type="submit">
                          SEARCH
                        </button>
                      </form>
                      <button className="Page-refresh-button"
                        onClick={this.refreshSearching}>
                          REFRESH
                      </button>
                      <button className="Page-switch-button"
                        id="Page-switch-button"
                        onClick={this.changeDisplay}>
                        {
                          this.state.ifStats ? (
                            <React.Fragment>
                              LIST ALL COUNTRIES
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              SHOW STATISTICS
                            </React.Fragment>
                          )
                        }
                      </button>
                    </div>
                    {
                      !!Object.keys(this.state.modalContent).length ? (
                        <CountriesModal closeModal={this.closeModal}
                          modalContent={{...this.state.modalContent}}/>
                          ) : (
                            this.state.ifStats ? (
                            <CountriesStatistics
                              displayModal={this.displayModal}
                              countriesStatsContent={
                                [...this.state.displayedCountries]
                              }
                            />) : (
                            <CountriesList
                              displayModal={this.displayModal}
                              countriesListContent={
                                [...this.state.displayedCountries]
                              }
                            />)
                          )
                    }
                  </div>
                </React.Fragment>
                ) : (
                  <p className="Page-display-error">
                    An error occured. Refresh the page.
                  </p>
                )
          }
        </div>
      </div>
    )
  }
}

