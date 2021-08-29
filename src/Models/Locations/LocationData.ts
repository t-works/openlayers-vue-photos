export interface JDataInterface{
    name: string,
    description?: string
    photos?: []
}

export class LocationData{
    data: JDataInterface

    constructor(data: JDataInterface) {
        this.data = data;
    }
    getName(): string{
        return this.data.name;
    }
    getDescription(): string{
        if({}.hasOwnProperty.call(this.data,'description')){
            return this.data.description as string;
        }
        return ''
    }
    setValue<P extends keyof JDataInterface>(propName: P, propValue: JDataInterface[P]){
        this.data[propName] = propValue;
    }
    getData(): JDataInterface{
        return this.data;
    }
}