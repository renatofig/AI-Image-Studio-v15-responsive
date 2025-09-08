// FIX: Removed the import of `AppMode` from './App' to resolve a circular dependency.
export enum AppMode {
  CREATE = 'create',
  EDIT = 'edit',
  RENDER = 'render',
  VIDEO = 'video',
}

export enum CreateFunction {
  FREE = 'free',
  STICKER = 'sticker',
  LOGO = 'text',
  COMIC = 'comic',
  SKETCH = 'sketch',
  PATTERN = 'pattern',
}

export enum EditFunction {
  ADD_REMOVE = 'add-remove',
  RETOUCH = 'retouch',
  STYLE = 'style',
  COMPOSE = 'compose',
  TEXT_OVERLAY = 'text-overlay',
  MASK_EDIT = 'mask-edit',
}

export enum RenderInputType {
    SKETCH = 'sketch',
    BASIC_MODEL = 'basic_model',
    FLOOR_PLAN = 'floor_plan',
}

export enum ImageFilter {
  GRAYSCALE = 'grayscale',
  SEPIA = 'sepia',
  INVERT = 'invert',
  VINTAGE = 'vintage',
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export type ImageFile = {
  file: File;
  base64: string;
};

export interface GalleryImage {
  id: string;
  src: string;
  createdAt: number;
  isFavorite: boolean;
  prompt: string;
}

export interface TextOverlayState {
  text: string;
  color: string;
  size: number; // Percentage of image width
  font: string;
  x: number; // Percentage
  y: number; // Percentage
}

export interface MaskState {
    image: string | null; // base64 of the mask
    brushSize: number;
    mode: 'draw' | 'erase' | 'none';
}

export interface FavoritePrompt {
    id: string;
    text: string;
    type: 'positive' | 'negative';
    createdAt: number;
}

export interface CropState {
  x: number; // Percentage
  y: number; // Percentage
  width: number; // Percentage
  height: number; // Percentage
}

// Full application state for history management
export interface AppState {
    mode: AppMode;
    createFunction: CreateFunction;
    editFunction: EditFunction;
    renderInputType: RenderInputType;
    prompt: string;
    negativePrompt: string;
    batchSize: number;
    aspectRatio: AspectRatio;
    videoAspectRatio: AspectRatio;
    videoIncludeAudio: boolean;
    renderFidelity: number; // 0 (Max Creativity) to 100 (Max Fidelity)
    image1: ImageFile | null;
    originalImage1: ImageFile | null; // Added to track the original image for download
    image2: ImageFile | null;
    generatedImages: string[] | null;
    generatedVideoUrl: string | null;
    comparisonImage: string | null;
    addWatermark: boolean;
    customWatermark: ImageFile | null;
    textOverlay: TextOverlayState;
    mask: MaskState;
    isMaskingActive: boolean; // New state to explicitly control masking UI
    cropState: CropState;
    // UI state that should NOT be part of history
    ui: {
        openSections: Record<string, boolean>;
        isHistoryPanelOpen: boolean;
        isMasking: boolean; // Loading state for AI mask generation
        showComparator: boolean;
        selectedIndex: number;
        isCropping: boolean;
    }
}