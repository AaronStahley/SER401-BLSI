import 'react-native';
import {shallow} from 'enzyme';
import React from 'react';
import StateContainer from '../../state/StateContainer';
import RootStore from "../../../store/root/RootStore";
import renderer from 'react-test-renderer';
import {Provider} from "mobx-react/native";

//https://github.com/mobxjs/mobx-react/issues/186
jest.mock('mobx-react/native', () => require('mobx-react/custom'));

//Don't use the => function, since we need this
describe("RootStore", function() {
    const root = new RootStore('database.test.db');
    it('renders correctly', () => {
        //const tree = renderer
            //.create(<Provider rootStore={root}>
                        //<StateContainer state={{Recommendations: [{"key": 0, "index": 1}]}}></StateContainer>
                    //</Provider>)
            //.toJSON();
        //expect(tree).toMatchSnapshot(); //TODO 
    });
});


