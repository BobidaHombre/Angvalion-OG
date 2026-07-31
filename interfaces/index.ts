export type User = {
  id: number;
  name?: string;
};

export interface IInteractiveMapFromMap {
  enabled: boolean;
  map: IInteractiveMap;
  height: number;
  width: number;
  x: number;
  y: number;
  brushSize: number;
  blurStrength: number;
  brushOpacity: number;
  shadowBrushes: { x: number; y: number }[];
}

export interface IInteractiveMap {
  src: {
    user: string;
    additionalPayload: any;
    url: string;
    uploadUrl: string;
    isAdmin: boolean;
    size: {
      width: number;
      height: number;
    };
  };

  createFrom: IInteractiveMapFromMap;
}
