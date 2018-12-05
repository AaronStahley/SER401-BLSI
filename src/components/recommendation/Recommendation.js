import React from 'react';
import {Text, StyleSheet} from 'react-native';
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
            <Grid>
                <Row>
                    <Col size={1}>
                        <Text style={styles.icon}> </Text>
                    </Col>
                    <Col size={18}>
                        <Text>{recommendation.Title}</Text>
                    </Col>
                    <Col size={2}>
                        {
                            recommendation.Description &&
                            <Icon name='info' color={Colors.moreInfoIcon} containerStyle={styles.moreInfo}
                                  onPress={this.handelMoreInfoClick}/>
                        }
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default withNavigation(Recommendation);

const styles = StyleSheet.create({
    icon    : {    //Used for the recommendation side of createImage()
        backgroundColor  : Colors.recommendationNumberBorder,
        marginTop        : 5,
        paddingTop       : 5,
        paddingBottom    : 5,
        paddingHorizontal: 5,
        borderRadius     : 5,
        width            : "100%",
        height           : "100%",
        maxHeight        : 10,
        maxWidth         : 10,
        color            : 'white'
    },
    moreInfo: {    //Used for the recommendation side of createImage()
        marginTop: 5
    },
});