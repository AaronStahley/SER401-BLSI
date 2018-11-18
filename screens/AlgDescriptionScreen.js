import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

export default class AlgDescriptionScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>NOM BLSI</Text>
                    <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis turpis lectus, a ornare turpis commodo ut. In ut nibh nec ante commodo hendrerit. Fusce gravida dolor urna, vitae scelerisque mauris imperdiet non. Pellentesque suscipit, magna nec ultrices pulvinar, nisi ante feugiat enim, non ultricies odio risus sed ipsum. Donec pretium augue non maximus maximus. Etiam interdum quis mi a rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam eget placerat nisl, eu tempus augue. In lacinia velit in leo auctor, non convallis ex aliquet. Morbi in ligula vel justo tempor dictum. Curabitur in eros quis massa ultricies interdum. Curabitur ex est, porta nec porttitor sit amet, rutrum non sem. Suspendisse potenti.</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
    },
    descriptionText: {
        paddingHorizontal: 20
    }
});
