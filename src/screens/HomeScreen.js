import React, { Fragment } from 'react';

import { ScrollView, StyleSheet,Platform,Text, View, TouchableOpacity, Dimensions, Alert, LayoutAnimation, UIManager, TouchableHighlight} from 'react-native';
import {ButtonGroup, SearchBar} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {widthPercentageToDP as widthDP, listenOrientationChange, removeOrientationListener} from 'react-native-responsive-screen'
import {Button} from '../components/ui/Button'
import RefreshButton from "../components/ui/RefreshButton.js"
import {Card} from "../components/ui/Card.js";
import SearchButton from '../components/ui/SearchButton.js';
import FavoritesIcon from "../components/ui/FavoritesIcon.js";
import Colors from "../common/Colors";


import HTMLView from 'react-native-htmlview';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true); // Needed for Android
var searchBarTransition = {
  duration: 125,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  }
};

@inject("rootStore")
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state;

    return {
      
      headerRight: (
          <SearchButton openSearchBar={params.handleSeach}/>
      ),
      headerLeft: (
          <RefreshButton />
      ), headerStyle: {

        backgroundColor: Colors.navBarBackground,
        marginTop: 10,
        paddingBottom: 10,
        height: 50,
        elevation: 0, //Removes the underline from nav
        borderBottomWidth: 0,
      }
    };
  }

  state = {
    algorithms: [],
    searchText: "",
    selectedIndex: 0, 
    popUpSearch: false
  };

  componentDidMount() {

    //Sets the parametors that are passed to the navigationOpions. 
    this.props.navigation.setParams({
      handleSeach: this.setSearchState
    });

    listenOrientationChange(this);
    this.props.rootStore.algorithmStore.getOrFindAll().then(res => {
      this.setState({
        algorithms: res
      });
    });
  }

  componentWillUnmount() {
    removeOrientationListener();
  }

  //Sets the state of if the serch bar should pop up based on the header icon press. 
  setSearchState = () =>  { 
    if (this.state.popUpSearch == false){
      this.setState({ popUpSearch: true}, function() { 
        this.renderSearch()
      });
    }else { 
      this.setState({ popUpSearch: false})
      this.renderSearch()
    }
  }

  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex })
  }

  //Renders the search bar bellow header. 
  renderSearch = () => {

    LayoutAnimation.configureNext(searchBarTransition);
    if(this.state.popUpSearch == true){
    return(
      <SearchBar
        placeholder="Search algorithm..."
        onChangeText={this.updateSearch}
        value={this.state.searchText}
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchBarInput}
        clearIcon
        autoFocus={true}
      />
    );}else { 
      return null
    }
  };

  updateSearch = text => {
    this.setState({ searchText: text });
  };

  renderAlgorithm = (navigate, algorithm, search) => {
    // Algorithm renders if search text is empty or search text matches algorithm name
    var name = algorithm.Name.toLowerCase();
    var search = search.toLowerCase();
    var match = name.includes(search) && name !== '' && search !== '';

    let content = (
    <Card
      title={algorithm.Name}
      bodyText={algorithm.ShortDescription}
      favIcon={<FavoritesIcon isSelected={algorithm.IsFavorited}/>}
      >
      <View style={styles.buttonContiner}>
        <Button
          onPress={() =>
            navigate("AlgDescription", { algorithm: algorithm })
          }
        >
          Info
            </Button>
        <Button
          onPress={() =>
            navigate("Conversation", { algorithm: algorithm })
          }
        >
          Start
            </Button>
      </View>
    </Card>)

    if (this.state.selectedIndex == 1 && algorithm.IsFavorited == 1 && (this.state.searchText === '' || match)) {
      return (
        content
      )
    }else if (this.state.selectedIndex == 0 && (this.state.searchText === '' || match)) { 
      return (
        content
      )
    }
  };

  render() {
    const { algorithms } = this.state;
    const { navigate } = this.props.navigation;

    const buttons = ['All', 'Favorites']
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.outerButtonGroupContainer}>
        <ButtonGroup
          buttons={buttons}
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          containerStyle={styles.buttonGroupContainer}
          buttonStyle={styles.buttonGroup}
          selectedButtonStyle={styles.buttonGroupEnabled}
          selectedTextStyle={{ color: "white" }}
          textStyle={{ color: "white", fontSize: 18}}
          innerBorderStyle={{ width: 1.5, color: "#ee3e41" }}
        /></View>
        <ScrollView>
          {this.renderSearch()}
          <View style={setViewStyle()}>
            {algorithms.map(algorithm =>
              this.renderAlgorithm(
                navigate,
                algorithm,
                this.state.searchText
              )
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const setViewStyle = function() {
    if (Dimensions.get('window').width > 500) {
        return {
            flexWrap      : 'wrap',
            flexDirection : 'row',
            justifyContent: 'center'
        }
    }
    else {
        return {
            flexWrap: 'wrap'
        }
    }
}

const setAlgContainerStyle = function() {
    if (Dimensions.get('window').width > 1000) {
        return {
            width   : widthDP('30%'),
            flexGrow: 1,
            maxWidth: widthDP('30%')
        }
    }
    else if (Dimensions.get('window').width > 500) {
        return {
            width   : widthDP('43%'),
            flexGrow: 1,
            maxWidth: widthDP('43%')
        }
    }
    else {
        return {
            flex: 1
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: "#fff"
  },
  outerButtonGroupContainer: {
    // backgroundColor: "#ee3e41",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2
      }
    })
  },
  buttonGroupContainer: {
    height: 50,
    marginTop: -3,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    borderWidth: 0,
    ...Platform.select({
      android: {
        borderBottomColor: "rgba(0, 0, 0, 0.08)",
        borderBottomWidth: 3
      }
    })
  },
  buttonGroup: {
    backgroundColor: Colors.PCH_RED,
    paddingTop: 10
  },
  buttonGroupEnabled: {
    backgroundColor: Colors.PCH_RED,
    borderTopColor: Colors.PCH_RED,
    borderBottomColor: "white",
    borderBottomWidth: 3
  },
  titleText: {
    fontSize: 20,
    marginBottom: 30
  },
  descriptionText: {
    marginBottom: 10
  },
  buttonContiner: {
    flexDirection: "row" //Aligns buttons next to one another.
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 15,
    borderRadius: 5
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  searchBarInput: {
    backgroundColor: "#eaeaea"
  }
});
