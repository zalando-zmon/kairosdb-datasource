export declare class MetricTags {
    tags: {
        [key: string]: string[];
    };
    size: number;
    initialized: boolean;
    combinations: number;
    multiValuedTags: string[];
    custom: boolean;
    updateTags(tags: any): void;
    private updateInfo();
}
