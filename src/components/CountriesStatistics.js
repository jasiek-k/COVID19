import React from 'react'
import './../style/theme.css'


export default class CountriesStatistics extends React.Component {
  render() {
    const headerArray = ['COUNTRY', 'CONFIRMED', 'DEATHS', 'RECOVERED']

    return (
      <React.Fragment>
        <table className="Countries-stats-table">
          <thead className="Countries-table-header">
            <tr>
              {
                headerArray.map((item, index) => {
                  return <th key={index}
                    className="Countries-header-item">
                    {item}
                  </th>
                })
              }
            </tr>
          </thead>
          <tbody className="Countries-table-body">
            {
              !!this.props.countriesStatsContent.length ? (
                this.props.countriesStatsContent.map((item, index) => {
                  return <tr key={index}
                    className="Countries-table-row">
                    <td onClick={this.props.displayModal}
                      className="Countries-table-item">{item.Country}
                    </td>
                    <td className="Countries-table-item">{item.TotalConfirmed}
                    </td>
                    <td className="Countries-table-item">{item.TotalDeaths}
                    </td>
                    <td className="Countries-table-item">{item.TotalRecovered}
                    </td>
                  </tr>
                })) : (
                  <tr>
                    <td className="Table-error-message">
                      No matching countries found. Try again.
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}
