import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from 'react-native-container';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {BasicMovieInfo, MovieInfo} from 'src/types';
import {addFavorite, removeFavorite} from '../actions/appActions';
import {AppTabParamList} from '../App';
import MoviePreview from '../components/MoviePreview';
import FilmUpAPI from '../lib/FilmUpAPI';

export interface HomeProps {
  navigation: BottomTabNavigationProp<AppTabParamList, 'Home'>;
  route: RouteProp<AppTabParamList, 'Home'>;
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface HomeState {
  isReady: boolean;
  movies: BasicMovieInfo[];
  coverMovie: MovieInfo | undefined;
  favoriteCoverMovie: boolean;
}

export class Home extends Component<HomeProps, HomeState> {
  state: HomeState = {
    isReady: false,
    movies: [],
    coverMovie: undefined,
    favoriteCoverMovie: false,
  };

  componentDidMount() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    FilmUpAPI.fetchMovies(chars.charAt(Math.floor(Math.random() * chars.length))).then((movies) => {
      this.setState({movies});
      FilmUpAPI.fetchMovieInfo(movies[0].id).then((coverMovie) =>
        this.setState({isReady: true, coverMovie}),
      );
    });
  }

  render() {
    const {isReady, movies, coverMovie, favoriteCoverMovie} = this.state;
    if (!isReady || !coverMovie) {
      return (
        <Container style={styles.container} center>
          <ActivityIndicator />
        </Container>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Container size={16}>
          <Container noflex style={styles.header}>
            <FastImage
              style={styles.poster}
              source={{uri: coverMovie.poster_path}}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              onPress={() => {
                this.props.navigation.navigate('Movie', {movieID: coverMovie.id});
              }}
            />
          </Container>
          <Container center>
            <Text style={styles.text}>{coverMovie.genres.map((g) => g.name).join(' • ')}</Text>
          </Container>
          <Container center="horizontal" size={2}>
            <TouchableOpacity
              onPress={() => {
                if (favoriteCoverMovie) {
                  this.props.removeFavorite(coverMovie.id);
                } else this.props.addFavorite(coverMovie);
                this.setState({favoriteCoverMovie: !favoriteCoverMovie});
              }}
              style={{backgroundColor: 'orange', paddingVertical: 15, paddingHorizontal: 30}}>
              <Text style={styles.favorite}>
                {favoriteCoverMovie ? 'Remove from collection' : 'Add to collection'}
              </Text>
            </TouchableOpacity>
          </Container>
        </Container>
        <Container center="vertical">
          <Text style={styles.trending}>Trending</Text>
        </Container>
        <Container size={5}>
          <FlatList
            horizontal={true}
            data={movies}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return (
                <MoviePreview
                  navigation={this.props.navigation}
                  info={item}
                  style={styles.preview}
                />
              );
            }}
          />
        </Container>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  poster: {width: '100%', height: '100%'},
  trending: {color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1},
  preview: {width: 100, marginHorizontal: 2},
  favorite: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  header: {width: '100%', height: '80%'},
  text: {color: 'white'},
});
