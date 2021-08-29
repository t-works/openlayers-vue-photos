export class InteractionEvent<ContainedEvent, DataType>{
    public data: DataType;
    public event: ContainedEvent;
    constructor(event: ContainedEvent, data: DataType) {
        this.data = data;
        this.event = event;
    }
    getEvent(): ContainedEvent{
        return this.event;
    }
}