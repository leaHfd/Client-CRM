export class LocationType {
    Type?: string;
    Code?: string;
}

export let LocationTypes: LocationType[] = [
    {Type: "MobileDevice", Code: "0"}, 
    {Type: "FixedDevice", Code: "1"},
    {Type: "VirtualDevice", Code: "2"}
]