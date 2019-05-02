
export  interface Location {
 id: number;
 name: string;
 address: string;
 coordinates: {lon: number, lat: number};
 categories: number[];
}