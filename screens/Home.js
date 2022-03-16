import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Text,
} from 'react-native';
import {
  getPopularMovies,
  getupComingMovies,
  getPopularTv,
  getFamiliyMovies,
  getDocumentary,
  getfantasyMovies,
  getTopRated,
  getNowPlaying,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../Componets/List';
import Error from '../Componets/Error';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [upComing, setUpComing] = useState();
  const [movieImages, setMovieImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [Documentary, setDocumentary] = useState();
  const [fantasyMovies, setFantasyMovies] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [rated, setRated] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getupComingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamiliyMovies(),
      getDocumentary(),
      getfantasyMovies(),
      getTopRated(),
      getNowPlaying(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          DocumentaryData,
          fantasyMoviesData,
          topRatedData,
          nowPlayingData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });
          setUpComing(upcomingMoviesData);
          setMovieImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentary(DocumentaryData);
          setFantasyMovies(fantasyMoviesData);
          setRated(topRatedData);
          setNowPlaying(nowPlayingData);
          setLoaded(true);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {/* upComing Movies */}
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                autoplay={true}
                circleLoop={true}
                images={movieImages}
                sliderBoxHeight={dimensions.height / 1.5}
                dotstyle={styles.sliderStyle}
              />
            </View>
          )}
          {/*upComing  */}
          {upComing && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="UpComing Movies"
                content={upComing}
              />
            </View>
          )}

          {/*Popular Movies */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {/*TopRated  */}
          {rated && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Top Rated Movies"
                content={rated}
              />
            </View>
          )}
          {/*nowPlaying movies  */}
          {nowPlaying && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Now Playing Movies"
                content={nowPlaying}
              />
            </View>
          )}

          {/*family Movies */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies "
                content={familyMovies}
              />
            </View>
          )}
          {/*Documentary Movies */}
          {Documentary && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={Documentary}
              />
            </View>
          )}
          {/*fantasy Movies */}
          {Documentary && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Fantasy Movies"
                content={fantasyMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && (
        <View style={{width: '100%', height: '100%'}}>
          <ImageBackground
            source={require('../assets/images/fondo1.jpg')}
            resizeMode="cover"
            style={styles.image}>
            <ActivityIndicator size="large" color="#00ff00" />
          </ImageBackground>
        </View>
      )}
      {error && <Error />}
    </React.Fragment>
  );
};

export default Home;

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
