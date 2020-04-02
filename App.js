/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';


const App: () => React$Node = () => {

  const [secreteNumber, setSecreteNumber] = useState()
  const [guess, setGuess] = useState()
  const [chanceLeft, setChanceLeft] = useState(5)
  const [feedback, setFeedback] = useState()

  generateRandom = () => {

    return Math.round(Math.random() * 100)
  }

  init = () => {
    setGuess('')
    setFeedback('')
    setSecreteNumber(generateRandom())

  }

  useEffect(() => {
    init()
  }, [])

  decreaseChance = () => {

    setChanceLeft(chanceLeft - 1);
  }

  checkGuess = (value) => {

    const userGuess = parseInt(guess);
    const secrete = secreteNumber;
    if (userGuess == secrete) {
      setFeedback('You guessed right, the number is ' + secrete)
      init()
      return
    }
    if (value > 1) {
      decreaseChance()
      if (userGuess < secrete) {
        setFeedback('The number is larger than ' + userGuess + ' and you have ' + chanceLeft + " left")

      }
      if (userGuess > secrete) {
        setFeedback('The number is smaller than ' + userGuess + " and you have " + chanceLeft + " left")

      }

      return
    }
    else {
      setFeedback('Sorry You used all your chances')
      init()
      setChanceLeft(5)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Guess my number, now!, you have 5 chance</Text>
      <TextInput
        style={styles.input}
        value={guess}
        keyboardType='number-pad'
        onChangeText={(guess) => setGuess(guess)}
        placeholder='Enter your guess'
      >
      </TextInput>
      <TouchableHighlight
        style={styles.button}
        underlayColor='white'
        onPress={() => checkGuess(chanceLeft)}>
        <Text>Submit Guess</Text>
      </TouchableHighlight>
      <Text>{feedback}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 10,
    backgroundColor: 'lightblue',
    marginTop: 20,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ff33ff',
    fontSize: 32
  },
  input: {
    backgroundColor: '#ffffff',
    width: 100,
    marginTop: 20,
    padding: 10,
    textAlign: 'center'
  }

});

export default App;
