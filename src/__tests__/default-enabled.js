import React from "react";
import { mount } from "enzyme";
import createWrapperProxy from "../";
import { createLinkedList } from "react-cosmos-shared";

const WrapperComponent = ({ children }) => <div>{children}</div>;
const Component = () => <span>__COMPONENT_MOCK__</span>;

const renderProxy = proxyOptions => fixtureOptions => {
  const NextProxy = props => {
    const { value: P, next } = props.nextProxy;

    return <P {...props} nextProxy={next()} />;
  };

  const LastProxy = ({ fixture: { component: C, props } }) => <C {...props} />;

  const WrapperProxy = createWrapperProxy({
    component: WrapperComponent,
    ...proxyOptions
  })

  return mount(
    <WrapperProxy
      nextProxy={createLinkedList([ NextProxy, LastProxy ])}
      fixture={fixtureOptions}
      onComponentRef={jest.fn()}
      onFixtureUpdate={jest.fn()}
    />
  );
};

describe("defaultEnabled", () => {
  it("Should wrap a component when `defaultEnabled` is true", () => {
    const proxyOptions = { fixtureKey: "wrapper", defaultEnabled: true };

    const fixtureOptions = { component: Component };

    const wrapper = renderProxy(proxyOptions)(fixtureOptions);

    expect(wrapper.find(WrapperComponent)).toHaveLength(1);
  });

  it("Should not wrap a component when `defaultEnabled` is falsey", () => {
    expect(
      renderProxy({ fixtureKey: "wrapper" })({ component: Component }).find(WrapperComponent)
    ).toHaveLength(0);

    expect(
      renderProxy({ fixtureKey: "wrapper", defaultEnabled: null })({ component: Component }).find(WrapperComponent)
    ).toHaveLength(0);

    expect(
      renderProxy({ fixtureKey: "wrapper", defaultEnabled: undefined })({ component: Component }).find(WrapperComponent)
    ).toHaveLength(0);
  });
});
