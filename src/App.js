import logo from './logo.svg';
import './App.css';
import { getDogs } from './dogapi';
import React, { useEffect, useState } from 'react';

const size = 10;
// TODO replace with your slideshow App
const App = () => {
  const [dogs, setDogs] = useState([]);
  const [index, setIndex] = useState(0);
  const [comment, setComment] = useState('');

  const getDogsWithCommentsAndUpvotes = arr => {
    return arr.map(elem => {
      return {
        ...elem,
        comments: [
          { comment: 'placeholder one', upvoteCount: 1 },
          { comment: 'placeholder two', upvoteCount: 200 },
          { comment: 'placeholder three', upvoteCount: 3 }
        ]
      };
    });
  };

  useEffect(() => {
    async function fetch() {
      const dogsTemp = await getDogs(size);
      console.log('dogsTemp', dogsTemp);
      const dogsWithCommentsAndUpvotes =
        getDogsWithCommentsAndUpvotes(dogsTemp);
      console.log('dogsWithCommentsAndUpvotes', dogsWithCommentsAndUpvotes);
      setDogs(dogsWithCommentsAndUpvotes);
    }
    console.log('hi');

    fetch();
  }, []);

  const addComment = () => {
    const curDog = dogs[index];
    // debugger;
    curDog.comments.push({ comment: comment, upvoteCount: 0 });
    const dogsCopy = JSON.parse(JSON.stringify(dogs));
    dogsCopy[index] = curDog;
    setDogs(dogsCopy);
    setComment('');
  };

  const increaseVote = commentIndex => {
    console.log('commentIndex ', commentIndex);
    const curDog = dogs[index];
    curDog.comments[commentIndex].upvoteCount++;
    const dogsCopy = JSON.parse(JSON.stringify(dogs));
    dogsCopy[index] = curDog;
    setDogs(dogsCopy);
  };

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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 4fr 1fr',
              gridTemplateRows: 'repeat(3, 1fr)',
              height: 300,
              backgroundColor: 'pink'
            }}
          >
            {/* top section */}
            <div
              style={{
                gridColumn: '1/4',
                display: 'flex',
                height: 200,
                justifyContent: 'center',
                padding: 10
              }}
            >
              <img src={dogs[index].url} />
            </div>
            {/* top section */}

            {/* middle section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                gridColumn: '1/2'
              }}
            >
              <button onClick={() => changeIndex(index - 1)}>
                Previous dog
              </button>
            </div>
            <div
              style={{
                gridColumn: '2/3',
                backgroundColor: 'yellow'
              }}
            >
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: 0,

                  verticalAlign: 'bottom'
                }}
              >
                {dogs[index].title}
              </p>
            </div>

            <div
              style={{
                gridColumn: '3/4',
                display: 'flex',
                justifyContent: 'flex-start',
                alignSelf: 'flex-end'
              }}
            >
              <button onClick={() => changeIndex(index + 1)}>Next dog</button>
            </div>
            {/* middle section */}

            {/* comment section */}
            <div
              style={{
                gridColumn: '2/3',
                backgroundColor: 'blue'
              }}
            >
              {' '}
              <h3>Comments</h3>
              <input
                style={{
                  width: '80%',
                  paddingLeft: 5,
                  paddingRight: 5
                }}
                value={comment}
                type='text'
                onChange={e => setComment(e.target.value)}
              />
              <br />
              <button onClick={addComment}>Add comment</button>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {dogs[index].comments.map(
                  ({ comment, upvoteCount }, commentIndex) => (
                    <li style={{ border: '1px solid black', padding: 5 }}>
                      {comment}
                      <p>
                        Votes: {upvoteCount}{' '}
                        <button onClick={() => increaseVote(commentIndex)}>
                          Vote
                        </button>
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
            {/* comment section */}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default App;
