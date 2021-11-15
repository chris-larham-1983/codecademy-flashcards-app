import cardsReducer, { cardsSelector, addCard } from "./cardsSlice";

describe('cardsSlice state', () => {
    it('should have an initial state with typeof object', () => {
        const previousState = undefined;
        expect(typeof cardsReducer(previousState, {})).toEqual('object');
    });

    describe('cardsSlice reducer', () => {
        it('should return the inital state', () => {
            const previousState = undefined;
            const expectedState = {
                cards: {}
            };
            const resultState = cardsReducer(previousState, {});
            expect(resultState).toEqual(expectedState);
        });

        describe('addCard action', () => {
            it('should add a card to an empty "cards" object', () => {
                const previousState = {
                    cards: {}
                };
                const expectedState = {
                    cards: {
                        '1': {
                            id: '1',
                            front: 'Codecademy',
                            back: 'Full Stack Engineer Path',
                        }
                    }
                };
                const resultState = cardsReducer(previousState, addCard({
                    id: '1',
                    front: 'Codecademy',
                    back: 'Full Stack Engineer Path',
                }));
                expect(resultState).toEqual(expectedState);
            });

            it('should add a card to a non-empty "cards" object', () => {
                const previousState = {
                    cards: {
                        '1': {
                            id: '1',
                            front: 'Codecademy',
                            back: 'Full Stack Engineer Path',
                        }
                    }
                };
                const expectedState = {
                    cards: {
                        '1': {
                            id: '1',
                            front: 'Codecademy',
                            back: 'Full Stack Engineer Path',
                        },
                        '2': {
                            id: '2',
                            front: 'IT Career',
                            back: 'Switch',
                        }
                    }
                };
                const resultState = cardsReducer(previousState, addCard({
                    id: '2',
                    front: 'IT Career',
                    back: 'Switch',
                }));
                expect(resultState).toEqual(expectedState);
            });
        });
    });

    describe('"cardsSelector" selector', () => {
        it('should return an empty object when called on the initial state', () => {
            const previousState = undefined;
            const expectedState = {
                cards: {}
            };
            const newState = cardsReducer(previousState, {});
            const rootState = { cards: newState };
            expect(cardsSelector(rootState)).toEqual(expectedState.cards);
        });

        it('should return the correct cards when "cards" is non-empty', () => {
            const previousState = {
                cards: {
                    '1': {
                        id: '1',
                        front: 'Codecademy',
                        back: 'Full Stack Engineer Path',
                    },
                    '2': {
                        id: '2',
                        front: 'IT',
                        back: 'Career Switch',
                    },
                    '3': {
                        id: '3',
                        front: 'React',
                        back: 'Flashcards Project',
                    }
                }
            };
            const expectedState = {
                cards: {
                    '1': {
                        id: '1',
                        front: 'Codecademy',
                        back: 'Full Stack Engineer Path',
                    },
                    '2': {
                        id: '2',
                        front: 'IT',
                        back: 'Career Switch',
                    },
                    '3': {
                        id: '3',
                        front: 'React',
                        back: 'Flashcards Project',
                    }
                }
            };
            const newState = cardsReducer(previousState, {});
            const rootState = { cards: newState };

            expect(cardsSelector(rootState)).toEqual(expectedState.cards);
        });

        it('should return the correct cards when topics and quizzes are also held in state', () => {
            const previousState = {
                topics: {
                    '1': {
                        id: '1',
                        name: 'Topic 1',
                        icon: 'Icon URL 1',
                        quizIds: ['1'],
                    }
                },
                quizzes: {
                    '1': {
                        id: '1',
                        topicId: '1',
                        name: 'Quiz 1 for Topic 1',
                        cardIds: ['1', '2', '3'],
                    }
                },
                cards: {
                    '1': {
                        id: '1',
                        front: 'Codecademy',
                        back: 'Full Stack Engineer Path',
                    },
                    '2': {
                        id: '2',
                        front: 'IT',
                        back: 'Career Switch',
                    },
                    '3': {
                        id: '3',
                        front: 'React',
                        back: 'Flashcards Project',
                    }
                }
            };
            const expectedState = {
                topics: {
                    '1': {
                        id: '1',
                        name: 'Topic 1',
                        icon: 'Icon URL 1',
                        quizIds: ['1'],
                    }
                },
                quizzes: {
                    '1': {
                        id: '1',
                        topicId: '1',
                        name: 'Quiz 1 for Topic 1',
                        cardIds: ['1', '2', '3'],
                    }
                },
                cards: {
                    '1': {
                        id: '1',
                        front: 'Codecademy',
                        back: 'Full Stack Engineer Path',
                    },
                    '2': {
                        id: '2',
                        front: 'IT',
                        back: 'Career Switch',
                    },
                    '3': {
                        id: '3',
                        front: 'React',
                        back: 'Flashcards Project',
                    }
                }
            };
            const newState = cardsReducer(previousState, {});
            const rootState = { cards: newState };
            expect(cardsSelector(rootState)).toEqual(expectedState.cards);
        });
    });
});