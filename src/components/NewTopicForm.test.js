import React from 'react';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import NewTopicForm from './NewTopicForm';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';

const mockStore = configureStore([]);

describe("<NewTopicForm /> component", () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            topics: {
                '1': {
                    id: '1',
                    name: 'Topic 1',
                    icon: 'Icon URL 1',
                    quizIds: [],
                }
            }
        });

        component = TestRenderer.create(
            <Provider store={store}>
                <NewTopicForm />
            </Provider>
        );
    });

    describe("rendering", () => {
        it('should render the component without crashing', () => {
            expect(component.toJSON()).toBeTruthy();
        });

        it('should render with given state from the Redux store', () => {
            expect(component.toJSON()).toMatchSnapshot();
        });

        it('should render an h1 heading element', () => {
            expect(component.root.findByType('h1')).toBeTruthy();
            expect(component.root.findAllByProps({ className: "center" })[0].children).toStrictEqual(['Create a new topic']); //expect the first element whose className is 'center' (i.e. the h1 heading element) to display the text 'Create a new topic'
        });

        it('should render a form', () => {
            expect(component.root.findByType('form')).toBeTruthy();
        });

        it('should render an "Add Topic" button', () => {
            expect(component.root.findByType('button')).toBeTruthy();
            expect(component.root.findByType('button').children).toStrictEqual(['Add Topic']);
            expect(component.root.findAllByProps({ className: "center" }).length).toEqual(2); //expect there to be two elements (the h1 and the button) whose className is 'center'
        });

        it('should not initially display a paragraph that informs the User of the need to enter a topic name', () => {
            expect(component.root.findByProps({ id: "nameError" })).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[0]).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[0].children).toStrictEqual(['Please enter a topic name.']);
        });

        it('should not initially display a paragraph that informs the User of the need to select an icon', () => {
            expect(component.root.findByProps({ id: "iconError" })).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[2]).toBeTruthy();
            expect(component.root.findAllByProps({ hidden: true })[2].children).toStrictEqual(['Please select a topic icon.']);
        });

        describe('if a new topic form is submitted', () => {
            let store;
            let component;

            beforeEach(() => {
                store = mockStore({
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        }
                    }
                });

                component = render(
                    <Provider store={store}>
                        <NewTopicForm />
                    </Provider>
                );
            });

            it('should display a descriptive paragraph to the User if no topic name is defined', () => {
                const addTopicButton = screen.getByText(/Add Topic/i);
                expect(addTopicButton).toBeInTheDocument(); //check that the button is in the document
                expect(screen.getByText(/Please enter a topic name./i)).not.toBeVisible(); //descriptive paragraph should initially be hidden
                fireEvent.click(addTopicButton); //click the button with no topic name entered
                expect(screen.getByText(/Please enter a topic name./i)).toBeVisible(); //expect the descriptive paragraph to be visible
            });

            it('should display a descriptive paragraph to the User if no topic icon is selected', () => {
                const addTopicButton = screen.getByText(/Add Topic/i);
                const topicNameInput = screen.getByPlaceholderText(/Topic Name/i);
                expect(topicNameInput.value).toBe(""); //expect the value of the topic name input element to be an empty string
                fireEvent.change(topicNameInput, { target: { value: 'New Topic Name' }}); //change the value of the topic name input element to 'New Topic Name'
                expect(topicNameInput.value).toBe('New Topic Name'); //expect the new value of the topic name input element to be 'New Topic Name'
                fireEvent.click(addTopicButton); //click the button with a topic name entered BUT no topic icon selected
                expect(screen.getByText(/Please enter a topic name./i)).not.toBeVisible(); //expect the descriptive paragraph related to the topic name not to be visible
                expect(screen.getByText(/Please select a topic icon./i)).toBeVisible(); //expect the descriptive paragraph related to the topic icon to be visible
            });
        });
        describe('when the User enters a topic name', () => {
            let store;
            let component;

            beforeEach(() => {
                store = mockStore({
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        }
                    }
                });

                component = render(
                    <Provider store={store}>
                        <NewTopicForm />
                    </Provider>
                );
            });


            it('should hide the paragraph that instructs the User to enter a topic name', () => {
                const addTopicButton = screen.getByText(/Add Topic/i);
                const topicNameInput = screen.getByPlaceholderText(/Topic Name/i);
                expect(screen.getByText(/Please enter a topic name./i)).not.toBeVisible(); //descriptive paragraph should initially be hidden
                fireEvent.click(addTopicButton); //click the button with no topic name entered
                expect(screen.getByText(/Please enter a topic name./i)).toBeVisible(); //expect the descriptive paragraph to be visible
                fireEvent.change(topicNameInput, { target: { value: 'New Topic Name' }}); //change the value of the topic name input element to 'New Topic Name'
                expect(screen.getByText(/Please enter a topic name./i)).not.toBeVisible(); //expect the descriptive paragraph to no longer be visible
            });
        });

        describe('when the User selects a topic icon', () => {
            let store;
            let component;

            beforeEach(() => {
                store = mockStore({
                    topics: {
                        '1': {
                            id: '1',
                            name: 'Topic 1',
                            icon: 'Icon URL 1',
                            quizIds: [],
                        }
                    }
                });

                component = render(
                    <Provider store={store}>
                        <NewTopicForm />
                    </Provider>
                );
            });
            it('should hide the descriptive paragraph that instructs the User to select a topic icon', () => {
                const addTopicButton = screen.getByText(/Add Topic/i);
                const topicNameInput = screen.getByPlaceholderText(/Topic Name/i);
                const iconSelector = screen.getByRole('MENU');
                expect(iconSelector).toBeInTheDocument();
                fireEvent.change(topicNameInput, { target: { value: 'New Topic Name' }}); //change the value of the topic name input element to 'New Topic Name'
                fireEvent.click(addTopicButton); //click the button with a topic name entered BUT no topic icon selected
                expect(screen.getByText(/Please select a topic icon./i)).toBeVisible(); //expect the descriptive paragraph related to the topic icon to be visible
                iconSelector[2].selected = true; //set the iconSelector value to 'https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/balloon.svg'
                fireEvent.change(iconSelector); //fire a change event on the iconSelector
                expect(screen.getByText(/Please select a topic icon./i)).not.toBeVisible(); //expect the descriptive paragraph related to the topic icon NOT to be visible
            });
        });
    });
});

