import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

import { Logo } from "../utility/Logo.js";
import { authentication } from "../database/firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import global from "../global_information/global.js";
import { getMenuList } from "../database/firebase-utility.js";

function RegisterScreen() {
  const navigation = useNavigation();

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(text);
  };

  const signUserIn = (email, password) => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((re) => {
      global.session_user = email;
      global.menu_list = getMenuList();
      navigation.navigate('Start');
    })
    .catch((err) => {
      console.log(err);
      alert('Account not found!')
    })
}

  return (
    <ImageBackground style={styles.background}>
      <Logo />
      <View style={{ position: "absolute", top: 30, left: 20 }}>
        <TouchableHighlight onPress={() => navigation.navigate("Home")}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/icons/back_button.png")}
          />
        </TouchableHighlight>
      </View>

      <View style={styles.menuButton}>
        <TouchableOpacity onPress={() => navigation.navigate("AddItem")}>
          <View>
            <Text style={styles.buttonText}> Add Item Screen </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <View>
            <Text style={styles.buttonText}> Welcome Screen </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.orderButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Order")}>
          <View>
            <Text style={styles.buttonText}> Order Item Screen </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.enterForm}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            // Valid email will allow user to proceed to
            // start screen.
            if (!validate(values.email)) {
              alert("Invalid email!");
            } else if (values.password.length === 0) {
              alert("Enter password!")
            }else {
              signUserIn(values.email, values.password);
            }
            actions.resetForm();
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor={"white"}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />

              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor={"white"}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
              />
              <Text>{"\n"}</Text>

              <TouchableOpacity
                style={styles.submitButton}
                accessibilityLabel="Learn more about this purple button"
                onPress={props.handleSubmit}
                >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.regText}>Don't have an account? </Text>
                <Text
                  onPress={() => navigation.navigate("Register")}
                  style={styles.noAccount}
                >
                  Create one!
                </Text>
              </View>

              <Text
                onPress={() => navigation.navigate("Forgot")}
                style={styles.noAccount}
              >
                {"\n"}Forgot your password?
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#D1E3DA",
  },
  textSize: {
    fontSize: 40,
    flex: 1,
  },
  enterForm: {
    fontSize: 400,
    borderRadius: 6,
    alignItems: "center",
    top: 400,
    position: "absolute",
  },
  noAccount: {
    fontSize: 20,
    color: "#0040ff",
    textAlign: "center",
    top: 80
  },
  regText: {
    fontSize: 20,
    color: "black",
    top: 80,
  },
  backButton: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "grey",
    left: 5,
    top: 30,
    position: "absolute",
  },
  menuButton: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "red",
    left: 5,
    top: 70,
    position: "absolute",
  },
  welcomeButton: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "red",
    left: 5,
    top: 110,
    position: "absolute",
  },
  orderButton: {
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "red",
    left: 5,
    top: 150,
    position: "absolute",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 150,
    backgroundColor: "#f01d71",
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
  textInput: {
    textAlign: "left",
    fontSize: 20,
    borderRadius: 30,
    paddingVertical: 14,
    paddingRight: 150,
    paddingLeft: 25,
    backgroundColor: "#4c58ab",
    margin: 8,
    color: "white",
  },
});

export default RegisterScreen;
