const fetchNewsHeadlines = async () => {
  try {
    const response = await axios.get(NEWS_API_URL);
    const headlines = response.data.articles;
    // Process headlines here, store in AsyncStorage, etc.
    console.log(headlines);
  } catch (error) {
    console.error('Error fetching news headlines:', error);
  }
};
