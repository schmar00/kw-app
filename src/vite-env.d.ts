/// <reference types="svelte" />
/// <reference types="vite/client" />

declare class Pulsetic {
    static init(options: {
        badge_id: number;
        monitor_id: number;
        element_id: string;
    }): Promise<void>;
}
