import React from 'react'
import './../style/theme.css'

export default class CountriesStatistics extends React.Component {
    
    render() {
        const {TotalConfirmed, TotalDeaths, TotalRecovered} = this.props.globalStatsContent

        return (
                <div className="Global-stats-container">
                    <p className="Global-caption">#GLOBAL</p>
                    <div className="Global-single-stat">
                        <p className="Global-single-caption">TOTAL CONFIRMED</p>
                        <span className="Global-single-value">{TotalConfirmed}</span>
                    </div>
                    <div className="Global-single-stat">
                        <p className="Global-single-caption">TOTAL DEATHS</p>
                        <span className="Global-single-value">{TotalDeaths}</span>
                    </div>
                    <div className="Global-single-stat">
                        <p className="Global-single-caption">TOTAL RECOVERED</p>
                        <span className="Global-single-value">{TotalRecovered}</span>  
                    </div>
                </div>
        )
    }
}
