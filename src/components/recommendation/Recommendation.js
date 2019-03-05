import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../../common/Colors';
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";
import Row from "react-native-easy-grid/Components/Row";
import {observer} from "mobx-react/native";
import {Icon} from "react-native-elements";
import { withNavigation } from 'react-navigation';

@observer
class Recommendation extends React.Component {

    handelMoreInfoClick = () => {
        const {navigate}   = this.props.navigation;
        navigate('Recommendation', {recommendation: this.props.recommendation});
    };

    render() {
        let {recommendation, number} = this.props;

        return (
        <View style={styles.mainContainer}>
            <View style={styles.recTextContainer}>
              <Text>
                {`\u2022  `}
                {recommendation.Title}
                {recommendation.Description}
              </Text>
            </View>
            <View style={styles.infoIconContainer}>
                
                {recommendation.Description ?
                    <Icon
                        name="info"
                        color={Colors.moreInfoIcon}
                        onPress={this.handelMoreInfoClick}
                     /> : null
                }
            </View>
        </View>
        );
    }
}

export default withNavigation(Recommendation);

const styles = StyleSheet.create({
    mainContainer: {  //Main container that holds text and icon. 
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between"
    },
    infoIconContainer: {  //Container that holds the info icon
        marginLeft: 5
    },
    recTextContainer : { //Container that holds recomendation text. 
        flex: 1
    }
});