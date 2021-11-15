import topicsReducer, { addTopic, addQuizId, topicsSelector } from "./topicsSlice";

describe('topicsSlice state', () => {
    it('should have an initial state with typeof object', () => {
        const previousState = undefined;
        expect(typeof topicsReducer(previousState, {})).toEqual('object');
    });

    describe('topicsSlice reducer', () => {
        it('should return the initial state', () => {
            const previousState = undefined;
            const expectedState = {
                topics: {}
            };
            const resultState = topicsReducer(previousState, {});
            expect(resultState).toEqual(expectedState);
        });

        describe('addTopic action', () => {
            it('should add a topic to an initially-empty "topics" object', () => {
                const previousState = {
                    topics: {}
                };
                const expectedState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        }
                    }
                };
                const resultState = topicsReducer(previousState, addTopic({
                    id: '1',
                    name: 'Topic 1',
                    icon: 'Icon URL 1',
                    quizIds: [],
                }));
                expect(resultState).toEqual(expectedState);
            });

            it('should add a topic to a non-empty "topics" object', () => {
                const previousState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        }
                    }
                };
                const expectedState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        },
                        '2': {
                            id: '2',
                            name: 'Topic 2',
                            icon: 'Icon URL 2',
                            quizIds: [],
                        }
                    }
                };
                const resultState = topicsReducer(previousState, addTopic({
                    id: '2',
                    name: 'Topic 2',
                    icon: 'Icon URL 2',
                    quizIds: [],
                }));
                expect(resultState).toEqual(expectedState);
            });
        });

        describe('addQuizId action', () => {
            it('adds a quiz id to an empty "quizIds" array', () => {
                const previousState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        },
                        '2': {
                            id: '2',
                            name: 'Topic 2',
                            icon: 'Icon URL 2',
                            quizIds: [],
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
                        },
                        '2': {
                            id: '2',
                            name: 'Topic 2',
                            icon: 'Icon URL 2',
                            quizIds: [],
                        }
                    }
                };
                const resultState = topicsReducer(previousState, addQuizId({
                    quizId: '1',
                    topicId: '1',
                }));
                expect(resultState).toEqual(expectedState);
            });

            it('adds a quiz id to a non-empty "quizIds" array', () => {
                const previousState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: ['1'],
                        },
                        '2': {
                            id: '2',
                            name: 'Topic 2',
                            icon: 'Icon URL 2',
                            quizIds: ['2'],
                        }
                    }
                };
                const expectedState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: ['1', '3'],
                        },
                        '2': {
                            id: '2',
                            name: 'Topic 2',
                            icon: 'Icon URL 2',
                            quizIds: ['2'],
                        }
                    }
                };
                const resultState = topicsReducer(previousState, addQuizId({
                    quizId: '3',
                    topicId: '1',
                }));
                expect(resultState).toEqual(expectedState);
            });
        });

        describe('topicsSelector selector', () => {
            it('should return an empty object when called on the initial state', () => {
                const previousState = undefined;
                const expectedState = {
                    topics: {}
                };
                const newState = topicsReducer(previousState, {});
                const rootState = { topics: newState };
                expect(topicsSelector(rootState)).toEqual(expectedState.topics);
            });

            it('should return the correct topics when "topics" holds an object', () => {
                const previousState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        }
                    }
                };
                const expectedState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        },
                        '2': {
                            id: '2',
                            name: 'Topic 2',
                            icon: 'Icon URL 2',
                            quizIds: [],
                        }
                    }
                };
                const newState = topicsReducer(previousState, addTopic({
                    id: '2',
                    name: 'Topic 2',
                    icon: 'Icon URL 2',
                    quizIds: [],
                }));
                const rootState = { topics: newState };
                expect(topicsSelector(rootState)).toEqual(expectedState.topics);
            });
            it('should return the correct topics when state also holds quizzes', () => {
                const previousState = {
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icons: 'Icon URL 1',
                            quidIds: ['1'],
                        }
                    },
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
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icons: 'Icon URL 1',
                            quidIds: ['1'],
                        }
                    },
                    quizzes: {
                        '1': {
                            id: '1',
                            topicId: '1',
                            name: 'Quiz 1 for Topic 1',
                            cardIds: ['1', '2', '3'],
                        }
                    }
                };
                const newState = topicsReducer(previousState, {});
                const rootState = { topics: newState };
                expect(topicsSelector(rootState)).toEqual(expectedState.topics);
            });
        });
    });
});