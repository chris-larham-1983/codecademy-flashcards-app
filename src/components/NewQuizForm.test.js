import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import NewQuizForm from './NewQuizForm';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';

const mockStore = configureStore([]);

describe('<NewQuizForm /> component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            topics: {
                topics: {
                    '1': {
                        id: '1',
                        name: 'Topic 1',
                        icon: 'Icon URL 1',
                        quizIds: ['2'],
                    }
                }
            },
            quizzes: {
                quizzes: {
                    '2': {
                        id: '2',
                        topicId: '1',
                        name: 'Quiz 1 for Topic 1',
                        cardIds: ['1', '2', '3'],
                    }
                }
            }
        });

        component = renderer.create(
            <Provider store={store}>
                <NewQuizForm />
            </Provider>
        );
    });

    describe('rendering', () => {
        it('should render the component without crashing', () => {
            expect(component.toJSON()).toBeTruthy();
        });

        it('should render with given state from the Redux store', () => {
            expect(component.toJSON()).toMatchSnapshot();
        });

        it('should render an h1 heading element', () => {
            expect(component.root.findByType('h1')).toBeTruthy();
            expect(component.root.findByType('h1').children).toStrictEqual(['Create a new quiz']);
        });

        it('should render a form', () => {
            expect(component.root.findByType('form')).toBeTruthy();
        });

        it('should render an "Add a Card" button', () => {
            expect(component.root.findAllByType('button')[0].children).toStrictEqual(['Add a Card']);
        });

        it('should render a "Create Quiz" button', () => {
            expect(component.root.findAllByType('button')[1].children).toStrictEqual(['Create Quiz']);
        });

        it('should not initially display a paragraph that informs the User of the need to enter a quiz name', () => {
            expect(component.root.findByProps({ id: "quizNameError" })).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[0]).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[0].children).toStrictEqual(['Please enter a quiz name.']);
        });

        it('should not initially display a paragraph that informs the User of the need to select a topic', () => {
            expect(component.root.findByProps({ id: "topicIdError"})).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[1]).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[1].children).toStrictEqual(['Please select a valid topic.  To create a topic, click the "Topics" tab.']);
        });

        describe('when the User enters a quiz name', () => {
            let store;
            let component;

            beforeEach(() => {
                store = mockStore({
                    topics: {
                        topics: {
                            '1': {
                                id: '1',
                                name: 'Topic 1',
                                icon: 'Icon URL 1',
                                quizIds: ['2'],
                            }
                        }
                    },
                    quizzes: {
                        quizzes: {
                            '2': {
                                id: '2',
                                topicId: '1',
                                name: 'Quiz 1 for Topic 1',
                                cardIds: ['1', '2', '3'],
                            }
                        }
                    }
                });

                component = render(
                    <Provider store={store}>
                        <NewQuizForm />
                    </Provider>
                );
            });


            it('should hide the paragraph that instructs the User to enter a quiz name', () => {
                const createQuizButton = screen.getByText(/Create Quiz/i);
                const quizNameInput = screen.getByPlaceholderText(/Quiz Title/i);
                expect(screen.getByText(/Please enter a quiz name./i)).not.toBeVisible(); //descriptive paragraph should initially be hidden
                fireEvent.click(createQuizButton); //click the button with no quiz name entered
                expect(screen.getByText(/Please enter a quiz name./i)).toBeVisible(); //expect the descriptive paragraph to be visible
                fireEvent.change(quizNameInput, { target: { value: 'New Quiz Name' }}); //change the value of the quiz name input element to 'New Quiz Name'
                expect(screen.getByText(/Please enter a quiz name./i)).not.toBeVisible(); //expect the descriptive paragraph to no longer be visible
            });
        });

        describe('when the User selects a valid topic', () => {
            let store;
            let component;

            beforeEach(() => {
                store = mockStore({
                    topics: {
                        topics: {
                            '1': {
                                id: '1',
                                name: 'Topic 1',
                                icon: 'Icon URL 1',
                                quizIds: ['2'],
                            }
                        }
                    },
                    quizzes: {
                        quizzes: {
                            '2': {
                                id: '2',
                                topicId: '1',
                                name: 'Quiz 1 for Topic 1',
                                cardIds: ['1', '2', '3'],
                            }
                        }
                    }
                });

                component = render(
                    <Provider store={store}>
                        <NewQuizForm />
                    </Provider>
                );
            });
            it('should hide the descriptive paragraph that instructs the User to select a valid topic', () => {
                const createQuizButton = screen.getByText(/Create Quiz/i);
                const quizNameInput = screen.getByPlaceholderText(/Quiz Title/i);
                const topicSelector = screen.getByPlaceholderText(/Topic/);
                expect(topicSelector).toBeInTheDocument();
                fireEvent.change(quizNameInput, { target: { value: 'New Quiz Name' }}); //change the value of the quiz name input element to 'New Quiz Name'
                fireEvent.click(createQuizButton); //click the button with a quiz name entered BUT no quiz topic selected
                expect(screen.getByText(/Please enter a quiz name./i)).not.toBeVisible(); //expect the descriptive paragraph related to the quiz name not to be visible
                expect(screen.getByText(/Please select a valid topic. To create a topic, click the "Topics" tab./i)).toBeVisible(); //expect the descriptive paragraph related to the topic to be visible
                topicSelector[1].selected = true; //set the topicSelector value to 'Topic 1'
                fireEvent.change(topicSelector); //fire a change event on the topicSelector
                expect(screen.getByText(/Please select a valid topic. To create a topic, click the "Topics" tab./i)).not.toBeVisible(); //expect the descriptive paragraph related to the topic icon NOT to be visible
            });
        });
    });
});