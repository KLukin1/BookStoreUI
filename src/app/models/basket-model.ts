export class BasketItem {
    bookId: number;
    title: string;
    image: string;
    authorFirstName: string;
    authorLastName: string;
    price: number;
    discount: number;
    basketId: number;
    basketItemId: number;
    count: number;
    datePayed: Date;
}

export class HistoryItem {
    basketId: number;
    datePayed: Date;
    items: BasketItem[];
    totalSum: number;
}
