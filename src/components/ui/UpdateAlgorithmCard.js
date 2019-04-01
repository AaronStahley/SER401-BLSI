import React from "react";
import {View, Text, Dimensions, TouchableOpacity} from "react-native";
import {inject, observer} from "mobx-react/native";
import {Icon} from "expo";
import Colors from "../../common/Colors";

@inject("rootStore", "releaseImporter")
@observer
export default class UpdateAlgorithmCard extends React.Component {

    algOnPress = async () => {
        return this.props.releaseImporter.updateAll()
            .catch(err => {
            console.log(err);
            errorAlert("Data not available",
                "Currently not able to connect to service.");
        });
    };

    contains = (algorithm) => {
        let {
            rootStore
        } = this.props;

        let exists = false;
        rootStore.algorithmStore.collection.forEach((item) => {
            let version = Math.round(item.version_number * 100) / 100
            if (item.id === algorithm.algorithm_id &&
                    version === algorithm.version_number) {
                exists = true;
            }
        })
        return exists;
    }
    
    loaded = (json) => {
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
        else if (this.contains(algorithm)) {            
            return <Icon.Ionicons
                    color={"#090"}
                    size={30}
                    name = "ios-checkmark-circle" />
        }
        else {
            return <TouchableOpacity
                style={styles.ion}
                onPress={() => this.algOnPress()}
            >
                <Icon.Ionicons 
                    color={"#fff"}
                    size={30}
                    name = "ios-arrow-round-down"
                />
            </TouchableOpacity>
        }
    }

    render() {
        const {algorithm} = this.props;
        const json = algorithm.algorithm_json

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
                        {"Date Modified: " + json.date_modified}         
                    </Text>
                    <Text>
                        {"Algorithm ID: " + algorithm.algorithm_id}         
                    </Text>
                    <View style={styles.loader}>{this.loaded(json)}</View>
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
        marginHorizontal: 5,
        padding: 0,
        paddingHorizontal: 10,
        borderColor: Colors.PCH_RED,
        backgroundColor: Colors.PCH_RED,
        borderStyle: "solid",
        borderRadius: 20,
        borderWidth: 1,
    },
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