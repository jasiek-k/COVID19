import React from 'react'
import './../style/theme.css'

export default class CountriesStatistics extends React.Component {
  formatNumber = number => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  render() {
    const {TotalConfirmed, TotalDeaths, TotalRecovered} =
    this.props.globalStatsContent
    const figuresArrays = [
      {caption: 'TOTAL CONFIRMED', value: TotalConfirmed},
      {caption: 'TOTAL DEATHS', value: TotalDeaths},
      {caption: 'TOTAL RECOVERED', value: TotalRecovered},
    ]

    return (
      <div className="Global-stats-container">
        <p className="Global-caption">#GLOBAL</p>
        {
          figuresArrays.map((item, index) => {
            return <div key={index} className="Global-single-stat">
              <p className="Global-single-caption">{item.caption}</p>
              <span className="Global-single-value">{this.formatNumber(item.value)}</span>
            </div>
          })
        }
      </div>
    )
  }
}
