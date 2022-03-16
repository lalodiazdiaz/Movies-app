import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.object,
};

const placeholderImage = require('../assets/images/placeholder.png');
class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('Details', {
            movieId: item.id,
            poster: item.poster_path,
          })
        }>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path}
              : placeholderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

Card.propTypes = propTypes;

export default Card;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 8,
    paddingLeft: 8,
    position: 'relative',
    alignItems: 'center',
    height: 180,
    marginBottom: 5,
  },
  image: {
    height: 180,
    width: 105,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 120,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 10,
  },
});
