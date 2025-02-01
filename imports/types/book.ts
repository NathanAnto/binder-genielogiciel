export default interface Book {
    id?: number;
    title: string;
    author_id: number;
    genre_id: number;
    max_booking_time: number;
    availability: number;
}
