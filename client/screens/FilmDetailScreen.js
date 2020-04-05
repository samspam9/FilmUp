import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Container from 'react-native-container';

export default function FilmDetailScreen() {
  return (
    <Container style={styles.container}>
      <Container padding={10}>
        <Container absoluteFill>
          <Image
            style={styles.coverImage}
            resizeMode="cover"
            source={{
              uri:
                'https://cdn1.thr.com/sites/default/files/imagecache/landscape_928x523/2014/09/interstellar_poster_0.jpg',
            }}
          />
          <Container absoluteFill style={styles.darken} />
        </Container>
        <Container />
        <Container size={2}>
          <Container size={2} center="vertical">
            <Text style={styles.title}>Interstellar</Text>
          </Container>
          <Container center="vertical">
            <Text style={styles.info}>2014 |  2h 49min</Text>
          </Container>
          <Container center="vertical">
            <Text style={styles.genre}>Aventure, Drama, Sci-Fi</Text>
          </Container>
        </Container>
      </Container>
      <Container size={2} style={styles.body}>
        <ScrollView>
          <Container marginVertical={10}>
            <Text style={styles.info}>
              A team of explorers travel through a wormhole in space in an
              attempt to ensure humanity's survival.
            </Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Director: Christopher Nolan</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>
              Writers: Jonathan Nolan, Christopher Nolan
            </Text>
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
            <Text style={styles.info}>Language: English</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Release Date: 7 November 2014</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>
              Filming Locations: Okotoks, Alberta, Canada
            </Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Budget:$165,000,000 (estimated)</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Cumulative Worldwide Gross: $677,471,339</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Production Co: Paramount Pictures, Warner Bros., Legendary Entertainment</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Runtime: 169 min</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Sound Mix: Datasat | Dolby Digital | IMAX 6-Track | Dolby Surround 7.1 | Sonics-DDP (IMAX version)</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Color: Color (FotoKem)</Text>
          </Container>
          <Container marginVertical={10}>
            <Text style={styles.info}>Aspect Ratio: 2.39 : 1</Text>
          </Container>
        </ScrollView>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 15,
  },
  body: {
    backgroundColor: 'black',
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
    fontFamily: 'space-mono',
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
    fontFamily: 'space-mono',
  },
  genre: {
    color: 'white',
    opacity: 0.9,
    color: 'orange',
    fontFamily: 'space-mono',
  },
});
