import React from "react";
import ReactDOM from 'react-dom';
import { Button } from "../Button";
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders button without crash', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <div>
            <Button 
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--xlarge">Design New RNA Scaffold</Button>
        </div>
    , div);
});

it('renders button with correct text', () => {
  const {getByText} = render(
    <Button type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--xlarge"
            data-test-id="new-design"
            >Design New RNA Scaffold</Button>
  );
  expect(getByText('Design New RNA Scaffold')).toHaveTextContent('Design New RNA Scaffold');
})