import React from 'react';
import { mount } from 'enzyme';
import createLinkedList from '@skidding/linked-list';
import createWrapperProxy from '../';

const Component = () => <span>__COMPONENT_MOCK__</span>;

const NextProxy = props => {
  const { value: P, next } = props.nextProxy;

  return <P {...props} nextProxy={next()} />;
};

const LastProxy = ({ fixture: { component: C, props } }) => <C {...props} />;

const HOComponent = WrappedComponent =>
  function WrapperComponent(props) {
    return <WrappedComponent fromHoc {...props} />;
  };

const DoubleHOComponent = (a, b) => WrappedComponentTwo =>
  function WrapperComponentTwo(props) {
    return (
      <WrappedComponentTwo
        fromHocTwo
        firstPassedProp={a}
        secondPassedProp={b}
        {...props}
      />
    );
  };

const onComponentRef = jest.fn();
const onFixtureUpdate = jest.fn();

let wrapper;

const renderProxy = (fixture, options) => {
  const WrapperProxy = createWrapperProxy({
    component: HOComponent,
    hoc: true,
    fixtureKey: 'wrapMe',
    ...options,
  });

  wrapper = mount(
    <WrapperProxy
      nextProxy={createLinkedList([NextProxy, LastProxy])}
      fixture={{
        component: Component,
        foo: 'bar',
        ...fixture,
      }}
      onComponentRef={onComponentRef}
      onFixtureUpdate={onFixtureUpdate}
    />,
  );
};

const getNextProxy = () => wrapper.find(NextProxy);
const getNextProxyProps = () => wrapper.find(NextProxy).props();

const commonTests = fixture => {
  it('renders next proxy', () => {
    expect(getNextProxy()).toHaveLength(1);
  });

  it('sends fixture to next proxy', () => {
    expect(getNextProxyProps().fixture).toEqual({
      component: Component,
      foo: 'bar',
      ...fixture,
    });
  });

  it('passes 2nd next proxy to next proxy', () => {
    expect(getNextProxyProps().nextProxy.value).toBe(LastProxy);
  });

  it('bubbles up fixture updates', () => {
    getNextProxyProps().onFixtureUpdate({});
    expect(onFixtureUpdate.mock.calls).toHaveLength(1);
  });
};

describe('not wrapped', () => {
  const fixture = {};
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture);
  });

  commonTests(fixture);

  it('should not wrap', () => {
    expect(wrapper.find('WrapperComponent')).toHaveLength(0);
  });
});

describe('wrapped', () => {
  const fixture = {
    wrapMe: true,
  };
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture);
  });

  fixture.props = {
    fromHoc: true,
  };
  commonTests(fixture);

  it('should wrap', () => {
    expect(wrapper.find('WrapperComponent')).toHaveLength(1);
  });

  it('should pass props from HOC', () => {
    expect(wrapper.find(Component).props().fromHoc).toEqual(true);
  });
});

describe('wrapped with parameters', () => {
  const fixture = {
    wrapMe: ['hello', 'world'],
  };
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture, {
      component: DoubleHOComponent,
    });
  });

  fixture.props = {
    fromHocTwo: true,
    firstPassedProp: 'hello',
    secondPassedProp: 'world',
  };
  commonTests(fixture);

  it('should wrap', () => {
    expect(wrapper.find('WrapperComponentTwo')).toHaveLength(1);
  });

  it('should pass props from HOC', () => {
    expect(wrapper.find(Component).props().fromHocTwo).toEqual(true);
    expect(wrapper.find(Component).props().firstPassedProp).toEqual('hello');
    expect(wrapper.find(Component).props().secondPassedProp).toEqual('world');
  });
});
