export interface Hospital{
    index:number,
    hospitalName: string,
    registrationDate: string,
    numOfBeds:number,
    numOfDevice:number,
    numOfAllocatedDevice:number,
    roomName:string,
    status: string,
    delete: boolean,
    self?:boolean,
    _id?: string
}