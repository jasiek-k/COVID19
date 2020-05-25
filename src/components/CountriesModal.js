import React from 'react'
import './../style/theme.css'
import {CloseIcon} from './icon'
import {VictoryChart, VictoryLine, VictoryBrushContainer,
  VictoryZoomContainer, VictoryAxis} from 'victory'

export default class CountriesModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zoomDomain: {}
    }
  }

  handleZoom = domain => {
    this.setState({zoomDomain: domain})
  }

  componentDidMount = () => {
    const {data} = this.props.modalContent
    const startDate = new Date(data[0].Date)
    const endDate = new Date(data[data.length - 1].Date)
    this.setState({
      zoomDomain: {x: [startDate, endDate]}
    })
  }

  render() {
    const {country, data} = this.props.modalContent
    const {Country, TotalConfirmed, TotalDeaths, TotalRecovered} = country
    const confirmedData = []
    const deathsData = []
    const recoveredData = []

    for (let i = 0; i < data.length; i++) {
      const {Confirmed, Deaths, Recovered} = data[i]
      const dateTime = new Date(data[i].Date)
      confirmedData.push({x: dateTime, y: Confirmed})
      deathsData.push({x: dateTime, y: Deaths})
      recoveredData.push({x: dateTime, y: Recovered})
    }

    const chartArray = [
      {data: confirmedData, color: '#c43a31'},
      {data: deathsData, color: '#373F47'},
      {data: recoveredData, color: '#808080'}
    ]
    const figuresArray = [
      {caption: 'TOTAL CONFIRMED', value: TotalConfirmed},
      {caption: 'TOTAL DEATHS', value: TotalDeaths},
      {caption: 'TOTAL RECOVERED', value: TotalRecovered}
    ]

    return (
      <div className="Countries-modal-container">
        <div onClick={this.props.closeModal}>
          <CloseIcon className="Modal-close-icon"/>
        </div>
        <div className="Country-data">
          <div className="Countries-modal-figure">
            <p className="Modal-figure-country">{Country}</p>
          </div>
          {
            figuresArray.map((item, index) => {
              return <div key={index} className="Countries-modal-figure">
                <div className="Modal-caption-line">
                  <p className="Modal-figure-caption">{item.caption}</p>
                  <span className="Modal-color-dot" style={{backgroundColor: chartArray[index].color}}></span>
                </div>
                <p className="Modal-figure-value">{item.value}</p>
              </div>
            })
          }
        </div>
        <div className="Countries-modal-chart">
          <VictoryChart 
            float={'left'}
            width={535}
            height={220}
            scale={{x: 'time'}}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}/>}>
            {
              chartArray.map((item, index) => {
                return <VictoryLine key={index}
                  style={{data: {stroke: item.color}}}
                  data={item.data}/>
              })
            }
          </VictoryChart>
          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={535}
            height={70}
            scale={{x: 'time'}}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={this.state.zoomDomain}
                onBrushDomainChange={this.handleZoom.bind(this)}/>}>
            <VictoryAxis
              tickFormat={x => {
                let dayString = (new Date(x).getDate() + 1).toString()
                let monthString = (new Date(x).getMonth() + 1).toString()
                if (dayString.length < 2) dayString = '0' + dayString
                if (monthString.length < 2) monthString = '0' + monthString
                return `${dayString}/${monthString}`
              }}/>
            {
              chartArray.map((item, index) => {
                return <VictoryLine key={index}
                  style={{data: {stroke: item.color}}}
                  data={item.data}/>
              })
            }
          </VictoryChart>
        </div>
      </div>
    )
  }
}
