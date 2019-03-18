import React, {Fragment} from 'react';
import {
    ScrollView,
    StyleSheet,
    Platform,
    Text,
    View,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
} from 'react-native';
import {SearchBar} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {
    widthPercentageToDP as widthDP,
    listenOrientationChange,
    removeOrientationListener
} from 'react-native-responsive-screen'
import SearchButton from '../components/ui/SearchButton.js';
import Colors from "../common/Colors";
import UpdateAlgorithmList from '../components/ui/UpdateAlgorithmList';
import {retrieveAlgorithms} from '../services/fetchAlgorithms'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // Needed for Android
var searchBarTransition = {
    duration: 125,
    update  : {
        type: LayoutAnimation.Types.easeInEaseOut
    }
};

@inject("rootStore")
@observer
export default class UpdateScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        return {
            headerRight   : (
                <SearchButton openSearchBar={params.handleSeach}/>
            ),
            headerStyle: {
                backgroundColor  : Colors.navBarBackground,
                marginTop        : 10,
                paddingBottom    : 10,
                height           : 50,
                elevation        : 0, //Removes the underline from nav
                borderBottomWidth: 0,
            }
        };
    }
    
    state = {
        algorithms   : [],
        searchText   : "",
        selectedIndex: 0,
        popUpSearch  : false,
        loading     : true
    };

    async componentDidMount() {
        //Sets the parametors that are passed to the navigationOpions.
        this.props.navigation.setParams({
            handleSeach: this.setSearchState
        });
        listenOrientationChange(this);
        this.getAlgorithms();
        this.props.rootStore.algorithmStore.getOrFindAll(true); //get updated collection
    }

    componentWillUnmount() {
        removeOrientationListener();
    }

    //Sets the state of if the serch bar should pop up based on the header icon press.
    setSearchState = () => {
        if (this.state.popUpSearch == false) {
            this.setState({popUpSearch: true}, function () {
                this.renderSearch()
            });
        } else {
            this.setState({popUpSearch: false})
            this.renderSearch()
        }
    }

    //Renders the search bar bellow header.
    renderSearch = () => {

        LayoutAnimation.configureNext(searchBarTransition);
        if (this.state.popUpSearch == true) {
            return (
                <SearchBar
                    placeholder="Search algorithm..."
                    onChangeText={this.updateSearch}
                    value={this.state.searchText}
                    containerStyle={styles.searchBarContainer}
                    inputStyle={styles.searchBarInput}
                    clearIcon
                    autoFocus={true}
                />
            );
        } else {
            return null
        }
    };

    updateSearch = text => {
        this.setState({searchText: text});
    };

    getAlgorithms = async () => {
        return await retrieveAlgorithms()
            .then(res => {
                this.setState({
                    algorithms: res.collection,
                    loading: false
                })
                return res;
            }).catch(err => {
                console.log("No Connection", err);
            });
    }

    render() {
        const {algorithms, loading} = this.state;
        
        if(loading) {
            return <View></View>
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={() => this.getAlgorithms()}
                    style={styles.refreshButtonContainer}
                >
                    <Text style={styles.text}>Refresh List</Text>
                </TouchableOpacity>
                <ScrollView>
                    {this.renderSearch()}
                    <UpdateAlgorithmList 
                        algorithms={algorithms} 
                        loading={loading}/>
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
        // backgroundColor: "#ee3e41",
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
