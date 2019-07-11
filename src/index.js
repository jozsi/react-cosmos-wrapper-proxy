import React from 'react';

const HOCPropsProxy = props => {
  const {
    nextProxy,
    fixture,
    onComponentRef,
    onFixtureUpdate,
    ...rest
  } = props;
  const { value: NextProxy, next } = nextProxy;
  fixture.props = {
    ...rest,
    ...fixture.props,
  };

  return (
    <NextProxy
      fixture={fixture}
      onComponentRef={onComponentRef}
      onFixtureUpdate={onFixtureUpdate}
      nextProxy={next()}
    />
  );
};

export default ({
  component: Component,
  props,
  fixtureKey,
  hoc,
  defaultEnabled,
}) =>
  function WrapperProxy({ nextProxy, ...nextProps }) {
    const fixtureProps = nextProps.fixture[fixtureKey];
    const fixtureEnabled =
      fixtureProps !== undefined ? fixtureProps : defaultEnabled;

    if (fixtureEnabled && hoc) {
      const HOComponent = fixtureProps[Symbol.iterator]
        ? Component(...fixtureProps)(HOCPropsProxy)
        : Component(HOCPropsProxy);

      return <HOComponent {...nextProps} nextProxy={nextProxy} />;
    }

    const { value: NextProxy, next } = nextProxy;
    const nextProxyEl = <NextProxy {...nextProps} nextProxy={next()} />;

    return fixtureEnabled ? (
      <Component {...props} {...fixtureProps}>
        {nextProxyEl}
      </Component>
    ) : (
      nextProxyEl
    );
  };
