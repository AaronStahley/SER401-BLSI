import React, {Fragment} from 'react';
import {
    ScrollView,
    StyleSheet,
    Platform,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    Alert
} from 'react-native';
import {
    widthPercentageToDP as widthDP,
    listenOrientationChange,
    removeOrientationListener
} from 'react-native-responsive-screen'
import Colors from "../../../common/Colors";
import UpdateAlgorithmList from '../../ui/UpdateAlgorithmList';
import Loading from "../../ui/Loading";
import UpdateAllButton from '../../ui/UpdateAllButton';
import Environment from "../../../common/Environment";

export default class UpdateScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        
        return {
            headerRight   : (
                <UpdateAllButton 
                    refreshPage={params.refreshPage}   
                />
            ),
            headerStyle: {
                backgroundColor: Colors.navBarBackground,
                paddingBottom: 10,
                height: 50,
                elevation: 0, //Removes the underline from nav
                borderBottomWidth: 0,
            }
        };
    }
    
    state = {
        algorithms   : [],
        loading     : true
    };

    componentDidMount() {
        listenOrientationChange(this);
        this.getAlgorithms();
    }

    componentWillUnmount() {
        removeOrientationListener();
    }

    delay = (json) => {
        setTimeout(function () {
            this.setState({
                loading: false,
                algorithms: json.collection
            })  
        }.bind(this), 1200);
    }

    getAlgorithms = async () => {
        const url = `${Environment.API}/release?key=key`; //"http://localhost:3001/release?key=key";
        this.setState({
            loading: true
        });
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            }).then((json) => {
                this.delay(json)                         
            }).catch(err => {
                console.log("No Connection", err);

                setTimeout(function () {
                    Alert.alert(
                        'No Connection',
                        'cannot connect to the server',
                        [
                          {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                      )
                }.bind(this), 1200);
                
            });
    }
    
    render() {
        const {
            algorithms,
            loading,
            refreshPage,
        } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            colors={[Colors.PCH_RED]}
                            tintColor={Colors.PCH_RED}
                            refreshing={this.state.loading}
                            onRefresh={this.getAlgorithms}    
                        />
                    }
                >
                    <UpdateAlgorithmList 
                        algorithms={algorithms} 
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 16
    },
    container                : {
        flex           : 1,
        justifyContent : 'center',
        alignItems     : 'stretch',
        backgroundColor: "#fff"
    },
    outerButtonGroupContainer: {
        position: "relative",
        ...Platform.select({
            ios: {
                shadowOffset : {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius : 2
            }
        })
    },
    refreshButtonContainer     : {
        justifyContent : "center",
        position: "relative",
        flexDirection: "row",
        padding: 10,
        backgroundColor: Colors.PCH_RED,
        marginTop   : 10,
        marginLeft  : 10,
        marginRight : 10,
        borderRadius: 5,
    },
    titleText                : {
        fontSize    : 20,
        marginBottom: 30
    },
    descriptionText          : {
        marginBottom: 10
    },

    searchBarContainer       : {
        backgroundColor  : "#fff",
        borderTopColor   : "transparent",
        borderBottomColor: "transparent"
    },
    searchBarInput           : {
        backgroundColor: "#eaeaea"
    }
});
