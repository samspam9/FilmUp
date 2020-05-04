import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import Container from 'react-native-container';
import {FlatGrid} from 'react-native-super-grid';
import {BasicMovieInfo} from 'src/types';
import {AppTabParamList} from '../App';
import MoviePreview from '../components/MoviePreview';
import FilmUpAPI from '../lib/FilmUpAPI';
import Styles from '../constants/styles';

interface SearchProps {
  navigation: BottomTabNavigationProp<AppTabParamList, 'Home'>;
}

interface SearchState {
  movies: BasicMovieInfo[];
}

export default class Search extends React.PureComponent<SearchProps, any> {
  state: SearchState = {movies: []};
  query: any;
  // componentDidMount() {
  //   this.queryMovies('a');
  // }

  queryMovies(query: string) {
    clearTimeout(this.query);
    this.query = setTimeout(() => {
      FilmUpAPI.fetchMovies(query).then((movies) => this.setState({movies}));
    }, 250);
  }

  render() {
    const {movies} = this.state;
    // console.log(movies);
    return (
      <SafeAreaView style={styles.safe}>
        <Container style={styles.container}>
          <TextInput
            autoFocus
            returnKeyType="search"
            style={styles.search}
            onChangeText={(query) => this.queryMovies(query)}
            placeholder="Search..."
            placeholderTextColor="gray"
            clearButtonMode="unless-editing"
          />
          <FlatGrid
            style={Styles.flex}
            itemDimension={110}
            items={movies}
            spacing={6}
            renderItem={({item}) => {
              return (
                <MoviePreview
                  navigation={this.props.navigation}
                  style={styles.preview}
                  info={item}
                />
              );
            }}
          />
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  safe: {flex: 1, backgroundColor: 'black'},
  search: {height: 80, fontSize: 24, letterSpacing: 1, color: 'white'},
  preview: {width: 110, height: 170},
});
