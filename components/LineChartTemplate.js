import React from 'react'
import {View, Text, Dimensions} from 'react-native';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class LineChartTemplate extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const contentInset = {top: 10, bottom: 10, right: 100, left: 100};
        const dim = Dimensions.get('window');
        return (
            <View style={{height: 500, padding: 20, flexDirection: 'row'}}>
                <Text style={{marginLeft: -10, marginRight: -50,  marginTop: 0}}>{this.props.yaxis}</Text>
                <YAxis
                    style={{marginBottom: 30}}
                    data = {this.props.data}
                    formatLabel={(value, index) => value + ' Hb'}
                    contentInset={contentInset}
                    svg={{fontSize: 14, fill: '#000'}}            
                />
                
                <View style={{flex: 1, marginLeft: 10}}>  
                    <LineChart 
                        style = {{flex: 1}}
                        data = {this.props.data}
                        contentInset={{top: 10, bottom: 0, right: 100, left: 100}}
                        curve={shape.curveLinear}
                        svg={{stroke: '#f006'}}
                    >
                        <Grid direction={Grid.Direction.BOTH}/>
                    </LineChart>  
                
                    <XAxis
                        style={{height: 10, marginTop: 10}}
                        data = {this.props.data}
                        formatLabel={(value, index) => index + 1 }
                        contentInset={{top: 0, bottom: 0, right: 100, left: 100}}
                        svg={{fontSize: 14, fill: '#000'}}  
                    />
                    <Text style={{justifyContent: 'center', alignSelf: 'center'}}>
                        {this.props.xaxis}
                    </Text>
                </View>
                
            </View>
            
            
        )
    }
}