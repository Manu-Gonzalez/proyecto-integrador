
export default class Order {
    constructor(

        public readonly id: string,
        public readonly total: number,
        public readonly status: string,
        public readonly createdAt: Date,


    ) { }


}
