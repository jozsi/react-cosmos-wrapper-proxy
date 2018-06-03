import React from "react";

export default ({ component: Component, props, fixtureKey }) =>
  function WrapperProxy({
    nextProxy: { value: NextProxy, next },
    ...nextProps
  }) {
    const nextProxyEl = <NextProxy {...nextProps} nextProxy={next()} />;
    const fixtureProps = nextProps.fixture[fixtureKey];
    const fixtureEnabled = !!fixtureProps;

    return fixtureEnabled ? (
      <Component {...props} {...fixtureProps}>
        {nextProxyEl}
      </Component>
    ) : (
      nextProxyEl
    );
  };
