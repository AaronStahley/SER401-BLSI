import React from "react";
import {View, ActivityIndicator} from "react-native";
import ReleaseAlgorithmCard from "./ReleaseAlgorithmCard"
import UpdateButton from "./UpdateButton"

export default class UpdateAlgorithmList extends React.Component {

    filterAlgorithms(algorithms) {
        //todo
    }

    render = () => {
        const {algorithms} = this.props;

        if(!algorithms || algorithms.length === 0) {
            return <ActivityIndicator 
                animating={true}
                size="large"
                color="#000"
            ></ActivityIndicator>
        }

        return (
            <View>
                {algorithms.map((algo) => {
                    return <ReleaseAlgorithmCard key={algo.id} algorithm={algo}/>
                })}
                <UpdateButton
                    algorithms={this.filterAlgorithms(algorithms)}>
                </UpdateButton>
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