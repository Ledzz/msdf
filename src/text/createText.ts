import { effect, Signal, signal } from "@preact/signals-core";

import {
  applyTransform,
  computedGlobalMatrix,
  computedHandlers,
  computedIsClipped,
  computedIsVisible,
  computedMergedProperties,
  computedOrderInfo,
  computedPanelGroupDependencies,
  computedTransformMatrix,
  createActivePropertyTransfomers,
  createFlexNodeState,
  createHoverPropertyTransformers,
  createInstancedPanel,
  createInteractionPanel,
  createNode,
  createResponsivePropertyTransformers,
  darkPropertyTransformers,
  ElementType,
  FlexNode,
  getDefaultPanelMaterialConfig,
  Initializers,
  InstancedTextProperties,
  Object3DRef,
  PanelGroupProperties,
  PanelProperties,
  ParentContext,
  ScrollbarProperties,
  setupClippedListeners,
  setupCursorCleanup,
  setupLayoutListeners,
  TransformProperties,
  VisibilityProperties,
  WithAllAliases,
  WithClasses,
  WithConditionals,
  WithReactive,
  YogaProperties,
  ZIndexProperties,
} from "@pmndrs/uikit";
import { AllOptionalProperties, Listeners } from "@react-three/uikit";
import { FontFamilies } from "@pmndrs/uikit/internals";
import { createInstancedText } from "./instanced-text.ts";
import { computedFonts } from "./font.ts";
import { computedGlyphGroupDependencies } from "./instanced-glyph.ts";

export type InheritableTextProperties = WithClasses<
  WithConditionals<
    WithAllAliases<
      WithReactive<
        YogaProperties &
          PanelProperties &
          ZIndexProperties &
          TransformProperties &
          ScrollbarProperties &
          PanelGroupProperties &
          InstancedTextProperties &
          VisibilityProperties
      >
    >
  >
>;

export type TextProperties = InheritableTextProperties & Listeners;

export function createText(
  parentContext: ParentContext,
  textSignal: Signal<string | Signal<string> | Array<string | Signal<string>>>,
  fontFamilies: Signal<FontFamilies | undefined> | undefined,
  style: Signal<TextProperties | undefined>,
  properties: Signal<TextProperties | undefined>,
  defaultProperties: Signal<AllOptionalProperties | undefined>,
  object: Object3DRef,
) {
  const hoveredSignal = signal<Array<number>>([]);
  const activeSignal = signal<Array<number>>([]);
  const initializers: Initializers = [];
  setupCursorCleanup(hoveredSignal, initializers);

  const mergedProperties = computedMergedProperties(
    style,
    properties,
    defaultProperties,
    {
      ...darkPropertyTransformers,
      ...createResponsivePropertyTransformers(parentContext.root.size),
      ...createHoverPropertyTransformers(hoveredSignal),
      ...createActivePropertyTransfomers(activeSignal),
    },
  );

  const nodeSignal = signal<FlexNode | undefined>(undefined);
  const flexState = createFlexNodeState();
  createNode(
    nodeSignal,
    flexState,
    parentContext,
    mergedProperties,
    object,
    false,
    initializers,
  );

  const transformMatrix = computedTransformMatrix(
    mergedProperties,
    flexState,
    parentContext.root.pixelSize,
  );
  applyTransform(parentContext.root, object, transformMatrix, initializers);

  const globalMatrix = computedGlobalMatrix(
    parentContext.childrenMatrix,
    transformMatrix,
  );

  const isClipped = computedIsClipped(
    parentContext.clippingRect,
    globalMatrix,
    flexState.size,
    parentContext.root.pixelSize,
  );
  const isVisible = computedIsVisible(flexState, isClipped, mergedProperties);

  const groupDeps = computedPanelGroupDependencies(mergedProperties);
  const backgroundOrderInfo = computedOrderInfo(
    mergedProperties,
    ElementType.Panel,
    groupDeps,
    parentContext.orderInfo,
  );
  initializers.push((subscriptions) =>
    createInstancedPanel(
      mergedProperties,
      backgroundOrderInfo,
      groupDeps,
      parentContext.root.panelGroupManager,
      globalMatrix,
      flexState.size,
      undefined,
      flexState.borderInset,
      parentContext.clippingRect,
      isVisible,
      getDefaultPanelMaterialConfig(),
      subscriptions,
    ),
  );

  const fontsSignal = computedFonts(
    textSignal,
    mergedProperties,
    fontFamilies,
    initializers,
  );
  const orderInfo = computedOrderInfo(
    undefined,
    ElementType.Text,
    computedGlyphGroupDependencies(fontsSignal),
    backgroundOrderInfo,
  );

  const customLayouting = createInstancedText(
    mergedProperties,
    textSignal,
    globalMatrix,
    nodeSignal,
    flexState,
    isVisible,
    parentContext.clippingRect,
    orderInfo,
    fontsSignal,
    parentContext.root.gylphGroupManager,
    undefined,
    undefined,
    undefined,
    undefined,
    initializers,
    "break-word",
  );
  initializers.push(() =>
    effect(() => nodeSignal.value?.setCustomLayouting(customLayouting.value)),
  );

  setupLayoutListeners(style, properties, flexState.size, initializers);
  setupClippedListeners(style, properties, isClipped, initializers);

  return Object.assign(flexState, {
    isClipped,
    mergedProperties,
    interactionPanel: createInteractionPanel(
      backgroundOrderInfo,
      parentContext.root,
      parentContext.clippingRect,
      flexState.size,
      initializers,
    ),
    handlers: computedHandlers(
      style,
      properties,
      defaultProperties,
      hoveredSignal,
      activeSignal,
    ),
    initializers,
  });
}
