import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

const CountryNews = () => {
  const { iso } = useParams();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    console.log("Fetching news for ISO code:", iso); // Debug the ISO code

    try {
      const response = await fetch(`https://news-aggregator-dusky.vercel.app/country/${iso}?page=${page}&pageSize=${pageSize}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const json = await response.json();
      console.log("API Response:", json);  // Debug the API response

      if (json.success && json.data) {
        setArticles(json.data.articles || []);
        setTotalResults(json.data.totalResults || 0);
      } else {
        throw new Error(json.message || "Unexpected API response");
      }
    } catch (err) {
      console.error("Error fetching country news:", err);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, iso]);

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <>
      {error && <div className="text-red-500 text-center my-4">{error}</div>}

      <div className="my-10 grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {isLoading ? (
          <Loader />
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <EverythingCard
              key={index}
              title={article.title}
              description={article.description}
              imgUrl={article.urlToImage}
              publishedAt={article.publishedAt}
              url={article.url}
              author={article.author}
              source={article.source?.name}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <p>No news articles found for this country.</p>
          </div>
        )}
      </div>

      {!isLoading && articles.length > 0 && (
        <div className="flex justify-center items-center gap-14 my-10">
          <button
            onClick={() => setPage(prev => prev - 1)}
            disabled={page <= 1}
            className="pagination-btn"
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            Page {page} of {totalPages}
          </p>
          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={page >= totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default CountryNews;





//second commit
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import EverythingCard from './EverythingCard';
// import Loader from './Loader';

// const CountryNews = () => {
//   const { iso } = useParams(); // Clean destructuring
//   const [articles, setArticles] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const pageSize = 6;

//   const fetchNews = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`https://news-aggregator-dusky.vercel.app/country/${iso}?page=${page}&pageSize=${pageSize}`);
//       if (!response.ok) throw new Error("Network response was not ok");

//       const json = await response.json();

//       if (json.success && json.data) {
//         setArticles(json.data.articles || []);
//         setTotalResults(json.data.totalResults || 0);
//       } else {
//         throw new Error(json.message || "Unexpected API response");
//       }
//     } catch (err) {
//       console.error("Error fetching country news:", err);
//       setError("Failed to fetch news. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, [page, iso]);

//   const totalPages = Math.ceil(totalResults / pageSize);

//   return (
//     <>
//       {error && <div className="text-red-500 text-center my-4">{error}</div>}

//       <div className="my-10 grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
//         {isLoading ? (
//           <Loader />
//         ) : articles.length > 0 ? (
//           articles.map((article, index) => (
//             <EverythingCard
//               key={index}
//               title={article.title}
//               description={article.description}
//               imgUrl={article.urlToImage}
//               publishedAt={article.publishedAt}
//               url={article.url}
//               author={article.author}
//               source={article.source?.name}
//             />
//           ))
//         ) : (
//           <div className="col-span-full flex justify-center items-center min-h-[200px]">
//             <p>No news articles found for this country.</p>
//           </div>
//         )}
//       </div>

//       {!isLoading && articles.length > 0 && (
//         <div className="flex justify-center items-center gap-14 my-10">
//           <button
//             onClick={() => setPage(prev => prev - 1)}
//             disabled={page <= 1}
//             className="pagination-btn"
//           >
//             Prev
//           </button>
//           <p className="font-semibold opacity-80">
//             Page {page} of {totalPages}
//           </p>
//           <button
//             onClick={() => setPage(prev => prev + 1)}
//             disabled={page >= totalPages}
//             className="pagination-btn"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default CountryNews;


//first commit

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import EverythingCard from './EverythingCard';
// import Loader from './Loader';

// function CountryNews() {
//   const params = useParams();
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   function handlePrev() {
//     setPage(page - 1);
//   }

//   function handleNext() {
//     setPage(page + 1);
//   }

//   const pageSize = 6;

//   useEffect(() => {
//     setIsLoading(true);
//     setError(null);
//     fetch(`https://news-aggregator-dusky.vercel.app/country/${params.iso}?page=${page}&pageSize=${pageSize}`)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error('Network response was not ok');
//       })
//       .then((myJson) => {
//         if (myJson.success) {
//           setTotalResults(myJson.data.totalResults);
//           setData(myJson.data.articles);
//         } else {
//           setError(myJson.message || 'An error occurred');
//         }
//       })
//       .catch((error) => {
//         console.error('Fetch error:', error);
//         setError('Failed to fetch news. Please try again later.');
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [page, params.iso]);

//   // console.log("data",data);

//   return (
//     <>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
//         {!isLoading ? (
//           data.length > 0 ? (
//             data.map((element, index) => (
//               <EverythingCard
//                 key={index}
//                 title={element.title}
//                 description={element.description}
//                 imgUrl={element.urlToImage}
//                 publishedAt={element.publishedAt}
//                 url={element.url}
//                 author={element.author}
//                 source={element.source.name}
//               />
//             ))
//           ) : (
//             <div className="col-span-full flex justify-center items-center min-h-[200px]">
//               <p>No news articles found for this criteria.</p>
//             </div>
//           )
//         ) : (
//           <Loader />
//         )}
//       </div>
//       {!isLoading && data.length > 0 && (
//         <div className="pagination flex justify-center gap-14 my-10 items-center">
//           <button
//             disabled={page <= 1}
//             className="pagination-btn"
//             onClick={handlePrev}
//           >
//             Prev
//           </button>
//           <p className="font-semibold opacity-80">
//             {page} of {Math.ceil(totalResults / pageSize)}
//           </p>
//           <button
//             disabled={page >= Math.ceil(totalResults / pageSize)}
//             className="pagination-btn"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// export default CountryNews;