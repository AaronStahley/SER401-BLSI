import React from "react";
import {View, Text, Dimensions} from "react-native";
import {inject, observer} from "mobx-react/native";
import {Icon} from "expo";

@inject("rootStore")
@observer
export default class ReleaseAlgorithmCard extends React.Component {
    loaded = () => {
        const { 
            loading, 
            rootStore,
            algorithm} = this.props;

        if(loading) {
            return <ActivityIndicator 
                animating={true}
                size="large"
                color="#000"
            />
        }
        else if (rootStore.algorithmStore
            .contains(algorithm.name,
                algorithm.algorithm_id,
                algorithm.version_number)) {
            
            return <Icon.Ionicons style={styles.ion}
                    color={"#000"}
                    size={30}
                    name = "ios-checkmark-circle-outline" />
        }
    }

    render() {
        const {algorithm} = this.props;

        return (<View  
            style={setCardStyle()}>
                <View>
                    <Text>
                        {algorithm.name}         
                    </Text>
                    <Text>
                        {"Version: " + algorithm.version_number}         
                    </Text>
                    <Text>
                        {"Algorithm ID: " + algorithm.algorithm_id}         
                    </Text>
                    <View style={styles.loader}>{this.loaded()}</View>
                </View>
            </View>
        );
    }
}

const styles = {
    loader : {
        flexDirection: "row",
        position: "absolute",
        right: 0
        
    },
    ion: {
        marginLeft: 10,
        marginTop: 5
    }

}

const setCardStyle = function () {
    if (Dimensions.get('window').width > 1000) {
        return {
            borderWidth: 1,
            borderColor: "#e5ebf0",
            padding: 15,
            margin: 15,
            flex: 1,
            backgroundColor: '#fff',
            width: '33%'
        }
    } else if (Dimensions.get('window').width > 500) {
        return {
            borderWidth: 1,
            borderColor: "#e5ebf0",
            padding: 15,
            margin: 15,
            flex: 1,
            backgroundColor: '#fff',
            width: '50%'
        }
    } else {
        return {
            borderWidth: 1,
            borderColor: "#e5ebf0",
            padding: 15,
            margin: 15,
            flex: 1,
            backgroundColor: '#fff'
        }
    }
}