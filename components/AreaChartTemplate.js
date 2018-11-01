import React from 'react'
import {AreaChart, Grid, XAxis, YAxis} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class AreaChartTemplate extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = [5.6, 6.8, 6.2, 6.4, 6.9, 7.1];
        return (
            <AreaChart 
                style = {{height:200}}
                data = {data}
                contentInset={{top:30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{fill: '#f03b'}}
            >
                <Grid/>
            </AreaChart>   
        )
    }
}

/**
                <XAxis
                    style={{marginHorizontal: -10}}
                    data = {data}
                    formatLabel={(value, index) => index }
                    contentInset={{left: 10, right: 10}}
                    svg={{fontSize:10, fill: '#000'}}  
                />
                <YAxis
                    style={{marginVertical: 0}}
                    data = {data}
                    formatLabel={(value, index) => value}
                    contentInset={{top: 10, bottom: 10}}
                    svg={{fontSize:10, fill: '#000'}}
                />
 */