import React from 'react';

import {
    ScrollView,
    StyleSheet,
    Platform,
    View,
    Dimensions,
    LayoutAnimation,
    UIManager, ActivityIndicator,
} from 'react-native';
import {ButtonGroup, SearchBar} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {
    listenOrientationChange,
    removeOrientationListener
} from 'react-native-responsive-screen'
import RefreshAllButton from "../../ui/RefreshAllButton.js"
import SearchButton from '../../ui/SearchButton.js';
import Colors from "../../../common/Colors";
import AlgorithmListItem from "./AlgorithmListItem";
import Loading from "../../ui/Loading";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // Needed for Android
var searchBarTransition = {
    duration: 125,
    update  : {
        type: LayoutAnimation.Types.easeInEaseOut
    }
};

@inject("rootStore")
@observer
export default class HomeComponent extends React.Component {
    static navigationOptions = ({navigation}) => {

        const {params = {}} = navigation.state;

        return {

            headerRight   : (
                <SearchButton openSearchBar={params.handleSeach}/>
            ),
            headerLeft    : (
                <View></View>
                // <RefreshAllButton refreshPage={params.refreshPage}/>
            ), headerStyle: {

                backgroundColor  : Colors.navBarBackground,
                paddingBottom    : 10,
                height           : 50,
                elevation        : 0, //Removes the underline from nav
                borderBottomWidth: 0,
            }
        };
    };

    state = {
        searchText   : "",
        selectedIndex: 0,
        popUpSearch  : false,
        isLoading    : false
    };

    get algorithms() {
        let algorithms;
        if (this.state.selectedIndex === 1) {
            algorithms = this.props.rootStore.algorithmStore.collection.filter(algorithm => algorithm.is_favorite);

        } else if (this.state.selectedIndex === 0) {
            algorithms = this.props.rootStore.algorithmStore.collection;
        }

        return (
            algorithms.filter(algorithm => algorithm.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
        );
    }

    componentDidMount() {
        //Sets the parametors that are passed to the navigationOpions.
        this.props.navigation.setParams({
            handleSeach: this.setSearchState
        });

        this.props.navigation.setParams({
            refreshPage: this.refreshPage
        });

        listenOrientationChange(this);
        this.props.rootStore.algorithmStore.getOrFindAll(true);
    }

    componentWillUnmount() {
        removeOrientationListener();
    }

    //Sets the state of if the serch bar should pop up based on the header icon press.
    setSearchState = () => {
        if (this.state.popUpSearch === false) {
            this.setState({popUpSearch: true}, function () {
                LayoutAnimation.configureNext(searchBarTransition);
            });
        } else {
            this.setState({popUpSearch: false});
            LayoutAnimation.configureNext(searchBarTransition);
        }
    };

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
    };


    updateSearch = text => {
        this.setState({searchText: text});
    };

    //Refreshes that page when called
    refreshPage = (refreshing) => {
        this.setState({isLoading: refreshing});
    };

    render() {
        const {selectedIndex} = this.state;

        if (this.state.isLoading) {
            return <Loading/>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.outerButtonGroupContainer}>
                    <ButtonGroup
                        buttons={['All', 'Favorites']}
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        containerStyle={styles.buttonGroupContainer}
                        buttonStyle={styles.buttonGroup}
                        selectedButtonStyle={styles.buttonGroupEnabled}
                        selectedTextStyle={{color: "white"}}
                        textStyle={{color: "white", fontSize: 18}}
                        innerBorderStyle={{width: 1.5, color: "#ee3e41"}}
                    />
                </View>
                <ScrollView>
                    {
                        this.state.popUpSearch &&
                        <SearchBar
                            placeholder="Search algorithm..."
                            onChangeText={this.updateSearch}
                            value={this.state.searchText}
                            containerStyle={styles.searchBarContainer}
                            inputStyle={styles.searchBarInput}
                            clearIcon
                            autoFocus={true}
                        />
                    }
                    <View style={setViewStyle()}>
                        {this.algorithms.map(algorithm =>
                            <AlgorithmListItem key={algorithm.id} algorithm={algorithm}
                                               navigation={this.props.navigation} 
                                               cardContainerStyle={setCardStyle()}/>
                        )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const setCardStyle = function () {
    if (Dimensions.get('window').width > 1000) {
        return {
            borderWidth    : 1,
            borderColor    : "#e5ebf0",
            padding        : 15,
            margin         : 15,
            backgroundColor: '#fff',
            width          : '33%'
        }
    }
    else if (Dimensions.get('window').width > 750) {
        return {
            borderWidth    : 1,
            borderColor    : "#e5ebf0",
            padding        : 15,
            margin         : 15,
            backgroundColor: '#fff',
            width          : '50%'
        }
    }
    else if (Dimensions.get('window').width > 500) {
        return {
            borderWidth    : 1,
            borderColor    : "#e5ebf0",
            padding        : 15,
            margin         : 15,
            backgroundColor: '#fff',
            flex           : 1,
            width          : '50%'
        }
    }
    else {
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

const setViewStyle = function () {
    if (Dimensions.get('window').width > 500) {
        return {
            flexWrap      : 'wrap',
            flexDirection : 'row',
            justifyContent: 'flex-start'
        }
    }
    else {
        return {
            flexWrap: 'wrap'
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
    buttonGroupContainer     : {
        height      : 50,
        marginTop   : -3,
        marginLeft  : 0,
        marginRight : 0,
        borderRadius: 0,
        borderWidth : 0,
        ...Platform.select({
            android: {
                borderBottomColor: "rgba(0, 0, 0, 0.08)",
                borderBottomWidth: 3
            }
        })
    },
    buttonGroup              : {
        backgroundColor: Colors.PCH_RED,
        paddingTop     : 10
    },
    buttonGroupEnabled       : {
        backgroundColor  : Colors.PCH_RED,
        borderTopColor   : Colors.PCH_RED,
        borderBottomColor: "white",
        borderBottomWidth: 3
    },
    titleText                : {
        fontSize    : 20,
        marginBottom: 30
    },
    descriptionText          : {
        marginBottom: 10
    },
    buttonContiner           : {
        flexDirection: "row" //Aligns buttons next to one another.
    },
    bodyText                 : {
        fontSize    : 16,
        marginBottom: 15,
        borderRadius: 5
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
