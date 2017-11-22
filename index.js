import React from 'react';

export default ({
  component: Component,
  props,
  fixtureKey,
}) => ({
  nextProxy: {
    value: NextProxy,
    next,
  },
  ...nextProps,
}) => {
  const nextProxyEl = <NextProxy {...nextProps} nextProxy={next()} />;

  return nextProps.fixture[fixtureKey] ? (
    <Component {...props}>
      {nextProxyEl}
    </Component>
  ) : nextProxyEl;
};
