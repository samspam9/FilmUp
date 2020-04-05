import * as React from "react";
import { Image, StyleSheet, View, Button } from "react-native";
import dataSource from "../sampleData.json";
import { FlatGrid } from "react-native-super-grid";

import { MonoText } from "../components/StyledText";
import { TouchableHighlight } from "react-native";

class HomeScreen extends React.Component {
  goToMovie() {
    console.log("going to movie page");
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatGrid
          itemDimension={130}
          items={dataSource.movies}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={this.goToMovie}>
              <View style={styles.movieContainer}>
                <Image
                  style={styles.imagePreview}
                  source={{ uri: item.thumbnail }}
                />
                <View style={styles.textContainer}>
                  <MonoText style={styles.orangeText}>{item.title}</MonoText>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  contentContainer: {
    paddingTop: 30,
  },
  imagePreview: {
    width: 150,
    height: 250,
  },
  orangeText: {
    color: "orange",
    textAlign: "center",
  },
  movieContainer: {
    width: 150,
  },
  textContainer: {
    backgroundColor: "#000000",
  },
});
