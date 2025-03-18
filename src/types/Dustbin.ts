export interface IDustbin{
    id: string;
    location: string;
    status: string;
    category: string;
    filled: number;
    capacity: number;
    filledPercentage: number;
}