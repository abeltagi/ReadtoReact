import React from 'react';
import renderer from 'react-test-renderer';

import App, { Item, List, SearchForm, InputWithLabel } from './App';

import axios from 'axios';

describe('Item', () => {
  const handleRemoveItem = jest.fn();
  const item = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  };

  let component;
  beforeEach(() => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    );
  });

  it('renders all properties', async () => {
    component = renderer.create(<Item item={item} />);
    const itemLink = await component.root.findByType('a');
    const children = await component.root.findByProps({
      children: 'Jordan Walke'
    });

    expect(itemLink.props.href).toEqual('https://reactjs.org/');
    //best to not use [1] position as they may changes rather use this:
    expect(children.length).toEqual('Jordan Walke');
  });

  it('calls onRemoveItem on button click', async () => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    );
    const button = await component.root.findByType('button');
    button.props.onClick();

    const itemType = await component.root.findAllByType(Item);

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);

    expect(itemType.length).toEqual(1);
  });

  test('renders snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('List', () => {
  const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ];

  it('renders two items', async () => {
    const component = renderer.create(<List list={list} />);

    const twoItems = await component.root.findAllByType(Item);

    expect(twoItems.length).toEqual(2);
  });
});

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn()
  };

  let component;

  beforeEach(() => {
    component = renderer.create(<SearchForm {...searchFormProps} />);
  });

  it('renders the input field with its value', async () => {
    const value = await component.root.findByType(InputWithLabel);

    expect(value.props.value).toEqual('React');
  });
  it('changes the input field', async () => {
    const pseudoEvent = { target: 'Redux' };

    const input = await component.root.findByType('input');

    input.props.onChange(pseudoEvent);

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(pseudoEvent);
  });

  it('submits the form', async () => {
    const pseudoEvent = {};

    const form = await component.root.findByType('form');
    form.props.onSubmit(pseudoEvent);

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledWith(pseudoEvent);
  });

  it('disables the button and prevents submit', async () => {
    component.update(<SearchForm {...searchFormProps} searchTerm='' />);

    const button = await component.root.findByType('button');
    expect(button.props.disabled).toBeTruthy();
  });
});

describe('App', () => {
  it('succeeds fetching data with a list', async () => {
    const list = [
      {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0
      },
      {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1
      }
    ];

    const promise = Promise.resolve({
      data: {
        hits: list
      }
    });

    axios.get.mockImplementationOnce(() => promise);

    let component;

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    const listType = await component.root.findByType(List);

    expect(listType.props.list).toEqual(list);
  });

  it('fails fetching data with a list', async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    let component;

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    const p = await component.root.findByType('p');

    expect(p.props.children).toEqual('Something went wrong ...');
  });
});
