import logo from './logo.svg';
import './App.css';
import { getDogs } from './dogapi';
import React, { useEffect, useState } from 'react';

const size = 3;
// TODO replace with your slideshow App
const App = () => {
  const [dogs, setDogs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetch() {
      const dogsTemp = await getDogs(size);
      setDogs(dogsTemp);
    }
    console.log('hi');

    fetch();
  }, []);

  const changeIndex = index => {
    let indexTemp;
    if (index < 0) {
      indexTemp = size + index;
    } else {
      indexTemp = index % size;
    }

    setIndex(indexTemp);
  };

  return (
    <section>
      {dogs.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 4fr 1fr'
          }}
        >
          <div
            style={{
              backgroundColor: 'lightgreen',
              // justifyContent: 'center'
              // paddingRight: 0
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <button
              style={{
                backgroundColor: 'lightcoral',
                // justifySelf: 'center',
                // display: 'inline-block',
                // margin: '0 auto'
                alignSelf: 'flex-end'
              }}
              onClick={() => changeIndex(index - 1)}
            >
              Previous dog
            </button>
          </div>
          <div style={{ alignItems: 'center', backgroundColor: 'lightblue' }}>
            <img
              style={{ alignSelf: 'center', height: 200 }}
              src={dogs[index].url}
            />{' '}
            <p style={{ textAlign: 'center' }}>{dogs[index].title}</p>
          </div>
          <div
            style={{
              backgroundColor: 'lightgreen',
              // justifyContent: 'center'
              // paddingRight: 0
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <button
              style={{
                backgroundColor: 'lightcoral',
                // justifySelf: 'center',
                // display: 'inline-block',
                // margin: '0 auto'
                alignSelf: 'flex-end'
              }}
              // style={{ flexGrow: '1 1 0' }}
              onClick={() => changeIndex(index + 1)}
            >
              Next dog
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default App;
