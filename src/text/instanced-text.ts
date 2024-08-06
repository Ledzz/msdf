import { computed, effect, signal, Signal } from "@preact/signals-core";
import { Matrix4, Vector2Tuple, Vector3Tuple } from "three";
import {
  alignmentXMap,
  alignmentYMap,
  buildGlyphLayout,
  ClippingRect,
  computedCustomLayouting,
  computedInheritableProperty,
  FlexNode,
  FlexNodeState,
  GlyphGroupManager,
  GlyphLayout,
  GlyphLayoutProperties,
  Initializers,
  InstancedText,
  MergedProperties,
  OrderInfo,
  SelectionBoxes,
} from "@pmndrs/uikit";
import { Font } from "@pmndrs/uikit/internals";

const defaultVerticalAlign: keyof typeof alignmentYMap = "middle";
const defaulttextAlign: keyof typeof alignmentXMap | "block" = "left";
export function createInstancedText(
  properties: Signal<MergedProperties>,
  textSignal: Signal<string | Signal<string> | Array<string | Signal<string>>>,
  matrix: Signal<Matrix4 | undefined>,
  nodeSignal: Signal<FlexNode | undefined>,
  flexState: FlexNodeState,
  isVisible: Signal<boolean>,
  parentClippingRect: Signal<ClippingRect | undefined> | undefined,
  orderInfo: Signal<OrderInfo | undefined>,
  fontsSignal: Signal<Font[] | undefined>,
  glyphGroupManager: GlyphGroupManager,
  selectionRange: Signal<Vector2Tuple | undefined> | undefined,
  selectionBoxes: Signal<SelectionBoxes> | undefined,
  caretPosition: Signal<Vector3Tuple | undefined> | undefined,
  instancedTextRef: { current?: InstancedText } | undefined,
  initializers: Initializers,
  defaultWordBreak: GlyphLayoutProperties["wordBreak"],
) {
  let layoutPropertiesRef: { current: GlyphLayoutProperties | undefined } = {
    current: undefined,
  };

  const fontSignal = computed(() => fontsSignal.value?.[0]);

  const customLayouting = computedCustomLayouting(
    properties,
    fontSignal,
    textSignal,
    layoutPropertiesRef,
    defaultWordBreak,
  );
  const verticalAlign = computedInheritableProperty(
    properties,
    "verticalAlign",
    defaultVerticalAlign,
  );
  const textAlign = computedInheritableProperty(
    properties,
    "textAlign",
    defaulttextAlign,
  );
  const color = computedInheritableProperty(properties, "color", 0x0);
  const opacity = computedInheritableProperty(properties, "opacity", 1);

  const layoutSignal = signal<GlyphLayout | undefined>(undefined);
  initializers.push(
    () =>
      effect(() =>
        nodeSignal.value?.addLayoutChangeListener(() => {
          const layoutProperties = layoutPropertiesRef.current;
          const {
            size: { value: size },
            paddingInset: { value: paddingInset },
            borderInset: { value: borderInset },
          } = flexState;
          if (
            layoutProperties == null ||
            size == null ||
            paddingInset == null ||
            borderInset == null
          ) {
            return;
          }
          const [width, height] = size;
          const [pTop, pRight, pBottom, pLeft] = paddingInset;
          const [bTop, bRight, bBottom, bLeft] = borderInset;
          const actualWidth = width - pRight - pLeft - bRight - bLeft;
          const actualheight = height - pTop - pBottom - bTop - bBottom;
          layoutSignal.value = buildGlyphLayout(
            layoutProperties,
            actualWidth,
            actualheight,
          );
        }),
      ),
    () =>
      effect(() => {
        const font = fontSignal.value;
        if (font == null || orderInfo.value == null) {
          return;
        }
        const instancedText = new InstancedText(
          glyphGroupManager.getGroup(orderInfo.value.majorIndex, font),
          textAlign,
          verticalAlign,
          color,
          opacity,
          layoutSignal,
          matrix,
          isVisible,
          parentClippingRect,
          selectionRange,
          selectionBoxes,
          caretPosition,
        );
        if (instancedTextRef != null) {
          instancedTextRef.current = instancedText;
        }
        return () => instancedText.destroy();
      }),
  );

  return customLayouting;
}
