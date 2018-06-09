import React from "react";

export default ({ component: Component, props, fixtureKey, hoc }) =>
  function WrapperProxy({
    nextProxy: { value: NextProxy, next },
    ...nextProps
  }) {
    const fixtureProps = nextProps.fixture[fixtureKey];
    const fixtureEnabled = !!fixtureProps;
    const NextComponent =
      fixtureEnabled && hoc
        ? fixtureProps[Symbol.iterator]
          ? Component(...fixtureProps)(NextProxy)
          : Component(NextProxy)
        : NextProxy;
    const nextProxyEl = <NextComponent {...nextProps} nextProxy={next()} />;

    return fixtureEnabled && !hoc ? (
      <Component {...props} {...fixtureProps}>
        {nextProxyEl}
      </Component>
    ) : (
      nextProxyEl
    );
  };
