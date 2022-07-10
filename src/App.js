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
        <div>
          {/* <p>index: {index}</p>{" "} */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: 200,
              width: 'auto',
              paddingBottom: 20
            }}
          >
            <img src={dogs[index].url} />
          </div>{' '}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              style={{ flex: '1 1 0' }}
              onClick={() => changeIndex(index - 1)}
            >
              Previous dog
            </button>
            <span style={{ maxHeight: 10, flexGrow: '8 1 0' }}>
              {dogs[index].title}
            </span>

            <button
              style={{ flexGrow: '1 1 0' }}
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
