import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, TouchableHighlight} from 'react-native';
import {Card,ButtonGroup} from 'react-native-elements'
import { Icon } from "expo";
import {inject, observer} from 'mobx-react/native'
import {widthPercentageToDP as widthDP, listenOrientationChange, removeOrientationListener} from 'react-native-responsive-screen'
import { retriveAlgorithms } from "../services/fetchAlgorithms";
import {Button} from '../components/ui/Button'

import HTMLView from 'react-native-htmlview';

@inject("rootStore")
@observer
export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    //Fixes Error where PCH Icon shifts to the right
    headerLeft: (
      <View >
      </View> 
    ), 
    headerRight: (
      <View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Get New Algorithms?  ",
              "Do you want to add new alogorithms to your list?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Yes", onPress: () => retriveAlgorithms() }
              ]
            )
          }
        >
          <Icon.Ionicons
            style={{ marginRight: 10, marginTop: 5 }}
            color={"#fff"}
            size={30}
            name="ios-refresh"
          />
        </TouchableOpacity>
      </View>
    )
  });

  state = {
    algorithms: []
  };

  componentDidMount() {
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
          <View style={setViewStyle()}>
            {algorithms.map(algorithm => (
              <Card
                key={algorithm.Id}
                title={algorithm.Name}
                containerStyle={setAlgContainerStyle()}
              >
                <Text style={{ marginBottom: 10 }}>
                  {algorithm.ShortDescription}
                </Text>
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
  }
});
