import { IDustbinInfo, IDustbinOverview, IDustbinSectorCount } from '@/types/DustbinInfo';
import { create } from 'zustand';


// Store state interface
interface DustbinInfoState {
    dustbinInfo: IDustbinInfo;
    setDustbinInfo: (info: IDustbinInfo) => void;
    updateOverview: (overview: Partial<IDustbinOverview>) => void;
    updateSectorCounts: (sectorCounts: IDustbinSectorCount[]) => void;
    addSectorCount: (sectorCount: IDustbinSectorCount) => void;
    removeSectorCount: (title: string) => void;
    resetStore: () => void;
}

// Initial state
const initialState: IDustbinInfo = {
    overview: {
        totalBins: 0,
        damagedBins: 0,
        workingBins: 0,
        underMaintenance: 0
    },
    sectorCounts: []
};

// Create store
export const useDustbinInfoStore = create<DustbinInfoState>((set) => ({
    dustbinInfo: initialState,
    
    setDustbinInfo: (info: IDustbinInfo) => set({ dustbinInfo: info }),
    
    updateOverview: (overview: Partial<IDustbinOverview>) => set((state) => ({
        dustbinInfo: {
            ...state.dustbinInfo,
            overview: {
                ...state.dustbinInfo.overview,
                ...overview
            }
        }
    })),
    
    updateSectorCounts: (sectorCounts: IDustbinSectorCount[]) => set((state) => ({
        dustbinInfo: {
            ...state.dustbinInfo,
            sectorCounts
        }
    })),
    
    addSectorCount: (sectorCount: IDustbinSectorCount) => set((state) => ({
        dustbinInfo: {
            ...state.dustbinInfo,
            sectorCounts: [...state.dustbinInfo.sectorCounts, sectorCount]
        }
    })),
    
    removeSectorCount: (title: string) => set((state) => ({
        dustbinInfo: {
            ...state.dustbinInfo,
            sectorCounts: state.dustbinInfo.sectorCounts.filter(
                (sector) => sector.title !== title
            )
        }
    })),
    
    resetStore: () => set({ dustbinInfo: initialState })
}));