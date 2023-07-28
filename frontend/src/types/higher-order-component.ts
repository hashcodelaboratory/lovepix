import React, { PropsWithChildren, ReactElement } from 'react';

export type HigherOrderComponent = <
  WrappedComponentProps extends {},
  OutputElementType extends {}
>(
  WrappedComponent: React.ComponentType<
    PropsWithChildren<WrappedComponentProps>
  >,
) => (props: WrappedComponentProps) => ReactElement<OutputElementType> | null;