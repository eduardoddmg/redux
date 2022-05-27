import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        total: 0,
        totalPrice: 0,
        showCart: false
    },
    reducers: {
        adicionar(state, action) {
            console.log(action.payload)
            const newItem = action.payload;
            const existItem = state.itemsList.find(item => item.id === newItem.id);

            if (existItem) 
            {
                console.log('cheguei no if');
                existItem.quantidade++;
                existItem.totalPrice += newItem.price;
            }
            else
            {
                console.log('cheguei no else');
                state.itemsList.push({
                    nome: newItem.nome, 
                    id: newItem.id,
                    quantidade: 1,
                    price: newItem.price,
                    totalPrice: newItem.price
                })
            }
            state.totalPrice += newItem.price;
            state.total++;
            console.log(state);
            sort(state.itemsList)
        },
        apagar(state, action)
        {
            console.log('cheguei aqui 1');
            const itemDelete = action.payload;
            const itemDeleteList = state.itemsList.find(item => item.id === itemDelete.id);
            console.log(itemDeleteList);
            if (itemDeleteList.quantidade === 1) 
            {
                state.itemsList = state.itemsList.filter(value => value.id !== itemDelete.id)
                console.log('cheguei aqui 2');
            }
            else itemDeleteList.quantidade--;
            if (state.total > 0)
            {
                state.total--;
                state.totalPrice -= itemDeleteList.price;
            }
            sort(state.itemsList)
        },
        apagarTudo(state, action)
        {
            const itemDelete = action.payload;
            const itemDeleteList = state.itemsList.find(item => item.id === itemDelete.id)
            state.itemsList = state.itemsList.filter(value => value.id !== itemDelete.id);
            state.total -= itemDeleteList.quantidade;
            state.totalPrice -= itemDeleteList.quantidade*itemDeleteList.price;
            sort(state.itemsList)
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;

const sort = (array) =>
{
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++)
        {   
            let aux;
            if (array[i].id < array[j].id)
            {
                aux = array[i];
                array[i] = array[j];
                array[j] = aux
            }
        }
    }
}