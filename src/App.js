import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import {AppLoading, Asset, Font, Icon, FileSystem,Constants} from 'expo';
import AppNavigator from './components/navigation/AppNavigator';
import {Provider} from "mobx-react/native";
import RootStore from "./store/root/RootStore";
import ReleaseImporter from "./services/ReleaseImporter";
import {SQLite} from "expo";

let db; //global variable to store the database. 

export default class App extends React.Component {
    _rootStore;
    _releaseImporter;
    state = {
        isLoadingComplete: false,
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
                require('../assets/images/PCH_APP_LOGO-v2-white-lettering-center-bg-trans.png'),
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

    initDatabase = async () => {
        const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;
        const pathToDownloadTo = `${sqliteDirectory}/database.db`;
        const uriToDownload    = Asset.fromModule(require('../assets/db/database.db')).uri;

        // First, ensure that the SQLite directory is indeed a directory
        // For that we will first get information about the filesystem node
        // and handle non-existent scenario.
        const {exists, isDirectory} = await FileSystem.getInfoAsync(sqliteDirectory);
        if (!exists) {
            console.log("DB AND DIR DO NOT EXSIST, CREATING THEM NOW")
            await FileSystem.makeDirectoryAsync(sqliteDirectory);
            let filesArray = await Expo.FileSystem.readDirectoryAsync(sqliteDirectory);
            await filesArray.forEach((item) => {
                FileSystem.deleteAsync(`${sqliteDirectory}/${item}`, {
                    idempotent: true
                });
            });
            await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
        } else if (!isDirectory) {
            throw new Error('SQLite dir is not a directory');
        }else if (exists) { 
            /*
                When entering this else if block it means that the SQLite database already
                exsists and the app has been installed. This statement will run everytime
                the app starts. When it runs it will open the pre exsiting database and 
                read the value "Version" and compare that value to the one in app.json.
                if they do not equal it will then set the state variable isSame to false
                triggering the database to get deleted and re mapped to that location with 
                the new one that is in the assets/db dir. This now presents the user with
                any changes to the iniitial .db file. -Aaron s
            */ 
            console.log("DB AND DIR ALREADY EXSIST")
            db = SQLite.openDatabase('database.db', '1.0', "main", 1)
            await this.executeSql("SELECT * FROM Version")
            db._db.close();
            if(!this.state.isSame){
                let filesArray = await Expo.FileSystem.readDirectoryAsync(sqliteDirectory);
                await filesArray.forEach((item) => {
                    console.log("DELETING OLD DB") 
                    FileSystem.deleteAsync(`${sqliteDirectory}/${item}`, {
                        idempotent: true
                    });
                });
                console.log("LOADING NEW DB")
                await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
            }
        }
    };

    /**
     * Reads the version table form the internal SQLite database and if the number
     * is different from the app.json db version value it sets the state variable 
     * isSame: false if not different it sets it to true.  -Aaron s.
     */
    executeSql = async (sql, params = []) => {
        return new Promise((resolve, reject) => db.transaction(tx => {
          tx.executeSql(sql, params, (_, { rows }) => {
            if(rows._array[0].Version !== Constants.manifest.extra.dbVersion){ 
                console.log("Out of date: Old Version", rows._array[0].Version, ", New Version", Constants.manifest.extra.dbVersion)
                resolve(this.setState({isSame: false}))
            }else { 
                console.log("Up To DATE: ", rows._array[0].Version, " , ", Constants.manifest.extra.dbVersion)
                resolve(this.setState({isSame: true}))
            }
          }, (_,error) => { 
              console.log("database is so old that version table does not exsist, updating now...")
              this.setState({isSame: false})
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
