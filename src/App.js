import './App.css';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [data, setdata] = useState([])
  const [page, setpage] = useState(1);
  const [totalData, settotalData] = useState(0);

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line
  }, [])
  const fetchData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
      .then((res) => res.json())
      .then((ele) =>{ 
        setdata([...data,...ele]);
        setpage(page+1);
        console.log('ele.length', ele.length)
        settotalData(100) //100 Total data
        console.log('totaldata', totalData)
      })
      .catch((err)=>console.log('err', err))
  }

  return (
    <div className="container">

      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={data.length<totalData}
        loader={<h4>Loading...</h4>}
      >
        {
          data.map((card) => (
            <div className="card my-3" key={card.id}>
              <div className="card-body" >
                <h5 className="card-title">{card.id}</h5>
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.body}</p>
              </div>
            </div>
          ))
        }
      </InfiniteScroll>

    </div>
  );
}

export default App;
