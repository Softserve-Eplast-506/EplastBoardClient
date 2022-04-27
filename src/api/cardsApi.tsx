import CardM from '../models/Card'
import api from './api'

export const getAllCards = async () => {
    return await api.get(`Card`).catch((error) => {
        throw new Error(error);
    });
};

export const getAllCardsByColumn = async (columnId: number) => {
    return await api.get(`Card/${columnId}`).catch((error) => {
        throw new Error(error);
    });
};

export const getCardById = async (id: number) => {
    return await api.get(`GetCard/${id}`).catch((error) => {
        throw new Error(error);
    });
};
export const getCardsByColumn = async (id: number) => {
    return await api.get(`GetCardsByColumn/${id}`).catch((error) => {
        throw new Error(error);
    });
};

export const AddCard = async (Card: CardM) => {
    console.log(Card);
    return await api.post(`Card/AddCard`, Card).catch((error) => {
      throw new Error(error);
    });
};