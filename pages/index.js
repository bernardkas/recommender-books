import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/recommend-books", { query });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Book Recommender</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="query">
            What type of book are you interested in?
          </label>
          <input
            id="query"
            placeholder="Write book.."
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={styles.input}
          />
          <button className={styles.button} type="submit">
            Recommend Books
          </button>
        </form>
        {books.length > 0 && (
          <div className={styles.books}>
            <h2 className={styles.booksTitle}>Recommended Books:</h2>
            <ul>
              {books.map((book, index) => (
                <li className={styles.booksLi} key={index}>
                  {index + 1}: {book}
                </li>
              ))}
            </ul>
          </div>
        )}
        <h4 className={styles.infotitle}>
          Press The button Recommend Books more than one click{" "}
        </h4>
      </div>
    </div>
  );
}
