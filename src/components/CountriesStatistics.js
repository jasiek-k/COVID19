import React from 'react'
import './../style/theme.css'

export default class CountriesStatistics extends React.Component {

    render() {
        return (
            <React.Fragment>              
                <table className="Countries-stats-table">
                    <thead className="Countries-table-header">
                        <tr key={Math.random()}>{}
                            <th className="Countries-header-item">COUNTRY</th>
                            <th className="Countries-header-item">CONFIRMED</th>
                            <th className="Countries-header-item">DEATHS</th>
                            <th className="Countries-header-item">RECOVERED</th>
                        </tr>                         
                    </thead>
                    <tbody className="Countries-table-body">
                        {
                            this.props.countriesStatsContent.length > 0 ? (
                                this.props.countriesStatsContent.map((item, index) => {
                                    return <tr key={index}className="Countries-table-row">
                                        <td onClick={this.props.displayModal} 
                                            className="Countries-table-item">{item.Country}</td>
                                        <td className="Countries-table-item">{item.TotalConfirmed}</td>
                                        <td className="Countries-table-item">{item.TotalDeaths}</td>
                                        <td className="Countries-table-item">{item.TotalRecovered}</td>
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
