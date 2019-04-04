import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import {AppLoading, Asset, Font, Icon, FileSystem,Constants} from 'expo';
import AppNavigator from './components/navigation/AppNavigator';
import {Provider} from "mobx-react/native";
import RootStore from "./store/root/RootStore";
import ReleaseImporter from "./services/ReleaseImporter";
import {SQLite} from "expo";
import BluebirdPromise from "./common/BluebirdPromise";
import { toJS } from 'mobx';
import { throws } from 'assert';

let db = SQLite.openDatabase('database.db', '1.0', "main", 1)



export default class App extends React.Component {
    _rootStore;
    _releaseImporter;
    state = {
        isLoadingComplete: false,
        oldVersion: "",
        newVersion: "",
        isSame: null,
    };
    

    get releaseImporter() {
        if (!this._releaseImporter) {
            this._releaseImporter = new ReleaseImporter(this.rootStore);
        }
        return this._releaseImporter;
    }


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
            <Provider rootStore={this.rootStore} releaseImporter={this.releaseImporter}>
                <View style={styles.container}>
                    {/* {Platform.OS === 'ios' && <StatusBar barStyle="default" />} */}
                    <AppNavigator/>
                </View>
            </Provider>
        );
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                //Load images here
                require('../assets/images/WHITE_HAND_LOGO.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in ConversationScreen.jsnsScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
            }),
            this.initDatabase()
                .then(() => {
                    return this.rootStore.init()
                    
                }),
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

    initDatabase = async (res) => {
        const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;
        const pathToDownloadTo = `${sqliteDirectory}/database.db`;
        const uriToDownload    = Asset.fromModule(require('../assets/db/database.db')).uri;
        let filesArray = await Expo.FileSystem.readDirectoryAsync(sqliteDirectory);


        // First, ensure that the SQLite directory is indeed a directory
        // For that we will first get information about the filesystem node
        // and handle non-existent scenario.
        const {exists, isDirectory} = await FileSystem.getInfoAsync(sqliteDirectory);
        if (!exists) {

            console.log("DOES NOT EXSIST")
            await FileSystem.makeDirectoryAsync(sqliteDirectory);
            await filesArray.forEach((item) => {
                FileSystem.deleteAsync(`${sqliteDirectory}/${item}`, {
                    idempotent: true
                });
            });

            await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
        } else if (!isDirectory) {
            throw new Error('SQLite dir is not a directory');
        }else if (exists) { 
            //Open Db internal
            //Db transaction to select version table on internal
            //Get db version num from app.json
            // if version from app.json != version from db
            // replae internal db with init db.
            await this.executeSql("SELECT * FROM Version")
            if(!this.state.isSame){
                await filesArray.forEach((item) => {
                    FileSystem.deleteAsync(`${sqliteDirectory}/${item}`, {
                        idempotent: true
                    });
                });
                await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
            }
        }
    };

    executeSql = async (sql, params = []) => {
        return new Promise((resolve, reject) => db.transaction(tx => {
          tx.executeSql(sql, params, (_, { rows }) => {
            if(rows._array[0].Version !== Constants.manifest.extra.dbVersion){ 
                resolve(this.setState({isSame: false}))
            }else { 
                resolve(this.setState({isSame: true}))
            }
          })
        }))
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 0: StatusBar.currentHeight
    },
});
