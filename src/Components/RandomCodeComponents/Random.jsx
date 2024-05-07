import React, { useEffect, useState } from "react";
import "./Random.css";
import RefreshIcon from "../Data/refresh.png";

function Random() {
  const [quote, setQuote] = useState(null);
  const [searchAuthor, setSearchAuthor] = useState("");

  const loadRandomQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      setQuote({
        quote: randomQuote.text,
        author: randomQuote.author,
      });
    } catch (error) {
      console.error("Error fetching random quote:", error);
    }
  };

  const searchQuoteByAuthor = async () => {
    try {
      const response = await fetch(
        `https://type.fit/api/quotes?author=${searchAuthor}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.length > 0) {
        const firstQuote = data[0];
        setQuote({
          quote: firstQuote.text,
          author: firstQuote.author,
        });
      } else {
        setQuote(null);
      }
    } catch (error) {
      console.error("Error searching quotes by author:", error);
    }
  };

  useEffect(() => {
    loadRandomQuote();
  }, []);

  return (
    <div className="Container">
      <label htmlFor="" className="label-text">
        Enter the author Name:
        <input
          type="text"
          className="input-text"
          placeholder="author Name"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <button className="search-btn" onClick={searchQuoteByAuthor}>
          Search
        </button>
      </label>

      {quote && (
        <div>
          <div className="quote">{quote.quote}</div>
          <div className="line"></div>
          <div className="bottom">
            <div className="author">- {quote.author.split(",")[0]}</div>
            <div className="icons">
              <img
                src={RefreshIcon}
                onClick={loadRandomQuote}
                alt="refresh icon"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Random;
