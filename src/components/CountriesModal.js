import React from 'react'
import './../style/theme.css'
import { CloseIcon } from './../icon'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryContainer, VictoryBrushContainer, VictoryZoomContainer, VictoryAxis } from 'victory'

export default class CountriesModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          zoomDomain: { x: [new Date(2020, 4, 1), new Date(2020, 5, 1)]}
        };
    }
    
    handleZoom = domain => {
        this.setState({ zoomDomain: domain });
    }

    componentDidMount = () => {
        let { data } = this.props.modalContent
        let startDate = new Date(data[0].Date)
        let endDate = new Date(data[data.length - 1].Date)
        this.setState({
            zoomDomain: { x: [startDate, endDate]}
        })
        console.log(data)
    }
      
    render() {
        let { country, data } = this.props.modalContent
        let { Country, TotalConfirmed, TotalDeaths, TotalRecovered } = country

        //console.log(data)
        let confirmedData = []
        let deathsData = []
        let recoveredData = []
        for (let i = 0; i < data.length; i++) {
            let { Confirmed, Deaths, Recovered } = data[i]
            let dateTime = new Date(data[i].Date)
            let dateFormat = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate())
            
            
            //console.log(dateFormat)
            //console.log(dateTime)
            confirmedData.push({ x: dateTime, y: Confirmed })
            deathsData.push({ x: dateTime, y: Deaths })
            recoveredData.push({ x: dateTime, y: Recovered })
        }
        //console.log(confirmedData)

        const linesArray = [
            
<VictoryLine key={0} style={{    
                data: { stroke: "black" },
                
            }}
            data={confirmedData}/>,
<VictoryLine key={1} style={{
                data: { stroke: "#c43a31" },
                
            }}
            data={deathsData}/>,
<VictoryLine key={0} style={{
                data: { stroke: "#A9A9A9" },
               
            }}
    data={recoveredData}/>
           
            
        ]

        return (
            <div className="Countries-modal-container">
                <div onClick={this.props.closeModal}>
                    <CloseIcon  className="Modal-close-icon"/>
                </div>
                <div className="Country-data">
                    <div className="Countries-modal-figure">
                        <p className="Modal-figure-country">{Country}</p>
                    </div>
                    <div className="Countries-modal-figure">
                        <p className="Modal-figure-caption">TOTAL CONFIRMED</p>
                        <p className="Modal-figure-value">{TotalConfirmed}</p>
                    </div>
                    <div className="Countries-modal-figure">
                        <p className="Modal-figure-caption">TOTAL DEATHS</p>
                        <p className="Modal-figure-value">{TotalDeaths}</p>
                    </div>
                    <div className="Countries-modal-figure">
                        <p className="Modal-figure-caption">TOTAL RECOVERED</p>
                        <p className="Modal-figure-value">{TotalRecovered}</p>
                    </div>
                </div>
                <div className="Countries-modal-chart">
                 
        <VictoryChart float={'left'} width={535} height={220} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
            {linesArray}

          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={535} height={70} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={this.state.zoomDomain}
                onBrushDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => {
                let dayString = (new Date(x).getDate() + 1).toString()
                let monthString = (new Date(x).getMonth() + 1).toString()
                if (dayString.length < 2) dayString = '0' + dayString
                if (monthString.length < 2) monthString = '0' + monthString
                return `${dayString}/${monthString}`
              }}
            />
            {linesArray}
          </VictoryChart>
      </div>
                </div>
           
        )
    }
}
//containerComponent={<VictoryContainer responsive={false}/>}