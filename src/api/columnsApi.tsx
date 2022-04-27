import Column from '../models/Column'
import api from './api'

const getAllColumnsByBoard = async (boardId: number) => {
    return await api.get(`Columns/${boardId}`).catch((error) => {
        throw new Error(error);
    });
};

const getColumnById = async (id: number) => {
    return (await api.get(`Columns/GetColumn/${id}`).catch((error) => {
        throw new Error(error);
    })).data
};

const editColumnName = async (Column: Column) => {
    return await api.put(`EditColumnName/${Column}`).catch((error) => {
      throw new Error(error);
    });
};

const addColumn = async (Column: Column) => {
    return await api.post(`Columns/AddColumn/${Column.id}`, Column).catch((error) => {
      throw new Error(error);
    });
};

const deleteColumnById = async (id: number) => {
    return await api.remove(`Columns/${id}`).catch((error) => {
        throw new Error(error);
    });
};

export default {addColumn, getColumnById}