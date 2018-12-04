import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Colors from '../common/Colors';
import {observer} from 'mobx-react/native';
import NextStateContainer from "../components/state/NextStateContainer";

@observer
export default class ConversationScreen extends React.Component {
    scrollView;

    render() {
        let {navigation} = this.props;
        const algorithm  = navigation.getParam('algorithm', null);

        return (
            <ScrollView
                style={styles.root}
                ref={ref => this.scrollView = ref}
                contentContainerStyle={styles.container}
                indicatorStyle={'default'}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({animated: true});
                }}
            >
                <NextStateContainer nextStateId={algorithm.StateIdStart}/>
            </ScrollView>);
    }
}

const styles = StyleSheet.create({
    root     : {
        backgroundColor: Colors.conversationBackground
    },
    container: {
        paddingTop   : 10,
        paddingBottom: 50
    }
});

