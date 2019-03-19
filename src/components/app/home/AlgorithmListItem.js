import React, {Fragment} from 'react';

import {
    ScrollView,
    StyleSheet,
    Platform,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Alert,
    LayoutAnimation,
    UIManager,
    TouchableHighlight
} from 'react-native';
import {ButtonGroup, SearchBar} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {observable} from 'mobx'
import {
    widthPercentageToDP as widthDP,
    listenOrientationChange,
    removeOrientationListener
} from 'react-native-responsive-screen'
import RefreshAllButton from "../../ui/RefreshAllButton.js"
import {Button} from '../../ui/Button'
import {Card} from "../../ui/Card.js";
import SearchButton from '../../ui/SearchButton.js';
import FavoritesIcon from "../../ui/FavoritesIcon.js";
import Colors from "../../../common/Colors";

@inject("rootStore")
@observer
export default class AlgorithmListItem extends React.Component {

    render() {
        let {algorithm, navigation: {navigate}} = this.props;

        return (
            <Card
                title={algorithm.Name}
                bodyText={algorithm.ShortDescription}
                favIcon={<FavoritesIcon algo={algorithm} isSelected={algorithm.IsFavorited}/>}
                key={algorithm.Id}
                containerStyle={setCardStyle()}
            >
                <View style={styles.buttonContiner}>
                    <Button
                        onPress={() =>
                            navigate("AlgDescription", {algorithm: algorithm})
                        }
                    >
                        Info
                    </Button>
                    <Button
                        onPress={() =>
                            navigate("Conversation", {algorithm: algorithm})
                        }
                    >
                        Start
                    </Button>
                </View>
            </Card>
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
    buttonContiner: {
        flexDirection: "row" //Aligns buttons next to one another.
    },
    bodyText      : {
        fontSize    : 16,
        marginBottom: 15,
        borderRadius: 5
    }
});
