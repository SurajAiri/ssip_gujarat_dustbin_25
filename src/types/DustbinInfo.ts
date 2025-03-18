export interface IDustbinInfo {
    overview: IDustbinOverview;
    sectorCounts: IDustbinSectorCount[];
}

export interface IDustbinOverview {
    totalBins: number;
    damagedBins: number;
    workingBins: number;
    underMaintenance: number;
}

export interface IDustbinSectorCount {
    title: string;
    count: number;
}

export interface IDustbinFilledCount{
    filled90: number;
    filled50: number;
    filled30: number;
    below30: number;
}