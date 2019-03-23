import React from 'react';
import {StyleSheet, View, Dimensions,} from 'react-native';
import {inject, observer} from 'mobx-react/native'
import {Button} from '../../ui/Button'
import {Card} from "../../ui/Card.js";
import FavoritesIcon from "../../ui/FavoritesIcon.js";

@inject("rootStore")
@observer
export default class AlgorithmListItem extends React.Component {

    render() {
        let {algorithm, navigation: {navigate}} = this.props;

        return (
            <Card
                title={algorithm.name}
                bodyText={algorithm.short_description}
                favIcon={<FavoritesIcon algo={algorithm} isSelected={algorithm.is_favorite}/>}
                key={algorithm.id}
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
