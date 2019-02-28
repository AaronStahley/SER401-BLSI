import React from 'react';
import { Divider } from 'react-native-elements'
import { Icon } from "expo";
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FavoritesIcon from './FavoritesIcon.js'

/**
 * A card that holds a title and body text with a favorites star on the 
 * top right.
 * @author Aaron S
 */
const Card = props => { 

    const { children, title, bodyText, favIcon } = props;

    return (
      <View style={styles.container}>
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
  container: {
    borderWidth: 1,
    borderColor: "#e5ebf0",
    padding: 15,
    margin: 15,
    flex: 1,
    backgroundColor: '#fff'
  },
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