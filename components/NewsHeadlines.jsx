import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Headline from './Headline';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';
import {SwipeListView} from 'react-native-swipe-list-view';

const NewsHeadlines = ({headlines}) => {
  const [newsHeadlines, setNewsHeadlines] = useState(headlines);
  const [pinnedHeadlines, setPinnedHeadlines] = useState([]);

  const removeHeadline = item => {
    setNewsHeadlines(old =>
      _filter(old, temp => {
        return temp.title !== item.title;
      }),
    );
  };

  const pinHeadline = item => {
    setPinnedHeadlines(old => [...old, item]);
  };

  const renderItem = useCallback(({item, index}) => {
    return <Headline key={index} headline={item} />;
  }, []);

  const RenderList = useMemo(() => {
    return (
      <SwipeListView
        data={newsHeadlines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderHiddenItem={({item}) => (
          <View style={styles.hiddenItem}>
            <Text style={styles.delete}>Delete</Text>
            <Text style={styles.pinToTop}>Pin to Top</Text>
          </View>
        )}
        swipeToOpenPercent={10} // Set the percentage of swipe needed to trigger action
        swipeToClosePercent={10}
        leftOpenValue={75}
        rightOpenValue={-75}
        leftActivationValue={85}
        rightActivationValue={-85}
        onLeftAction={e => {
          removeHeadline(newsHeadlines[e]);
        }}
        onRightAction={e => {
          pinHeadline(newsHeadlines[e]);
          removeHeadline(newsHeadlines[e]);
        }}
      />
    );
  }, [newsHeadlines]);

  useEffect(() => {
    setNewsHeadlines(old => [...headlines, ...old]);
  }, [headlines]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#AF8260', padding: 50}}>
      {!_isEmpty(pinnedHeadlines) && (
        <>
          <Text style={styles.title}>Pinned Headlines</Text>
          <FlatList
            style={{maxHeight: '40%'}}
            data={pinnedHeadlines}
            renderItem={renderItem}
          />
        </>
      )}
      <Text style={styles.title}>Latest Headlines</Text>
      {RenderList}
    </SafeAreaView>
  );
};

export default NewsHeadlines;

const styles = StyleSheet.create({
  hiddenItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  delete: {
    fontWeight: '400',
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    color: 'white',
    overflow: 'hidden',
    textAlign: 'left',
  },
  pinToTop: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'green',
    overflow: 'hidden',
    color: 'white',
    textAlign: 'right',
  },
  title: {
    textAlign: 'center',
    fontWeight: '800',
    marginVertical: 10,
  },
});
