import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;

    return (
      <View style={styles.list}>
        <View
          style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
            horizontal={true}></FlatList>
        </View>
      </View>
    );
  }
}

List.propTypes = propTypes;

export default List;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: '#fff',
    backgroundColor: '#000',
  },
  list: {
    marginTop: 25,
  },
});
