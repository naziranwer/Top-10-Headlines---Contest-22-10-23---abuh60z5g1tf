import React,{useState,useEffect} from "react";
import '../styles/App.css';

const API_KEY = 'afc397cb85095ddf99c5613f42957c5f'; // Replace with your actual API key

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    

    fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&max=10&lang=en`)
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, [category]);

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news</h1>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      <p className='loader'>Loading...</p>
      <ol>
        {newsData.map((news, index) => (
          <li key={index}>
            <img className='news-img' src={news.image} alt=""/>
            <section className='new-title-content-author'>
              <h3 className='news-title'>{news.title}</h3>
              <section className='new-content-author'>
                <p className='news-description'>{news.description}</p>
                <p className='news-source'><strong>Source:</strong> {news.source.name}</p>
              </section>
            </section>
          </li>
        ))}
      </ol>
      }
    </div>
  );
}

export default App;
