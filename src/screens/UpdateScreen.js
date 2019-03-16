import React, {Fragment} from 'react';

import {
    ScrollView,
    StyleSheet,
    Platform,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
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
import RefreshAllButton from "../components/ui/RefreshAllButton.js"
import {Button} from '../components/ui/Button'
import {Card} from "../components/ui/Card.js";
import SearchButton from '../components/ui/SearchButton.js';
import Colors from "../common/Colors";
import {retrieveAlgorithms, retrieveAlgorithm} from "../services/fetchAlgorithms";
import { errorAlert } from '../components/ui/AlertBox.js';

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
        popUpSearch  : false
    };

    getAlgorithms = () => {
        return retrieveAlgorithms()
            .then((res) => {
                this.setState({
                    algorithms: res
                })
                console.log(res);
                if(res.length === 0){
                    errorAlert("No algorithms available.", 
                        "Try again later");
                }
            }).catch((err) => {console.log(err)});
    }

    componentDidMount() {
        //Sets the parametors that are passed to the navigationOpions.
        this.props.navigation.setParams({
            handleSeach: this.setSearchState
        });
        listenOrientationChange(this);
        this.getAlgorithms()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.algorithms !== this.state.algorithms) {
            this.getAlgorithms()
        }
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

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
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

    renderAlgorithm = (navigate, algorithm, search) => {
        // Algorithm renders if search text is empty or search text matches algorithm name
        var name   = algorithm.name.toLowerCase();
        var search = search.toLowerCase();
        var match  = name.includes(search) && name !== '' && search !== '';

        let content = (
            <Card
                title={algorithm.name}
                bodyText={algorithm.ShortDescription}
                key={algorithm.id}
                containerStyle={setCardStyle()}
            >
                <View style={styles.buttonContiner}>
                    
                </View>
            </Card>)

            return content;
    };

    render() {
        const {algorithms} = this.state;
        const {navigate}   = this.props.navigation;
        const {selectedIndex} = this.state

        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={this.getAlgorithms}
                    style={styles.refreshButtonContainer}
                >
                    <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
                <ScrollView>
                    {this.renderSearch()}
                    <View style={setViewStyle()}>
                        {console.log(this.state.algorithms)}
                        {/*algorithms.map(algorithm =>
                            this.renderAlgorithm(
                                navigate,
                                algorithm,
                                this.state.searchText
                            )
                            )*/}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const setViewStyle = function () {
    if (Dimensions.get('window').width > 500) {
        return {
            flexWrap      : 'wrap',
            flexDirection : 'row',
            justifyContent: 'center'
        }
    } else {
        return {
            flexWrap: 'wrap'
        }
    }
}

const setCardStyle = function () {
    if (Dimensions.get('window').width > 1000) {
        return {
            borderWidth    : 1,
            borderColor    : "#e5ebf0",
            padding        : 15,
            margin         : 15,
            flex           : 1,
            backgroundColor: '#fff',
            width          : '33%'
        }
    } else if (Dimensions.get('window').width > 500) {
        return {
            borderWidth    : 1,
            borderColor    : "#e5ebf0",
            padding        : 15,
            margin         : 15,
            flex           : 1,
            backgroundColor: '#fff',
            width          : '50%'
        }
    } else {
        return {
            borderWidth    : 1,
            borderColor    : "#e5ebf0",
            padding        : 15,
            margin         : 15,
            flex           : 1,
            backgroundColor: '#fff'
        }
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: Colors.PCH_RED,
        marginTop   : 10,
        marginLeft  : 10,
        marginRight : 10,
        borderRadius: 5
    },
    refreshButtonText : {
        color : "#fff"
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
