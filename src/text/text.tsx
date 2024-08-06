import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import React, {
  forwardRef,
  ReactNode,
  RefAttributes,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Object3D } from "three";
import {
  FontFamilies,
  initialize,
  Subscriptions,
  TextProperties as BaseTextProperties,
  unsubscribeSubscriptions,
} from "@pmndrs/uikit/internals";
import { Signal, signal } from "@preact/signals-core";
import { ComponentInternals } from "@react-three/uikit";
import { useParent } from "@react-three/uikit/dist/context";
import {
  AddHandlers,
  usePropertySignals,
} from "@react-three/uikit/dist/utilts";
import { useFontFamilies } from "@react-three/uikit/dist/font";
import { useComponentInternals } from "@react-three/uikit/dist/ref";
import { createText } from "./createText.ts";

export type TextProperties = {
  children: string | Array<string | Signal<string>> | Signal<string>;
  name?: string;
} & BaseTextProperties &
  EventHandlers;

export const Text: (
  props: TextProperties &
    RefAttributes<
      ComponentInternals<Partial<BaseTextProperties & EventHandlers>>
    >,
) => ReactNode = forwardRef((properties, ref) => {
  const parent = useParent();
  const outerRef = useRef<Object3D>(null);
  const propertySignals = usePropertySignals(properties);
  const textSignal = useMemo(
    () =>
      signal<string | Array<string | Signal<string>> | Signal<string>>(
        undefined as any,
      ),
    [],
  );
  textSignal.value = properties.children;
  const fontFamilies = useMemo(
    () => signal<FontFamilies | undefined>(undefined as any),
    [],
  );
  fontFamilies.value = useFontFamilies();
  const internals = useMemo(
    () =>
      createText(
        parent,
        textSignal,
        fontFamilies,
        propertySignals.style,
        propertySignals.properties,
        propertySignals.default,
        outerRef,
      ),
    [fontFamilies, parent, propertySignals, textSignal],
  );

  internals.interactionPanel.name = properties.name ?? "";

  useEffect(() => {
    const subscriptions: Subscriptions = [];
    initialize(internals.initializers, subscriptions);
    return () => unsubscribeSubscriptions(subscriptions);
  }, [internals]);

  useComponentInternals(
    ref,
    parent.root.pixelSize,
    propertySignals.style,
    internals,
    internals.interactionPanel,
  );

  return (
    <AddHandlers
      allowSkippingChildren
      properties={properties}
      handlers={internals.handlers}
      ref={outerRef}
    >
      <primitive object={internals.interactionPanel} />
    </AddHandlers>
  );
});
