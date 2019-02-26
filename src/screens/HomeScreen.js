import React, { Fragment } from 'react';

import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, TouchableHighlight} from 'react-native';
import {ButtonGroup, SearchBar} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {widthPercentageToDP as widthDP, listenOrientationChange, removeOrientationListener} from 'react-native-responsive-screen'
import {Button} from '../components/ui/Button'
import RefreshButton from "../components/ui/RefreshButton.js"
import {Card} from "../components/ui/Card.js";
import SearchButton from '../components/ui/SearchButton.js';

import HTMLView from 'react-native-htmlview';

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
        )
    
    };
  }

  state = {
    algorithms: [],
    searchText: "",
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

  //Renders the search bar bellow header. 
  renderSearch = () => {

    if(this.state.popUpSearch == true){
    return(
      <SearchBar
        placeholder="Search algorithm..."
        onChangeText={this.updateSearch}
        value={this.state.searchText}
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchBarInput}
        clearIcon
      />
    );}else { 
      return null
    }
  };

  updateSearch = text => {
    this.setState({ searchText: text });
  };

  render() {
    const { algorithms } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ButtonGroup
          buttons={["All", "Favorites"]}
          containerStyle={styles.buttonGroupContainer}
        />
        <ScrollView>
          {this.renderSearch()}
          <View style={setViewStyle()}>
            {algorithms.map(algorithm => (
              <Card
                title={algorithm.Name}
                bodyText={algorithm.ShortDescription}
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
              </Card>
            ))}
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
    backgroundColor: "#fff"
  },
  buttonGroupContainer: {
    height: 25,
    marginLeft: -10,
    marginRight: null,
    marginTop: -.1,
    width: "105%",
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
    backgroundColor  : '#fff',
    borderTopColor   : 'transparent',
    borderBottomColor: 'transparent'
  },
  searchBarInput: {
    backgroundColor: '#eaeaea'
  }
});
