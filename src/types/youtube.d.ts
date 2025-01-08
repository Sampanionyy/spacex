declare global {
    interface Window {
      YT: {
        Player: new (
          elementId: string,
          config: {
            height: string | number;
            width: string | number;
            videoId: string;
            events?: {
              onReady?: () => void;
              onStateChange?: (event: any) => void;
            };
          }
        ) => void;
      };
      onYouTubeIframeAPIReady?: () => void;
    }
  }
  
  export {};