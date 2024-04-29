import React, {useEffect, useRef, useState} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NewsHeadlines from './components/NewsHeadlines';
import _isEmpty from 'lodash/isEmpty';


const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=126e3a608331412b9f0d8ce770e4975a`;
//126e3a608331412b9f0d8ce770e4975a
const HEADLINES = 'HEADLINES';
const batchSize = 5
const initialBatchSize = 5
const batchUpdateInterval = 10000 //miliseconds


let shouldSetInterval = true;
const App = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(initialBatchSize);
  const oldIndex = useRef(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const storedHeadlines = await AsyncStorage?.getItem(HEADLINES);
      if (storedHeadlines) {
        setHeadlines(JSON.parse(storedHeadlines));
        setLoading(false);
      } else {
        fetchNewsHeadlines();
      }
    } catch (error) {
      alert(error);
      setLoading(false);
      console.error('Error fetching data: ', error);
    }
  };

  const fetchNewsHeadlines = async () => {
    try {
      const response = await axios.get(NEWS_API_URL);
      const fetchedHeadlines = response?.data?.articles;
      setHeadlines(fetchedHeadlines);
      setLoading(false);
      AsyncStorage.setItem(HEADLINES, JSON.stringify(fetchedHeadlines));
    } catch (error) {
      alert(error);
      setLoading(false);
      console.error('Error fetching news headlines:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (_isEmpty(headlines) || !shouldSetInterval) {
      return;
    }
    console.log({headlines})
    const myInterval = setInterval(() => {
      setIndex(old => {
        let newValue = old + batchSize;
        if (newValue >= headlines.length) {
          shouldSetInterval = false;
          clearInterval(myInterval);
        }
        oldIndex.current = old;
        return newValue;
      });
    }, batchUpdateInterval);

    return () => {
      clearInterval(myInterval);
    }
  }, [headlines]);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <NewsHeadlines
      headlines={headlines.slice(oldIndex.current, Math.min(index, headlines.length))}
    />
  );
};

export default App;
