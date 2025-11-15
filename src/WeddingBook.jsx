import React, { useEffect, useRef, useState } from "react";
import "./WeddingBook.css";
import img8 from './assets/invitel.jpg';
import img9 from './assets/invite2.jpg';
import img10 from './assets/inviter.jpg';


const WeddingBook = () => {
  const [flippedPages, setFlippedPages] = useState(new Set());
  const pagesRef = useRef([]);

  // Initialize z-index on mount
  useEffect(() => {
    const pages = pagesRef.current;
    for (let i = 0; i < pages.length; i++) {
      if (i % 2 === 0 && pages[i]) {
        pages[i].style.zIndex = (pages.length - i);
      }
    }
  }, []);

  const handlePageClick = (index) => {
    setFlippedPages(prev => {
      const newFlipped = new Set(prev);
      
      if (index % 2 === 0) {
        // Even index (right page) - flip it and the next page
        newFlipped.add(index);
        newFlipped.add(index + 1);
      } else {
        // Odd index (left page) - unflip it and the previous page
        newFlipped.delete(index);
        newFlipped.delete(index - 1);
      }
      
      return newFlipped;
    });
  };

  // Page contents - customize these for your wedding!
 const pageContents = [
  // Page 0 - Full screen image
  (
    <div 
      key={0}
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <img
        src={img9}
        alt="invitation"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  ),

  // Page 1 - Second full screen image
  (
    <div 
      key={1}
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        background: "#fff"
      }}
    >
      <img
        src={img8}
        alt="page"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  ),

  // Page 2 - Third image + text
  (
    <div 
      key={2}
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <img
        src={img10}
        alt="couple"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

    </div>
  ),

  // Page 3 - Simple text page
  (
    <div
      key={3}
      style={{
        height: "100%",
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <p style={{ fontSize: "6vw" }}>We’re getting married!</p>
    </div>
  ),

  // Page 4 - Save the date
  (
    <div
      key={4}
      style={{
        height: "100%",
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <p style={{ fontSize: "6vw" }}>Save the Date</p>
    </div>
  )
];

  return (
    <div className="wedding-book-container">
      <div className="book">
        <div id="pages" className="pages">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className={`page ${flippedPages.has(index) ? 'flipped' : ''}`}
              ref={el => {
                pagesRef.current[index] = el;
              }}
              onClick={() => handlePageClick(index)}
            >
              {pageContents[index] || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingBook;