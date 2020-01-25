// creted by Recep Tiryaki

declare module "sketch" {
  const Sketch: {
    UI: UI;
    getSelectedDocument(): SelectedDocument | undefined;
  };
  export const UI: UI;
  export default Sketch;

  interface SelectedDocument extends Document {
    type: string;
  }

  // ------
  interface Document {
    /** The unique ID of the document. */
    id: string;

    /** The pages of the document. */
    pages: Page[];

    /** The selected page of the Document. */
    selectedPage: Page;

    /** The Selection of the layers that the user has selected in the currently selected page. */
    selectedLayers: Selection;

    /** The path to the document (or the appcast URL in case of a Document from a remote Library). */
    path: string;

    /** The list of all shared layer styles defined in the document. */
    sharedLayerStyles: SharedStyle[];

    /** The list of all shared text styles defined in the document. */
    sharedTextStyles: SharedStyle[];

    /** A list of color assets defined in the document. Mutating the returned array will update the document colors. */
    colors: ColorAsset[];

    /** A list of gradient assets defined in the document. Mutating the returned array will update the document gradients. */
    gradients: GradientAsset[];

    /** The color space of the document. */
    colorSpace: DocumentColorSpace;
  }

  interface Page {
    /** The unique ID of the Page. */
    id: string;

    /** The name of the Page */
    name: string;

    /** The document the page is in. */
    parent: Document;

    /** The layers that this page has. */
    layers: Layer;

    /** The frame of the page. */
    frame: Rectangle;

    /** If the Page is selected. */
    selected: boolean;
  }

  interface Layer {
    /** The unique ID of the Layer. */
    id: string;

    /** The name of the Layer */
    name: string;

    /** The group the layer is in. */
    parent: Group;

    /** If the layer is locked. */
    locked: boolean;

    /** If the layer is hidden. */
    hidden: boolean;

    /** The frame of the Layer. This is given in coordinates that are local to the parent of the layer. */
    frame: Rectangle;

    /** If the layer is selected. */
    selected: boolean;

    /** The prototyping action associated with the layer. */
    flow: Flow;

    /** The export formats of the Layer. */
    exportFormats: ExportFormat[];

    /** The transformation applied to the Layer. */
    transform: Transform;

    /** The ID of the SharedStyle or null */
    sharedStyleId: string;

    style: Style;
  }

  interface ExportFormat {
    /** The file format of the export. */
    fileFormat: string;

    /** The prefix added to the file name. */
    prefix?: string;

    /** The suffix added to the file name. */
    suffix?: string;

    /** The size of the export. Valid values include 2x, 100w, 100width, 100px, 300h, 300height. */
    size: string;
  }

  interface Flow {
    /** The target artboard of the action or Flow.BackTarget if the action is a back action */
    target: Artboard | FlowBackTarget;

    /** The ID of target artboard of the action or Flow.BackTarget if the action is a back action */
    targetId: string | FlowBackTarget;

    /** The type of the animation. */
    animationType: AnimationType;
  }

  enum AnimationType {
    /** No Animation */
    NONE = "none",

    /**	Slide from the left */
    SLIDE_FROM_LEFT = "slideFromLeft",

    /** 	Slide from the right */
    SLIDE_FROM_RIGHT = "slideFromRight",

    /** Slide from the bottom */
    SLIDE_FROM_BOTTOM = "slideFromBottom",

    /**	Slide from the top */
    SLIDE_FROM_TOP = "slideFromTop"
  }

  interface Artboard {
    /** The unique ID of the Artboard. */
    id: string;

    /** The name of the Artboard */
    name: string;

    /** The page the Artboard is in. */
    parent: Page;

    /** The frame of the Artboard. This is given in coordinates that are local to the parent of the layer. */
    frame: Rectangle;

    /** If the Artboard is selected. */
    selected: boolean;

    /** The layers that this component groups together. */
    layers: Layer[];

    /** A Start Point allows you to choose where to start your prototype from. */
    flowStartPoint: boolean;

    /** The export formats of the Artboard. */
    exportFormats: ExportFormat[];

    /** The background of the Artboard */
    background: Background;
  }

  interface Background {
    /** If the background should be enabled, eg. shown or not */
    enabled: boolean;

    /** If the background should be exported or if it should be transparent during the export */
    includedInExport: boolean;

    /** The rgba representation of the color of the background */
    color: string;
  }

  type FlowBackTarget = any; // TODO;

  interface Transform {
    /** The rotation of the Layer in degrees, clock-wise. */
    rotation: number;

    /** If the layer is horizontally flipped. */
    flippedHorizontally: boolean;

    /** If the layer is vertically flipped. */
    flippedVertically: boolean;
  }

  export interface Selection {
    /** The Layers in the selection. Setting this property will change the selection. */
    layers: SelectionLayers[];

    /** The number of Layers in the selection. */
    readonly length: number;

    /** Does the selection contain any layers? */
    readonly isEmpty: boolean;
  }

  export type SelectionLayers =
    | ArtboardSelection
    | GroupSelection
    | ShapePathSelection
    | ImageSelection
    | SymbolInstanceSelection;

  export interface SymbolInstanceSelection {
    type: "SymbolInstance";
    id: string;
    style: Style;
    sharedStyleId: string | null;
    frame: Rectangle;
    symbolId: string;
    transform: Transform;
    exportFormats: ExportFormat[];
    locked: boolean;
    hidden: boolean;
    overrides: Override[];
  }

  export interface ArtboardSelection {
    type: "Artboard";
    exportFormats: ExportFormat[];
    name: string;
    background: Background;
    selected: boolean;
    sharedStyleId: string | null;
    frame: Rectangle;
    id: string;
    flowStartPoint: boolean;
    layers: SelectionLayers[];
  }

  export interface GroupSelection {
    type: "Group";
    id: string;
    style: Style;
    smartLayout: SmartLayout | null;
    sharedStyleId: string | null;
    layers: SelectionLayers[];
    frame: Rectangle;
    transform: Transform;
    exportFormats: ExportFormat[];
    locked: boolean;
    hidden: boolean;
    selected: boolean;
    name: string;
  }

  export interface ShapePathSelection {
    type: "ShapePath";
    id: string;
    style: Style;
    sharedStyleId: string | null;
    points: CurvePoint[];
    frame: Rectangle;
    closed: boolean;
    shapeType: ShapeType;
    transform: Transform;
    exportFormats: ExportFormat[];
    locked: boolean;
    hidden: boolean;
    selected: boolean;
    name: string;
  }

  export interface ImageSelection {
    type: "Image";
    id: string;
    style: Style;
    sharedStyleId: string | null;
    frame: Rectangle;
    transform: Transform;
    image: ImageData;
    exportFormats: ExportFormat[];
    locked: boolean;
    hidden: boolean;
    selected: boolean;
    name: string;
  }

  export interface Override {
    /** The path to the override. It’s formed by the symbolId of the nested symbols separated by a /. */
    path: string;

    /** The property that this override controls. It can be "stringValue" for a text override, "symbolID" for a nested symbol, "layerStyle" for a shared layer style override, "textStyle" for a shared text style override, "flowDestination" for a Hotspot target override or "image" for an image override. */
    property:
      | "stringValue"
      | "symbolID"
      | "layerStyle"
      | "textStyle"
      | "flowDestination"
      | "image";

    /** The unique ID of the override (${path}_${property}). */
    id: string;

    /** If the override is a nested symbol override. */
    symbolOverride: boolean;

    /** The value of the override which can be change. */
    value: string | ImageData;

    /** If the override hasn’t been changed and is the default value. */
    isDefault: boolean;

    /** The layer the override applies to. It will be an immutable version of the layer. */
    affectedLayer: Text | Image | SymbolInstance;

    /** If the value of the override can be changed. */
    editable: boolean;

    /** If the override is selected (or undefined if it’s the override of a Symbol Master). */
    selected: boolean;
  }

  interface SymbolInstance {
    /** The unique ID of the Symbol Instance object (not to be confused with symbolId). */
    id: string;

    /** The name of the Symbol Instance */
    name: string;

    /** The group the Symbol Instance is in. */
    parent: Group;

    /** If the Symbol Instance is locked. */
    locked: boolean;

    /** If the Symbol Instance is hidden. */
    hidden: boolean;

    /** The frame of the Symbol Instance. This is given in coordinates that are local to the parent of the layer. */
    frame: Rectangle;

    /** The prototyping action associated with the Symbol. */
    flow: Flow;

    /** If the Symbol Instance is selected. */
    selected: boolean;

    /** The export formats of the Symbol Instance. */
    exportFormats: ExportFormat[];

    /** The transformation applied to the Symbol Instance. */
    transform: Transform;

    /** The style of the Symbol Instance. */
    style: Style;

    /** The unique ID of the Symbol that the instance and its master share. */
    symbolId: string;

    /** The Symbol master that the instance is linked to. */
    master: SymbolMaster;

    /** The array of the overrides to modify the instance. */
    overrides: Override[];
  }

  interface SymbolMaster {
    /** The unique ID of the Symbol Master object (not to be confused with symbolId). */
    id: string;

    /** The name of the Symbol Master */
    name: string;

    /** The group the Symbol Master is in. */
    parent: Group;

    /** The frame of the Symbol Master. This is given in coordinates that are local to the parent of the layer. */
    frame: Rectangle;

    /** If the Symbol Master is selected. */
    selected: boolean;

    /** The export formats of the Symbol Master. */
    exportFormats: ExportFormat[];

    /** The layers composing the Symbol Master. */
    layers: Layer[];

    /** The background of the Symbol Master */
    background: Background;

    /** The unique ID of the Symbol that the master and its instances share. */
    symbolId: string;

    /** The array of the overrides that the instances of the Symbol Master will be able to change. */
    overrides: Override[];
  }

  interface Image {
    /** The unique ID of the Image. */
    id: string;

    /** The name of the Image */
    name: string;

    /** The group the Image is in. */
    parent: Group;

    /** If the Image is locked. */
    locked: boolean;

    /** If the Image is hidden. */
    hidden: boolean;

    /** The frame of the Image. This is given in coordinates that are local to the parent of the layer. */
    frame: Rectangle;

    /** If the Image is selected. */
    selected: boolean;

    /** The prototyping action associated with the Image. */
    flow: Flow;

    /** The export formats of the Image. */
    exportFormats: ExportFormat[];

    /** The transformation applied to the Image. */
    transform: Transform;

    /** The style of the Image. */
    style: Style;

    /** The associated shared style or null. */
    sharedStyle: SharedStyle | null;

    /** The ID of the SharedStyle or null, identical to sharedStyle.id. */
    sharedStyleId: string | null;

    /** The actual image of the layer. */
    image: ImageData;
  }

  interface ImageData {
    nsdata: any;
    id: number;
    type: string;
    nsimage: any;
  }

  interface CurvePoint {
    point: Point;
    curveFrom: Point;
    curveTo: Point;
    cornerRadius: number;
    pointType: PointType;
  }

  enum ShapeType {
    RECTANGLE = "Rectangle",
    OVAL = "Oval",
    TRIANGLE = "Triangle",
    POLYGON = "Polygon",
    STAR = "Star",
    CUSTOM = "Custom"
  }

  enum PointType {
    UNDEFINED = "Undefined",
    STRAIGHT = "Straight",
    MIRRORED = "Mirrored",
    ASYMMETRIC = "Asymmetric",
    DISCONNECTED = "Disconnected"
  }

  export interface SharedStyle {
    /** The unique ID of the Shared Style. */
    id: string;

    /** The type of the Shared Style. */
    styleType: SharedStyleType;

    /** The name of the Shared Style. */
    name: string;

    /** The Style value that is shared. */
    style: Style;

    /** Returns an array of all layers with a Style which is an instance of the Shared Style in the document, on all pages. */
    getAllInstancesLayers(): Layer[];
  }

  export interface Style {
    /** The opacity of a Layer, between 0 (transparent) and 1 (opaque). */
    opacity: number;

    /** The blend mode used to determine the composite color. */
    blendingMode: BlendingMode;

    /** The blur applied to the Layer. */
    blur: Blur;

    /** The fills of a Layer. */
    fills: Fill[];

    /** The borders of a Layer. */
    borders: Border[];

    /** The options that the borders share. */
    borderOptions: BorderOptions;

    /** The shadows of a Layer. */
    shadows: Shadow[];

    /** The inner shadows of a Layer. */
    innerShadows: Shadow[];

    /** The horizontal alignment of the text of a Text Layer */
    alignment: Alignment;

    /** The vertical alignment of the text of a Text Layer */
    verticalAlignment: VerticalAlignment;

    /** The kerning between letters of a Text Layer. null means that the kerning will be the one defined by the font. */
    kerning: number | null;

    /** The height of a line of text in a Text Layer. null means “automatic”. */
    lineHeight: number | null;

    /** The space between 2 paragraphs of text in a Text Layer. */
    paragraphSpacing: number;

    /** A rgba hex-string (#000000ff is opaque black) of the color of the text in a Text Layer. */
    textColor: string;

    /** The size of the font in a Text Layer. */
    fontSize: number;

    /** The transform applied to the text of a Text Layer. */
    textTransform: StyleTextTransform;

    /** The name of the font family of a Text Layer. 'system' means the font family of the OS ('.SF NS Text' on macOS 10.14). */
    fontFamily: string;

    /** The weight of the font of a Text Layer. Goes from 0 to 12, 0 being the thinest and 12 being the boldest. Not every weight are available for every fonts. When setting a font weight that does not exist for the current font family, the closest weight that exists will be set instead. */
    fontWeight: number;

    /** The style of the font of a Text Layer. */
    fontStyle?: "italic";

    /** The variant of the font of a Text Layer. */
    fontVariant?: "small-caps";

    /** The size variant of the font of a Text Layer. */
    fontStretch?: StyleFontStretch;

    /** The underline decoration of a Text Layer. */
    textUnderline?: string; // TODO

    /** The strikethrough decoration of a Text Layer. */
    textStrikethrough?: string; // TODO

    /** The axes of the Text Layer font (only available when the font is a variable font). */
    fontAxes: FontAxes;
  }

  enum VerticalAlignment {
    /** 	Visually top aligned */
    TOP = "top",

    /** Visually vertically centered */
    CENTER = "center",

    /** Visually bottom aligned */
    BOTTOM = "bottom"
  }

  enum Alignment {
    /** Visually left aligned */
    LEFT = "left",

    /** Visually right aligned */
    RIGHT = "right",

    /** Visually centered */
    CENTER = "center",

    /** Fully-justified. The last line in a paragraph is natural-aligned. */
    JUSTIFY = "justify"
  }

  interface Shadow {
    /** A rgba hex-string (#000000ff is opaque black). */
    color: string;

    /** The blur radius of the shadow. */
    blur: number;

    /** The horizontal offset of the shadow. */
    x: number;

    /** The vertical offset of the shadow. */
    y: number;

    /** The spread of the shadow. */
    spread: number;

    /** Whether the fill is active or not. */
    enabled: number;
  }

  interface BorderOptions {
    /** The type of the arrow head for the start of the path. */
    startArrowhead: Arrowhead;

    /** The type of the arrow head for the start of the path. */
    endArrowhead: Arrowhead;

    /** The dash pattern of the borders. For example, a dash pattern of 4-2 will draw the stroke for four pixels, put a two pixel gap, draw four more pixels and then so on. A dashed pattern of 5-4-3-2 will draw a stroke of 5 px, a gap of 4 px, then a stroke of 3 px, a gap of 2 px, and then repeat. */
    dashPattern: number[];

    /** The type of the border ends (if visible). */
    lineEnd: LineEnd;

    /** The type of the border joins (if any). */
    lineJoin: LineJoin;
  }

  enum Arrowhead {
    NONE = "None",
    OPEN_ARROW = "OpenArrow",
    FILLED_ARROW = "FilledArrow",
    lINE = "Line",
    OPEN_CIRCLE = "OpenCircle",
    FILLED_CIRCLE = "FilledCircle",
    OPEN_SQUARE = "OpenSquare",
    FILLED_SQUARE = "FilledSquare"
  }

  enum LineEnd {
    /** This is the default option that’ll draw the border right to the vector point. */
    BUTT = "Butt",

    /** Creates a rounded, semi-circular end to a path that extends past the vector point. */
    ROUND = "Round",

    /** Similar to the rounded cap, but with a straight edges. */
    PROJECTING = "Projecting"
  }

  enum LineJoin {
    /** This will simply create an angled, or pointy join. The default setting. */
    MILTER = "Miter",

    /** Creates a rounded corner for the border. The radius is relative to the border thickness. */
    ROUND = "Round",

    /** This will create a chamfered edge on the border corner. */
    BEVEL = "Bevel"
  }

  interface Border {
    /** The type of the fill of the border. */
    fillType: FillType;

    /** A rgba hex-string (#000000ff is opaque black). */
    color: string;

    /** The gradient of the fill. */
    gradient: Gradient;

    /** Whether the border is active or not. */
    enabled: boolean;

    /** The position of the border. */
    position: BorderPosition;

    /** The thickness of the border. */
    thickness: number;
  }

  enum BorderPosition {
    CENTER = "Center",
    INSIDE = "Inside",
    OUTSIDE = "Outside"
  }

  interface Gradient {
    /** The type of the Gradient. */
    gradientType: GradientType;

    /** The position of the start of the Gradient */
    from: Point;

    /** The position of the end of the Gradient. */
    to: Point;

    /** When the gradient is Radial, the from and to points makes one axis of the ellipse of the gradient while the aspect ratio determine the length of the orthogonal axis (aspectRatio === 1 means that it’s a circle). */
    aspectRatio: number;

    /** The different stops of the Gradient */
    stops: GradientStop[];
  }

  interface GradientStop {
    position: number;
    color: string;
  }

  interface Point {
    x: number | Point;
    y: number;
  }

  enum GradientType {
    /** Linear gradients tend to be the most common, where two colors will appear at opposite points of an object and will blend, or transition into each other. */
    LINEAR = "Linear",

    /** A radial gradient will create an effect where the transition between color stops will be in a circular pattern. */
    RADIAL = "Radial",

    /** This effect allows you to create gradients that sweep around the circumference (measured by the maximum width or height of a layer) in a clockwise direction. */
    ANGULAR = "Angular"
  }

  enum FillType {
    COLOR = "Color",
    GRADIENT = "Gradient",
    PATTERN = "Pattern"
  }

  interface Fill {
    /** The type of the fill. */
    fillType: FillType;

    /** A rgba hex-string (#000000ff is opaque black). */
    color: string;

    /** The gradient of the fill. */
    gradient: Gradient;

    /** The pattern of the fill. */
    pattern: FillPattern;

    /** Whether the fill is active or not. */
    enabled: boolean;
  }

  interface FillPattern {
    /** How the pattern should fill the layer. */
    patternType: PatternFillType;

    /** The image of tile of the pattern. */
    image: ImageData | null;

    /** The scale applied to the tile of the pattern. */
    tileScale: number;
  }

  enum PatternFillType {
    TILE = "Tile",
    FILL = "Fill",
    STRETCH = "Stretch",
    FIT = "Fit"
  }

  interface Blur {
    /** The type of the blur. */
    blurType: BlurType;

    /** The radius of the blur. */
    radius: number;

    /** The angle of the blur (only used when the blur type is Motion). */
    motionAngle: number;

    /** The center of the blur (only used when the blur type is Zoom. */
    center: Center;
  }

  enum BlurType {
    /** A common blur type that will accurately blur in all directions. */
    GUASSIAN = "Gaussian",

    /** Blur only in one direction, giving the illusion of motion. */
    MOTION = "Motion",

    /** Will blur from one particular point out. */
    ZOOM = "Zoom",

    /** This will blur any content that appears behind the layer. */
    BACKGROUND = "Background"
  }

  interface Center {
    /** The horizontal coordinate of the center of the blur. */
    x: number;

    /** The vertical coordinate of the center of the blur. */
    y: number;

    /** Whether the fill is active or not. */
    enabled: number;
  }

  enum BlendingMode {
    NORMAL = "Normal",
    DARKEN = "Darken",
    MULTIPLY = "Multiply",
    COLOR_BURN = "ColorBurn",
    LIGHTEN = "Lighten",
    SCREEN = "Screen",
    COLOR_DODGE = "ColorDodge",
    OVERLAY = "Overlay",
    SOFT_LIGHT = "SoftLight",
    HARD_LIGHT = "HardLight",
    DIFFERENCE = "Difference",
    EXCLUSION = "Exclusion",
    HUE = "Hue",
    SATURATION = "Saturation",
    COLOR = "Color",
    LUMINOSITY = "Luminosity"
  }

  interface FontAxes {
    /** The axis id */
    id: string;

    /** The minimum value allowable on the axis */
    min: number;

    /** The maximum value allowable on the axis */
    max: number;

    /** The current axis value */
    value: number;
  }

  enum StyleFontStretch {
    COMPRESSED = "compressed",
    CONDENSED = "condensed",
    NARROW = "narrow",
    EXPANDED = "expanded",
    POSTER = "poster"
  }

  enum StyleTextTransform {
    NONE = "none",
    UPPERCASE = "uppercase",
    LOWERCASE = "lowercase"
  }

  enum SharedStyleType {
    VALUE = "Value",
    LAYER = "Layer",
    UNKNOWN = "Unknown"
  }

  interface ColorAsset {
    /** The name of the asset, or null. */
    name: string | null;

    /** The hex string for the color. */
    color: string;
  }

  interface GradientAsset {
    /** The name of the asset, or null. */
    name: string | null;

    /** The gradient object. */
    gradient: Gradient;
  }

  interface Rectangle {
    /** The x coordinate of the top-left corner of the rectangle. Or Rectangle */

    x: number | Rectangle;

    /** The y coordinate of the top-left corner of the rectangle. */
    y: number;

    /** The width of the rectangle. */
    width: number;

    /** The height of the rectangle. */
    height: number;
  }

  enum DocumentColorSpace {
    UNMANAGED = "Unmanaged",
    SRGB = "sRGB",
    P3 = "P3"
  }

  interface Group {
    /** The unique ID of the Group. */
    id: string;

    /** The name of the Group */
    name: string;

    /** The group the Group is in. */
    parent: Group;

    /** If the Group is locked. */
    locked: boolean;

    /** If the Group is hidden. */
    hidden: boolean;

    /** The frame of the Group. This is given in coordinates that are local to the parent of the Layer. */
    frame: Rectangle;

    /** If the Group is selected. */
    selected: boolean;

    /** The prototyping action associated with the Group. */
    flow: Flow;

    /** The export formats of the Group. */
    exportFormats: ExportFormat[];

    /** The transformation applied to the Group. */
    transrofm: Transform;

    /** The style of the Group. */
    style: Style;

    /** The ID of the SharedStyle this Group is linked to if any. */
    sharedStyleId: string | null;

    /** The Layers that this component groups together. */
    layers: Layer[];

    /** The Group’s Smart Layout. **/
    smartLayout: SmartLayout | null;
  }

  enum SmartLayout {
    /**	Smart Layout flowing left to right */
    LEFT_TO_RIGHT = "LeftToRight",

    /** Smart Layout expanding horizontally from the center */
    HORIZONTALLY_CENTER = "HorizontallyCenter",

    /** Smart Layout flowing right to left */
    RIGHT_TO_LEFT = "RightToLeft",

    /** Smart Layout flowing from top to bottom */
    TOP_TO_BOTTOM = "TopToBottom",

    /** Smart Layout expanding verically from the center */
    VERTICALLY_CENTER = "VerticallyCenter",

    /** Smart Layout flowing from bottom to top */
    BOTTOM_TO_TOP = "BottomToTop"
  }

  //------

  interface UI {
    /** Show a small, temporary, message to the user. The message appears at the bottom of the selected document, and is visible for a short period of time. It should consist of a single line of text. */
    message(message: string, Document?: Document): void;

    /** Show an alert with a custom title and message. The alert is modal, so it will stay around until the user dismisses it by pressing the OK button. */
    alert(title: string, text: string): void;

    /** Shows a simple input sheet which displays a message, and asks for an input from the user. */
    getInputFromUser(
      /** The prompt message to show. */
      message: string,

      /** Options to customize the input sheet. Most of the options depends on the type of the input. */
      options: GetInputFromUserOptions,

      /** A function called after the user entered the input. It is called with an Error if the user canceled the input and a string or number depending on the input type (or undefined). */
      callback: (error: Error, value: string) => void
    ): void;

    getTheme(): "dark" | "light";
  }

  type GetInputFromUserOptions = StringTypeOption | SelectionTypeOption;

  interface CommonGetInputFromUserOptions {
    /** A secondary text to describe with more details the input. */
    description?: string;

    /** The initial value of the input. */
    initialValue: string;
  }

  interface StringTypeOption extends CommonGetInputFromUserOptions {
    /** The type of the input. */
    type: InputType.STRING;

    /** Controls the height of the input field. Only used for a string input. If a value is provided it converts the textfield into a scrollable textarea. */
    numberOfLines: number;
  }

  interface SelectionTypeOption extends CommonGetInputFromUserOptions {
    /** The type of the input. */
    type: InputType.SELECTION;

    /** The possible choices that the user can make. Only used for a selection input. */
    possibleValues: string[];
  }

  export const enum InputType {
    STRING = "string",
    SELECTION = "selection"
  }
}
