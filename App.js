import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Provider,
  Card,
  Title,
  TextInput,
  Button,
  Text,
  Snackbar,
} from "react-native-paper";

export default function App() {

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Snackbar
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Show Snackbar
  const showSnackbar = (msg) => {
    setMessage(msg);
    setVisible(true);
  };

  // Login Function
  const handleLogin = () => {

    setEmailError("");
    setPasswordError("");

    let valid = true;

    // Email Validation
    if (email.trim() === "") {
      setEmailError("Email is required");
      showSnackbar("Email is required");
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      setEmailError("Invalid Email");
      showSnackbar("Please enter valid email");
      valid = false;
    }

    // Password Validation
    if (password.trim() === "") {
      setPasswordError("Password is required");
      showSnackbar("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      showSnackbar("Password too short");
      valid = false;
    }

    // Success
    if (valid) {
      showSnackbar("Login Successful!");

      console.log("Email:", email);
      console.log("Password:", password);

      setEmail("");
      setPassword("");
    }
  };

  return (
    <Provider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        <Card style={styles.card}>
          <Card.Content>

            <Title style={styles.title}>
              Login Form
            </Title>

            {/* Email */}
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor="#6200ee"
              textColor="#000"
              theme={{
                colors: {
                  background: "#fff",
                  placeholder: "#666",
                  text: "#000",
                  primary: "#6200ee",
                },
              }}
            />

            {emailError ? (
              <Text style={styles.errorText}>
                {emailError}
              </Text>
            ) : null}

            {/* Password */}
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              outlineColor="#999"
              activeOutlineColor="#6200ee"
              textColor="#000"
              theme={{
                colors: {
                  background: "#fff",
                  placeholder: "#666",
                  text: "#000",
                  primary: "#6200ee",
                },
              }}
            />

            {passwordError ? (
              <Text style={styles.errorText}>
                {passwordError}
              </Text>
            ) : null}

            {/* Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              buttonColor="#6200ee"
              textColor="#fff"
            >
              Login
            </Button>

          </Card.Content>
        </Card>

        {/* Snackbar */}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
          style={styles.snackbar}
        >
          {message}
        </Snackbar>

      </KeyboardAvoidingView>
    </Provider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#dbeafe",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 10,
    elevation: 5,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 28,
    color: "#111",
    fontWeight: "bold",
  },

  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 14,
  },

  button: {
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  snackbar: {
    backgroundColor: "#333",
  },

});