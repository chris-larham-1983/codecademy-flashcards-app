import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { useSelector, useDispatch } from 'react-redux';
import { topicsSelector } from '../features/topics/topicsSlice';
import { addQuizThunk } from '../features/quizzes/quizzesSlice';
import { addCard } from '../features/cards/cardsSlice';

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const history = useHistory();
  const topics = useSelector(topicsSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      document.getElementById('quizNameError').removeAttribute("hidden");
      return;
    }

    if(topicId === '') {
      document.getElementById('topicIdError').removeAttribute("hidden");
      return;
    }

    const cardIds = [];

    cards.forEach((card) => {
      let cardId = uuidv4();
      cardIds.push(cardId);
      dispatch(addCard({
        ...card,
        id: cardId
      }));
    });

    dispatch(addQuizThunk({
          id: uuidv4(),
          name: name,
          topicId: topicId,
          cardIds: cardIds
        })
    );

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
      <section>
        <h1>Create a new quiz</h1>
        <form onSubmit={handleSubmit}>
          <input
              id="quiz-name"
              value={name}
              onChange={(e) => {
                  setName(e.currentTarget.value);
                  if(e.currentTarget.value.trim() === '') {
                      document.getElementById("quizNameError").removeAttribute("hidden");
                  } else {
                      document.getElementById("quizNameError").setAttribute("hidden", "true");
                  }}}
              placeholder="Quiz Title"
          />
          <p id="quizNameError" hidden={true}>Please enter a quiz name.</p>
          <select
              id="quiz-topic"
              onChange={(e) => {
                setTopicId(e.currentTarget.value);
                if(e.currentTarget.value.trim() === '') {
                  document.getElementById("topicIdError").removeAttribute("hidden");
                } else {
                  document.getElementById("topicIdError").setAttribute("hidden", "true");
                }}}
              placeholder="Topic"
          >
            <option value="">Topic</option>
            {Object.values(topics).map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
            ))}
          </select>
          <p id='topicIdError' hidden={true}>Please select a valid topic.  To create a topic, click the "Topics" tab.</p>
          {cards.map((card, index) => (
              <div key={index} className="card-front-back">
                <input
                    id={`card-front-${index}`}
                    value={cards[index].front}
                    onChange={(e) =>
                        updateCardState(index, "front", e.currentTarget.value)
                    }
                    placeholder="Front"
                />

                <input
                    id={`card-back-${index}`}
                    value={cards[index].back}
                    onChange={(e) =>
                        updateCardState(index, "back", e.currentTarget.value)
                    }
                    placeholder="Back"
                />

                <button
                    onClick={(e) => removeCard(e, index)}
                    className="remove-card-button"
                >
                  Remove Card
                </button>
              </div>
          ))}
          <div className="actions-container">
            <button className="addCard" onClick={addCardInputs}>Add a Card</button>
            <button>Create Quiz</button>
          </div>
        </form>
      </section>
  );
}
