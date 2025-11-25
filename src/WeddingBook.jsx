import React, { useEffect, useRef, useState } from "react";
import "./WeddingBook.css";
import img8 from './assets/invitel.jpg';
import img9 from './assets/invite2.jpg';
import img10 from './assets/inviter.jpg';
import SakuraPetals from "./SakuraPetals";
import img11 from './assets/img.jpg';


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
    // Page 0 - Cover with animated click indicator
    (
      <div 
        key={0}
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          position: "relative"
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
        {/* Animated Click Here Indicator */}
        <div className="click-indicator">
          <div className="click-text">उघडा</div>
          <div className="click-arrow">➜</div>
        </div>
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

    // Page 2 - Third image
    (
      <div 
        key={2}
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden"
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

    // Page 3 - Final page with image and thank you text
     (
      <div
        key={3}
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          textAlign: "center",
          background:" #d3cdc6ff"
        }}
      >
        <div className="final-image-container">
          <img
            src={img11} // You can change this to your specific final image
            alt="Thank You"
            className="final-image"
          />
        </div>
        <div className="thank-you-text">धन्यवाद</div>
        <p className="final-message">
        </p>
      </div>
    )
  ];

  return (
    <>
      <SakuraPetals/>
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
    </>
  );
};

export default WeddingBook;