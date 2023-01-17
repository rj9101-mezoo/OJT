export interface Hospital{
    index:number,
    hospitalName: string,
    registrationDate: string,
    numberOfBeds:number,
    numberOfDevice:number,
    numberOfAllocatedDevice:number,
    roomName:string,
    status: string,
    delete: boolean,
    self?:boolean
}