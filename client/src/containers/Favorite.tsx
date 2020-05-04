import * as React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Container from 'react-native-container';
import {FlatGrid} from 'react-native-super-grid';
import {connect} from 'react-redux';
import {AppReducerState} from 'src/reducers/appReducer';
import {MovieInfo} from 'src/types';
import MoviePreview from '../components/MoviePreview';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AppTabParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import Styles from '../constants/styles';

export interface FavoriteProps {
  favorite: MovieInfo[];
  navigation: BottomTabNavigationProp<AppTabParamList, 'Favorite'>;
  route: RouteProp<AppTabParamList, 'Home'>;
}

class Favorite extends React.Component<FavoriteProps, any> {
  render() {
    const {favorite} = this.props;
    console.log('favorite', favorite);
    return (
      <SafeAreaView style={styles.container}>
        <Container noflex style={styles.header} center>
          <Text style={styles.favorite}>Favorite</Text>
        </Container>
        <FlatGrid
          style={Styles.flex}
          itemDimension={110}
          items={favorite}
          spacing={6}
          extraData={favorite}
          renderItem={({item}) => {
            return (
              <MoviePreview navigation={this.props.navigation} style={styles.preview} info={item} />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: {app: AppReducerState}) => ({
  favorite: state.app.favorite,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {height: 64},
  favorite: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  preview: {width: 110, height: 170},
});
