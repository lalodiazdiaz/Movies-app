import React, {useEffect, useState} from 'react';
import StarRating from 'react-native-star-rating';

import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import {getMovie, getVideo} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../Componets/PlayButton';
import Video from '../Componets/Video';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Details = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const poster = route.params.poster;
  const imgPoster = 'https://image.tmdb.org/t/p/w500/' + poster;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(!modalVisible);
      setLoaded(true);
    });
    getVideo(movieId).then(videodata => {
      setVideo(videodata);
      console.log(videodata);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                poster
                  ? {
                      uri: `${imgPoster}`,
                    }
                  : placeholderImage
              }
            />

            <View style={styles.container}>
              <View style={styles.playButton}>
                {/* <PlayButton handlePress={videoShown} /> */}
              </View>
              <Text style={styles.title}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genrescontainer}>
                  {movieDetail.genres.map(genres => {
                    return (
                      <Text style={styles.genres} key={genres.id}>
                        {genres.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
                starSize={30}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release date: ' +
                  dateFormat(
                    movieDetail.release_date,
                    'mmmm dS, yyyy, h:MM TT',
                  )}
              </Text>

              <Text style={styles.title}>Trailer and Teaser</Text>
              {video.map(vid => (
                <Pressable
                  key={vid.id}
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('Video', {
                      videoKey: vid.key,
                      poster: imgPoster,
                      name: movieDetail.title,
                    })
                  }>
                  <Text style={styles.text}>{vid.name}</Text>
                </Pressable>
                //
              ))}
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && (
        <View style={{width: '100%', height: '100%'}}>
          <ImageBackground
            source={require('../assets/images/fondo4.jpg')}
            resizeMode="cover"
            style={styles.imageLoad}>
            <ActivityIndicator size="large" color="#00ff00" />
          </ImageBackground>
        </View>
      )}
    </React.Fragment>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genrescontainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  image: {
    height: height / 1.8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
    marginBottom: 5,
    color: '#000',
  },
  overview: {
    padding: 15,
    color: '#000',
    fontSize: 17.5,
  },
  genres: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  release: {
    fontWeight: 'bold',
    color: '#000',
  },
  playButton: {
    position: 'absolute',
    top: -35,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '90%',

    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  imageLoad: {
    flex: 1,
    justifyContent: 'center',
  },
});
