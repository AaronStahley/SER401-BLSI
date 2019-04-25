import React from "react";
import {View, ActivityIndicator} from "react-native";
import UpdateAlgorithmCard from "./UpdateAlgorithmCard"

export default class UpdateAlgorithmList extends React.Component {

    render = () => {
        const {algorithms, loading} = this.props;

        if(loading) {
            return <ActivityIndicator 
                animating={loading}
                size="large"
                color="#000"
            ></ActivityIndicator>
        }

        return (
            <View>
                {algorithms.map((algo) => {
                    return <UpdateAlgorithmCard 
                        key={algo.id} 
                        algorithm={algo}
                        loading={false}
                    />
                })}
            </View>
        );
    };
}

const styles = {
    container: {
        alignItems: 'stretch',
        borderWidth: 1,
        borderColor: "#e5ebf0",
        padding: 15,
        margin: 15,
        flex: 1,
        backgroundColor: '#fff',
        width: '50%'
    },
    text: {
        color : "#000"
    }
}