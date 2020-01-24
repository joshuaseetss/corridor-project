export class BusinessCard {
    public name: string;
    public location: string;
    public address: string;
    public postalCode: string;
    public phoneNo: string;
    public rating: number;
    public noOfReviews: number;
    public description: string;
    public imageUrl: string;
    public avgRating: string;
    public avgPricePerPax: number;
    public images: Array<string>;
    public portfolio: Array<string>;
    public services: Array<Object>;
    public reviews: Array<Object>;
    public openingHrs: Array<Object>;
}