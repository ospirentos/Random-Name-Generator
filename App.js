

import React, { Component } from 'react';
import { StyleSheet, Text, View, Share, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstWord: "",
      secondWord: ""
    }
  }

  generateNames = () => {
    fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=9mx75oogbcceqdhb2pn43pdgyjq68ow3sw37l81cc70e95rl3')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          firstWord: responseJson.word,
        })
      })
      .then(() => {
        fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=9mx75oogbcceqdhb2pn43pdgyjq68ow3sw37l81cc70e95rl3')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              secondWord: responseJson.word === "undefined" ? "Error:Try Again" : responseJson.word
            })
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          this.state.firstWord + ' ' +this.state.secondWord,
      });
    } catch (error) {
      alert(error.message);
    }


  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Random Name Generator</Text>
        <Text style={styles.input}>{this.state.firstWord}</Text>
        <Text style={styles.input}>{this.state.secondWord}</Text>
        <TouchableOpacity style={styles.button} onPress={this.generateNames}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onShare}>
          <Text style={styles.buttonText}>Share!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90AFC5',
  },
  title: {
    color: '#763626',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50
  },
  input: {
    width: 250,
    borderBottomWidth: 2,
    borderBottomColor: '#763626',
    padding: 0,
    paddingLeft: 5,
    marginBottom: 50,
    fontWeight: "bold",
    fontSize: 25
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#763626',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    margin:10
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});
