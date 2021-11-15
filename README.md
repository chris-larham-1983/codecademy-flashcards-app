# Table of Contents

* [General Information](#general-information)
* [Technologies](#technologies)
* [Using the App](#using-the-app)
* [State](#state)
* [Routes](#routes)
* [Testing](#to-test)

***

## General Information

This is my solution to the **Codecademy** *Flashcards* challenge project, wherein I had to design 
a **React app** that allows users to create custom quizzes.

***

## Technologies
  
I wrote this **React app** primarily using *ReactJS* and *JSX*.  I designed informative paragraphs that are displayed if 
the User tries to create a new topic without specifying a topic name/topic icon, as well as informative paragraphs that 
are displayed if the User tries to create a new quiz without specifying a quiz name/valid topic.

I wrote unit tests for 'cardSlice.js', 'quizzesSlice.js', 'topicsSlice.js', 'NewQuizForm.js', 'NewTopicForm.js', and 'App.js', 
using the Jest test framework.

***

## Using the App

This app can be viewed and used at:

- https://codecademy-flashcards-app.surge.sh

Alternatively, run `npm start` in the project root and the app will be available on port 3000.

***

# State

The app's state is totally normalized, with slices for topics, quizzes, and cards.

# Routes

- `/new-topic` – form to create a new topic
- `/topics` – index of all topics
- `/topics/:topicId` – page for an individual topic
- `/new-quiz` – form to create a new quiz
- `/quizzes` – index of all quizzes
- `/quizzes/:quizId` – page for an individual quiz

# To Test

1. Create topics
2. Create quizzes
3. Visit the page for an individual quiz and flip the cards over

