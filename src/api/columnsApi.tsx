import Column from '../models/Column'
import api from './api'

export const getAllColumnsByBoard = async (boardId: number) => {
    return await api.get(`Columns/${boardId}`).catch((error) => {
        throw new Error(error);
    });
};

export const getColumnById = async (id: number) => {
    return await api.get(`GetColumn/${id}`).catch((error) => {
        throw new Error(error);
    });
};

export const editColumnName = async (Column: Column) => {
    return await api.put(`EditColumnName/${Column}`).catch((error) => {
      throw new Error(error);
    });
};