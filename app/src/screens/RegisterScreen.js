import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

import { Logo } from "../utility/Logo.js";

function RegisterScreen() {
  const navigation = useNavigation();
  let email = null;

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(text);
  };

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

      <View style={styles.enterForm}>
        <Formik
          initialValues={{ email: "", password: "", confirm: "" }}
          onSubmit={(values, actions) => {
            // Valid email will allow user to proceed to
            // start screen.
            if (!validate(values.email)) {
              alert("Invalid email!");
            } else if (values.password !== values.confirm) {
              alert("Passwords do not match!");
            } else {
              navigation.navigate("Start");
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

              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor={"white"}
                onChangeText={props.handleChange("confirm")}
                value={props.values.confirm}
              />
              <Text>{"\n"}</Text>
              <TouchableOpacity
                style={styles.submitButton}
                accessibilityLabel="Learn more about this purple button"
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <Text>{"\n"}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.regText}>Already have an account? </Text>
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={styles.noAccount}
                >
                  Log in!
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
  noAccount: {
    fontSize: 20,
    color: "#0040ff",
    textAlign: "center",
  },
  enterForm: {
    fontSize: 400,
    borderRadius: 6,
    alignItems: "center",
    top: 400,
    position: "absolute",
  },
  regText: {
    fontSize: 20,
    color: "black",
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
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default RegisterScreen;
