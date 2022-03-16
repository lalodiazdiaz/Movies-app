import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../Componets/Card';
import Error from '../Componets/Error';
import {searchMovie} from '../services/services';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    searchMovie(query).then(data => {
      setSearchResults(data);
    });
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/images/fondo2.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.container}>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Search Movie"
                onChangeText={onChangeText}
                value={text}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                onSubmit(text);
              }}>
              <Icon name={'search-circle-sharp'} size={60} color={'#fff'} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchItems}>
            {searchResults && searchResults.length > 0 && (
              <FlatList
                style={{marginBottom: '40%'}}
                numColumns={3}
                data={searchResults}
                renderItem={({item}) => (
                  <Card navigation={navigation} item={item} />
                )}
                keyExtractor={item => item.id}
              />
            )}
            {searchResults && searchResults.length == 0 && (
              <View style={(styles.empty, {paddingTop: 20})}>
                <Text style={styles.message}>
                  No results matching your criterial.
                </Text>
                <Text style={styles.message}>Try different keywords.</Text>
              </View>
            )}
            {!searchResults && (
              <View style={styles.empty}>
                <Text style={styles.message}>
                  Type something to star searching.
                </Text>
              </View>
            )}

            {error && <Error />}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,

    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
  },
  searchItems: {
    padding: 7,
  },
  image: {height: '100%'},

  message: {
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
  },
});

export default Search;
