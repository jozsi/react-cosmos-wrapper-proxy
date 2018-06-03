import React from "react";
import { mount } from "enzyme";
import { createLinkedList } from "react-cosmos-shared";
import createWrapperProxy from "../";

const Component = () => <span>__COMPONENT_MOCK__</span>;

const NextProxy = props => {
  const { value: P, next } = props.nextProxy;

  return <P {...props} nextProxy={next()} />;
};

const LastProxy = ({ fixture: { component: C, props } }) => <C {...props} />;

const WrapperComponent = ({ children }) => <div>{children}</div>;

const onComponentRef = jest.fn();
const onFixtureUpdate = jest.fn();

let wrapper;

const renderProxy = (fixture, options) => {
  const WrapperProxy = createWrapperProxy({
    component: WrapperComponent,
    fixtureKey: "wrapMe",
    ...options
  });

  wrapper = mount(
    <WrapperProxy
      nextProxy={createLinkedList([NextProxy, LastProxy])}
      fixture={{
        component: Component,
        foo: "bar",
        ...fixture
      }}
      onComponentRef={onComponentRef}
      onFixtureUpdate={onFixtureUpdate}
    />
  );
};

const getNextProxy = () => wrapper.find(NextProxy);
const getNextProxyProps = () => wrapper.find(NextProxy).props();

const commonTests = fixture => {
  it("renders next proxy", () => {
    expect(getNextProxy()).toHaveLength(1);
  });

  it("sends fixture to next proxy", () => {
    expect(getNextProxyProps().fixture).toEqual({
      component: Component,
      foo: "bar",
      ...fixture
    });
  });

  it("passes 2nd next proxy to next proxy", () => {
    expect(getNextProxyProps().nextProxy.value).toBe(LastProxy);
  });

  it("bubbles up fixture updates", () => {
    getNextProxyProps().onFixtureUpdate({});
    expect(onFixtureUpdate.mock.calls).toHaveLength(1);
  });
};

describe("not wrapped", () => {
  const fixture = {};
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture);
  });

  commonTests(fixture);

  it("should not render the Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent)).toHaveLength(0);
  });
});

describe("wrapped", () => {
  const fixture = {
    wrapMe: true
  };
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture);
  });

  commonTests(fixture);

  it("renders the Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent)).toHaveLength(1);
  });
});

describe("wrapped with fixture props", () => {
  const fixture = {
    wrapMe: {
      hello: "world"
    }
  };
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture);
  });

  commonTests(fixture);

  it("renders the Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent)).toHaveLength(1);
  });

  it("passes fixture props to Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent).props().hello).toEqual("world");
  });
});

describe("wrapped with proxy props", () => {
  const fixture = {
    wrapMe: true
  };
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture, {
      props: {
        hi: "there"
      }
    });
  });

  commonTests(fixture);

  it("renders the Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent)).toHaveLength(1);
  });

  it("passes proxy props to Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent).props().hi).toEqual("there");
  });
});

describe("wrapped with fixture and proxy props", () => {
  const fixture = {
    wrapMe: {
      hello: "world"
    }
  };
  beforeAll(() => {
    jest.clearAllMocks();
    renderProxy(fixture, {
      props: {
        hi: "there"
      }
    });
  });

  commonTests(fixture);

  it("renders the Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent)).toHaveLength(1);
  });

  it("passes fixture props to Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent).props().hello).toEqual("world");
  });

  it("passes proxy props to Wrapper Component", () => {
    expect(wrapper.find(WrapperComponent).props().hi).toEqual("there");
  });
});
