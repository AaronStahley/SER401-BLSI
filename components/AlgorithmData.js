import React from 'react';

var algData = require('../data/algorithms.json');

export const getName=(i) => {
    return algData[i].name;
}
export const getShortDesc=(i) => {
    return algData[i].shortDesc
}
export const getDescription=(i) => {
    return algData[i].description
}

export default class AlgDescription extends React.Component {
    constructor(props) {
        super(props);
    }
}
