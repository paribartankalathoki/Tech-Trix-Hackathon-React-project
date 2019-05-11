'use strict';

const saveDocument = newModelData => {
  return newModelData.save();
};

const getAllWithDocumentFieldsNoPagination = (Model, queryOpts, documentFields, sortOpts) => {
  return Model.find(queryOpts)
    .select(documentFields)
    .sort(sortOpts);
};

const getAllWithoutDocumentFieldsNoPagination = (Model, queryOpts, sortOpts) => {
  return Model.find(queryOpts).sort(sortOpts);
};

const findById = (Model, queryOpts, documentFields) => {
  return Model.findById(queryOpts).select(documentFields);
};

const findOne = (Model, queryOpts, documentFields) => {
  return Model.findOne(queryOpts).select(documentFields);
};

const updateDocument = (Model, queryOpts, data) => {
  return Model.updateOne(queryOpts, data);
};

const getAllWithoutFieldsPopulationNoPagination = (Model, queryOpts, populationPath, populationFields) => {
  return Model.find(queryOpts).populate(populationPath, populationFields);
};

const getByIdFieldsPopulationNoPagination = (Model, queryOpts, populationPath, populationFields) => {
  return Model.findOne(queryOpts).populate(populationPath, populationFields);
};

const saveToEmbeddedDocument = (Model, queryOpts, data) => {
  return Model.findOneAndUpdate(queryOpts, { $set: data });
};

module.exports = {
  saveDocument,
  getAllWithDocumentFieldsNoPagination,
  getAllWithoutDocumentFieldsNoPagination,
  findById,
  findOne,
  updateDocument,
  getAllWithoutFieldsPopulationNoPagination,
  getByIdFieldsPopulationNoPagination,
  saveToEmbeddedDocument
};
