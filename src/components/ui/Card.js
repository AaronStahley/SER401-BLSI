import React from 'react';
import { Divider } from 'react-native-elements'
import {Text, View, StyleSheet} from 'react-native';

/**
 * A card that holds a title and body text with a favorites star on the 
 * top right.
 * @author Aaron S
 */
const Card = props => { 

    const { children, title, bodyText, favIcon } = props;

    return (
      <View>
        <View style={styles.titleContainer}>
                <View style={styles.titleLeftView}></View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.titleRightView}>
                    {favIcon}
                </View>
        </View>
        <Divider/>
        <Text style={styles.body}>{bodyText}</Text>
        {children}
      </View>
    );
}

const styles = StyleSheet.create({
  titleContainer: { 
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15, 
  },
  title: { 
      fontSize: 18,
  },
  titleLeftView: { 
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start'
  },
  titleRightView: { 
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  body: {
    paddingTop: 10,
    marginBottom: 15
  }
});

export {Card}