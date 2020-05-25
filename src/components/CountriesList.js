import React from 'react'

export default class CountriesList extends React.Component {
  render() {
    return (
      <ul className="Countries-list-container">
        {
          this.props.countriesListContent.map((item, index) => {
            return <li key={index}
              className="Countries-list-item"
              onClick={this.props.displayModal}>
              {item.Country}
            </li>
          })
        }
      </ul>
    )
  }
}
