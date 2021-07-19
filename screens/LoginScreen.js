import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: 'false'
        }
    }
    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                            <Text
                                style={styles.modalTitle}>
                                Registration
                            </Text>
                            
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Email Id"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({
                                        emailId: text
                                    })
                                }} />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }} />
                            
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        this.userSignUp(this.state.emailId, this.state.password)
                                    }}>
                                    <Text style={styles.registerButtonText}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => {
                                       this.setState({
                                           isModalVisible: false
                                       })
                                    }}>
                                    <Text style={{color:'#FF5722'}}>
                                       Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>

       )
    }
    
    userLogin = (emailId, password) => {
        console.log("userLogin");
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(() => {
                this.props.navigation.navigate("DonateBooks")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showModal()}
                <View style={{ flex: 0.45 }}>
                    <View style={styles.TextInput}>
                        <TextInput
                            style={styles.loginBox}
                            placeholder="abc@example.com"
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                            onChangeText={text => {
                                this.setState({
                                    emailId: text
                                });
                            }}
                        />
                        <TextInput
                            style={[styles.loginBox, { marginTop: RFValue(15) }]}
                            secureTextEntry={true}
                            placeholder="Enter Password"
                            placeholderTextColor="gray"
                            onChangeText={text => {
                                this.setState({
                                    password: text
                                });
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.5, alignItems: "center" }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.userLogin(this.state.emailId, this.state.password);
                            }}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setState({ isModalVisible: true })}
                        >
                            <Text style={styles.buttonText}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6fc0b8"
    },
    loginBox: {
        width: "80%",
        height: RFValue(50),
        borderWidth: 1.5,
        borderColor: "#ffffff",
        fontSize: RFValue(20),
        paddingLeft: RFValue(10)
    },
    button: {
        width: "80%",
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(25),
        backgroundColor: "#ffff",
        shadowColor: "#000",
        marginBottom: RFValue(10),
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16
    },
    buttonText: {
        color: "#32867d",
        fontWeight: "200",
        fontSize: RFValue(20)
    },
    label: {
        fontSize: RFValue(13),
        color: "#717D7E",
        fontWeight: "bold",
        paddingLeft: RFValue(10),
        marginLeft: RFValue(20)
    },
    formInput: {
        width: "90%",
        height: RFValue(45),
        padding: RFValue(10),
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "grey",
        paddingBottom: RFValue(10),
        marginLeft: RFValue(20),
        marginBottom: RFValue(14)
    },
    registerButton: {
        width: "75%",
        height: RFValue(50),
        marginTop: RFValue(20),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(3),
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(10)
    },
    registerButtonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff"
    },
    cancelButtonText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#32867d",
        marginTop: RFValue(10)
    },
    scrollview: {
        flex: 1,
        backgroundColor: "#fff"
    },
    signupView: {
        flex: 0.05,
        justifyContent: "center",
        alignItems: "center"
    },
    signupText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "#32867d"
    },
    TextInput: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    }
});