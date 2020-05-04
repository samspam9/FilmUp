import {boundMethod} from 'autobind-decorator';
import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Container from 'react-native-container';
import FastImage from 'react-native-fast-image';
import {BasicMovieInfo, MovieInfo} from 'src/types';
export interface MoviePreviewProps {
  info: (BasicMovieInfo & {poster_path?: string}) | (MovieInfo & {poster?: string});
  style?: ViewStyle;
  navigation?: any;
}

export default class MoviePreview extends React.Component<MoviePreviewProps, any> {
  @boundMethod
  onPress() {
    if (this.props.navigation)
      this.props.navigation.navigate('Movie', {movieID: this.props.info.id});
  }

  public render() {
    const {info, style} = this.props;
    return (
      <Container style={style}>
        <FastImage style={styles.image} source={{uri: info.poster || info.poster_path}} />
        <TouchableOpacity onPress={this.onPress} style={StyleSheet.absoluteFill} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {width: '100%', height: '100%'},
});
