import { useState, useContext, createContext, useEffect } from "react";

const BookingContext = createContext();
const BookingProvider = ({ children }) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    let existingBookItem = localStorage.getItem("booking");
    if (existingBookItem) setBook(JSON.parse(existingBookItem));
  }, []);

  return (
    <BookingContext.Provider value={[book, setBook]}>
      {children}
    </BookingContext.Provider>
  );
};

// custom hook
const useBook = () => useContext(BookingContext);

export { useBook, BookingProvider };
