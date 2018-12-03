import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon, FileSystem} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from "mobx-react/native";
import RootStore from "./data/store/RootStore";


export default class App extends React.Component {
    _rootStore;
    state = {
        isLoadingComplete: false,
    };


    get rootStore() {
        if (!this._rootStore) {
            this._rootStore = new RootStore('database.db');
        }
        return this._rootStore;
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        }

        return (
            <Provider rootStore={this.rootStore}>
                <View style={styles.container}>
                    {/*{Platform.OS === 'ios' && <StatusBar barStyle="default" />}*/}
                    <AppNavigator/>
                </View>
            </Provider>
        );
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                //Load images here
                require('./assets/images/WHITE_HAND_LOGO.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in ConversationScreen.jsnsScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
            this.initDatabase()
                .then(() => {
                    return this.rootStore.init()
                })
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };

    initDatabase = async () => {
        const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;

        // First, ensure that the SQLite directory is indeed a directory
        // For that we will first get information about the filesystem node
        // and handle non-existent scenario.
        const {exists, isDirectory} = await FileSystem.getInfoAsync(sqliteDirectory);
        if (!exists) {
            await FileSystem.makeDirectoryAsync(sqliteDirectory);
        } else if (!isDirectory) {
            throw new Error('SQLite dir is not a directory');
        }

        const pathToDownloadTo = `${sqliteDirectory}/database.db`;
        const uriToDownload    = Asset.fromModule(require('./assets/db/database.db')).uri;


        let filesArray = await Expo.FileSystem.readDirectoryAsync(sqliteDirectory);
        await filesArray.forEach( (item) => {
             FileSystem.deleteAsync(`${sqliteDirectory}/${item}`, {idempotent: true});
        });

        await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
    };
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
