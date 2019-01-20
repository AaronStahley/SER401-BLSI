/**
 * Mob-X/React-Native testing
 * https: //semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {QuestionStore} from "../QuestionStore";
import {RootStore} from "../RootStore";


//Don't use the => function, since we need this
describe("QuestionStore", () => {
    it('runs correctly', () => {
        //const root = new RootStore('database.test.db');
        //const store = new QuestionStore(root, root.transporter);
        //store.findStateQuestion(0);
        expect();   //TODO
    });
});

