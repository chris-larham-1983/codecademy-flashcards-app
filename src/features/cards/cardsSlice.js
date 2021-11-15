import { createSlice } from '@reduxjs/toolkit';

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: {}
    },
    reducers: {
        addCard: (state, action) => {
            const { id } = action.payload;
            state.cards[id] = action.payload;
        }
    }
});

export const cardsSelector = state => state.cards.cards;

export const { addCard } = cardsSlice.actions;

export default cardsSlice.reducer;