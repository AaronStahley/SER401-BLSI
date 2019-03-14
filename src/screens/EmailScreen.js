import React from 'react';
import {ScrollView, StyleSheet,View, Button} from 'react-native';
import Colors from "../common/Colors"
import email from 'react-native-email'
import EmailTextField from "../components/ui/EmailTextField";

export default class EmailScreen extends React.Component {

    /**
     * Opens email app and sends through that.
     * 
     */
    handleEmail = () => {
        const to = ['stahleyaaron@yahoo.com'] // string or array of email addresses
        email(to, {
            cc: [],
            subject: 'TEST',
            body: 'TEST EMAIL'
        }).catch(console.error)
    }

    render() {
        const { navigate } = this.props.navigation;

        return (

        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <EmailTextField
                    text={"To:"}
                    placeholder={"Enter your email address."}
                    keyboardType={'email-address'}

                />
                <EmailTextField
                    text={"CC:"}
                    placeholder={"Enter your email address."}
                />
                <EmailTextField
                    text={"Subject:"}
                    placeholder={"Enter your email address."}
                />
                <Button title="Send Mail" onPress={this.handleEmail} />
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
   container: { 
       backgroundColor: 'white',
   },
   formContainer: { 
        flex: 1,
        flexDirection : 'column',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 10,
   }
});

