import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";

import { MonoText } from "../components/StyledText";
import { TouchableHighlight } from "react-native";
import FilmUpAPI from "../lib/FilmUpAPI";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.goToMovie = this.goToMovie.bind(this);
    this.state = { isReady: false, movies: [], query: "" };
  }

  componentDidMount() {
    FilmUpAPI.fetchMovies("a").then((movies) =>
      this.setState({ movies, isReady: "true" })
    );
  }

  queryMovies(query) {
    if (query !== "") {
      clearTimeout(this.query);
      this.query = setTimeout(() => {
        FilmUpAPI.fetchMovies(query).then((movies) =>
          this.setState({ movies })
        );
      }, 250);
    }
  }

  goToMovie(movieID) {
    console.log("goToMovie", movieID);
    this.props.navigation.navigate("MovieDetails", { movieID });
  }

  render() {
    const { isReady, movies } = this.state;
    if (!isReady) {
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          clearButtonMode="while-editing"
          style={styles.search}
          onChangeText={(query) => this.queryMovies(query)}
          placeholder="Search..."
          placeholderTextColor="gray"
        />
        <FlatGrid
          itemDimension={130}
          items={movies}
          style={styles.movieGrid}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                this.goToMovie(item.id);
              }}
            >
              <View style={styles.movieContainer}>
                <Image
                  style={styles.imagePreview}
                  source={{ uri: item.poster }}
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
  search: {
    backgroundColor: "black",
    height: 80,
    fontSize: 26,
    letterSpacing: 2,
    color: "white",
  },
  movieGrid: {
    marginLeft: 25,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
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
