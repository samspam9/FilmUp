import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Container from "react-native-container";
import FilmUpAPI from "../lib/FilmUpAPI";
import { MaterialIcons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

import _ from "lodash";
class FilmDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      isFavorite: false,
      info: {},
      movieID: props.route.params.movieID,
    };
    this.onFavoritePress = this.onFavoritePress.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem(`favorites`).then((res) => {
      const fav = JSON.parse(JSON.parse(res));
      console.log(fav);
      this.setState({
        isFavorite:
          fav && _.find(fav, (i) => i.id === this.state.movieID) !== undefined,
      });
    });
    FilmUpAPI.fetchMovieInfo(this.state.movieID).then((info) =>
      this.setState({ isReady: true, info })
    );
  }

  onFavoritePress() {
    const { info } = this.state;
    const movieInfo = {
      id: info.id,
      title: info.title,
      poster: info.poster_path,
    };
    AsyncStorage.getItem("favorites").then((res) => {
      let favorites = JSON.parse(JSON.parse(res)) || [];
      console.log(this.state.isFavorite);
      if (this.state.isFavorite && favorites) {
        console.log("here");
        _.remove(favorites, (f) => f.id === movieInfo.id);
      } else {
        favorites.push(movieInfo);
      }
      console.log(favorites);
      AsyncStorage.setItem(`favorites`, JSON.stringify(favorites));
      this.setState({ isFavorite: !this.state.isFavorite });
    });
  }

  render() {
    const { isReady, info, isFavorite } = this.state;
    if (!isReady) {
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Container style={styles.container}>
        <Container padding={10}>
          <Container absoluteFill>
            <Image
              style={styles.coverImage}
              resizeMode="cover"
              source={{
                uri: info.backdrop_path,
              }}
            />
            <Container absoluteFill style={styles.darken} />
          </Container>
          <Container />
          <Container size={2}>
            <Container size={2} center="vertical">
              <Text style={styles.title}>{info.title}</Text>
            </Container>
            <Container row center="vertical">
              <Container>
                <Text style={styles.info}>{`${
                  info.release_date.split("-")[0]
                }  |  ${info.runtime} minutes`}</Text>
              </Container>
              <Container align="right">
                {/* <MaterialIcons.Button
                  activeOpacity={1}
                  underlayColor="transparent"
                  size={24}
                  onPress={this.onFavoritePress}
                  name={isFavorite ? 'favorite' : 'favorite-border'}
                  backgroundColor="transparent"
                  color="red"
                ></MaterialIcons.Button> */}
              </Container>
            </Container>
            <Container center="vertical">
              <Text style={styles.genre}>
                {info.genres.map((g) => g.name).join(", ")}
              </Text>
            </Container>
          </Container>
        </Container>
        <Container size={2} style={styles.body}>
          <ScrollView>
            <Container marginVertical={10}>
              <Text style={styles.info}>{info.overview}</Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.genre}>
                Rating: {`${info.vote_average} (${info.vote_count})`}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>Status: {info.status}</Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Stars: Matthew McConaughey, Anne Hathaway, Jessica Chastain
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>Country: USA, UK, Canada</Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Languages: {info.spoken_languages.map((l) => l.name).join(", ")}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Release Date: {new Date(info.release_date).toLocaleDateString()}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Filming Locations:{" "}
                {info.production_countries.map((l) => l.name).join(", ")}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Budget: {info.budget === 0 ? "Unknown" : "$" + info.budget}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Revenue: {info.revenue === 0 ? "Unknown" : "$" + info.revenue}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>Popularity: {info.popularity}</Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Production Co:{" "}
                {info.production_companies.map((p) => p.name).join(", ")}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>Runtime: {info.runtime} min</Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>Tagline: {info.tagline}</Text>
            </Container>
          </ScrollView>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  contentContainer: {
    paddingTop: 15,
  },
  body: {
    backgroundColor: "black",
    paddingVertical: 20,
    paddingLeft: 10,
  },
  cover: {
    backgroundColor: "steelblue",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    letterSpacing: 1,
    // fontWeight: '900',
    fontFamily: "space-mono",
    // textTransform: 'uppercase',
    color: "white",
    opacity: 0.9,
  },
  darken: {
    backgroundColor: "black",
    opacity: 0.5,
  },
  info: {
    color: "white",
    opacity: 0.9,
    fontFamily: "space-mono",
  },
  genre: {
    color: "white",
    opacity: 0.9,
    color: "orange",
    fontFamily: "space-mono",
  },
});

export default FilmDetailScreen;
