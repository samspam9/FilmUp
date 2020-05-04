/*
Object {
  "adult": false,
  "backdrop_path": "/puw9y3jcL76FgHRkMeGkMQ9APao.jpg",
  "belongs_to_collection": null,
  "budget": 0,
  "genres": Array [
    Object {
      "id": 18,
      "name": "Drama",
    },
  ],
  "homepage": "https://www.netflix.com/title/80226923",
  "id": 530956,
  "imdb_id": "tt3993886",
  "original_language": "en",
  "original_title": "All Day and a Night",
  "overview": "While serving life in prison, a young man looks back at the people, the circumstances and the system that set him on the path toward his crime.",
  "popularity": 92.473,
  "poster_path": "/8xiV8j18GhWnnrfMGaDR0E5oOif.jpg",
  "production_companies": Array [
    Object {
      "id": 5420,
      "logo_path": "/dlW4Kh5dNieKNURnymsu57y6fMf.png",
      "name": "Color Force",
      "origin_country": "US",
    },
    Object {
      "id": 88928,
      "logo_path": null,
      "name": "Mighty Engine",
      "origin_country": "US",
    },
  ],
  "production_countries": Array [
    Object {
      "iso_3166_1": "US",
      "name": "United States of America",
    },
  ],
  "release_date": "2020-05-01",
  "revenue": 0,
  "runtime": 121,
  "spoken_languages": Array [
    Object {
      "iso_639_1": "en",
      "name": "English",
    },
    Object {
      "iso_639_1": "es",
      "name": "Español",
    },
  ],
  "status": "Released",
  "tagline": "Born. Gangster. Repeat.",
  "title": "All Day and a Night",
  "video": false,
  "vote_average": 6.1,
  "vote_count": 20,
}
*/
import _ from 'lodash';
import * as React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Container from 'react-native-container';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {AppReducerState} from 'src/reducers/appReducer';
import {MovieInfo} from 'src/types';
import {addFavorite, removeFavorite} from '../actions/appActions';
import FilmUpAPI from '../lib/FilmUpAPI';
import {AppTabParamList} from 'src/App';
import {RouteProp} from '@react-navigation/native';

interface MovieProps {
  favorite: MovieInfo[];
  route: RouteProp<AppTabParamList, 'Movie'>;
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface MovieState {
  isReady: boolean;
  isFavorite: boolean;
  info: MovieInfo | undefined;
  movieID: string;
}

class Movie extends React.Component<MovieProps, MovieState> {
  constructor(props: MovieProps) {
    super(props);

    this.state = {
      isReady: false,
      isFavorite:
        _.find(props.favorite, (item) => item.id === props.route.params.movieID) !== undefined,
      info: undefined,
      movieID: props.route.params.movieID,
    };
  }

  componentDidMount() {
    FilmUpAPI.fetchMovieInfo(this.state.movieID).then((info) =>
      this.setState({isReady: true, info}),
    );
  }

  render() {
    const {isReady, info, isFavorite} = this.state;
    if (!isReady || !info) {
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Container style={styles.container}>
        <Container padding={10} size={2}>
          <Container absoluteFill>
            <FastImage
              style={styles.coverImage}
              resizeMode="cover"
              source={{
                uri: info.poster_path,
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
                <Text style={styles.info}>{`${info.release_date.split('-')[0]}  |  ${
                  info.runtime
                } minutes`}</Text>
              </Container>
            </Container>
            <Container center="vertical">
              <Text style={styles.genre}>{info.genres.map((g) => g.name).join(', ')}</Text>
            </Container>
          </Container>
          <Container center size={1}>
            <TouchableOpacity
              onPress={() => {
                if (isFavorite) {
                  this.props.removeFavorite(info.id);
                } else this.props.addFavorite(info);
                this.setState({isFavorite: !isFavorite});
              }}
              style={styles.button}>
              <Text style={styles.favorite}>
                {isFavorite ? 'Remove from collection' : 'Add to collection'}
              </Text>
            </TouchableOpacity>
          </Container>
        </Container>

        <Container size={3} style={styles.body}>
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
                Languages: {info.spoken_languages.map((l) => l.name).join(', ')}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Release Date: {new Date(info.release_date).toLocaleDateString()}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Filming Locations: {info.production_countries.map((l) => l.name).join(', ')}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Budget: {info.budget === 0 ? 'Unknown' : '$' + info.budget}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Revenue: {info.revenue === 0 ? 'Unknown' : '$' + info.revenue}
              </Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>Popularity: {info.popularity}</Text>
            </Container>
            <Container marginVertical={10}>
              <Text style={styles.info}>
                Production Co: {info.production_companies.map((p) => p.name).join(', ')}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {backgroundColor: 'orange', paddingVertical: 15, paddingHorizontal: 30},
  contentContainer: {
    paddingTop: 15,
  },
  body: {
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  favorite: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cover: {
    backgroundColor: 'steelblue',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    letterSpacing: 1,
    // fontWeight: '900',
    // textTransform: 'uppercase',
    color: 'white',
    opacity: 0.9,
  },
  darken: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  info: {
    color: 'white',
    opacity: 0.9,
  },
  genre: {
    opacity: 0.9,
    color: 'orange',
  },
});
const mapStateToProps = (state: {app: AppReducerState}) => ({
  favorite: state.app.favorite,
});

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
