import quizzesReducer, { addQuiz, quizzesSelector } from './quizzesSlice';

describe('quizzesSlice state', () => {
    it('should have an initial state with typeof object', () => {
        const previousState = undefined;
        expect(typeof quizzesReducer(previousState, {})).toEqual('object');
    });

    describe('quizzesSlice reducer', () => {
        it('should return an empty object as the initial state', () => {
            const previousState = undefined;
            const expectedState = {
                quizzes: {}
            };
            expect(quizzesReducer(previousState, {})).toEqual(expectedState);
        });

        describe('addQuiz action', () => {
            it('should add a quiz to an empty "quizzes" object', () => {
                const previousState = {
                    quizzes: {}
                };
                const expectedState = {
                    quizzes: {
                        '1': {
                            id: '1',
                            topicId: '1',
                            name: 'Quiz 1 for Topic 1',
                            cardIds: ['1', '2', '3'],
                        }
                    }
                };
                expect(quizzesReducer(previousState, addQuiz({
                    id: '1',
                    topicId: '1',
                    name: 'Quiz 1 for Topic 1',
                    cardIds: ['1', '2', '3'],
                }))).toEqual(expectedState);
            });

            it('should add a quiz to a non-empty "quizzes" object', () => {
                const previousState = {
                    quizzes: {
                        '1': {
                            id: '1',
                            topicId: '1',
                            name: 'Quiz 1 for Topic 1',
                            cardIds: ['1', '2', '3'],
                        }
                    }
                };
                const expectedState = {
                    quizzes: {
                        '1': {
                            id: '1',
                            topicId: '1',
                            name: 'Quiz 1 for Topic 1',
                            cardIds: ['1', '2', '3'],
                        },
                        '2': {
                            id: '2',
                            topicId: '1',
                            name: 'Quiz 2 for Topic 1',
                            cardIds: ['4', '5', '6'],
                        }
                    }
                };

                expect(quizzesReducer(previousState, addQuiz({
                    id: '2',
                    topicId: '1',
                    name: 'Quiz 2 for Topic 1',
                    cardIds: ['4', '5', '6'],
                }))).toEqual(expectedState);
            });
        });

        describe('quizzesSelector selector', () => {
            it('should return the correct "quizzes" object after a quiz is added to an empty quizzes object', () => {
                const previousState = {
                    quizzes: {},
                };
                const initialState = { quizzes: previousState };
                expect(quizzesSelector(initialState)).toEqual({}); //returns an empty object before a quiz is added

                const expectedState = {
                    quizzes: {
                        '1': {
                            id: '1',
                            topicId: '1',
                            name: 'Quiz 1 for Topic 1',
                            cardIds: ['1', '2', '3'],
                        }
                    }
                };

                const newState = quizzesReducer(previousState, addQuiz({
                    id: '1',
                    topicId: '1',
                    name: 'Quiz 1 for Topic 1',
                    cardIds: ['1', '2', '3'],
                }));

                const rootState = { quizzes: newState };

                expect(quizzesSelector(rootState)).toEqual(expectedState.quizzes); //returns an object with one quiz after the first quiz is added
            });
        });
    });
});