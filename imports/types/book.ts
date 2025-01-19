export default interface Book {
    id?: string;
    title: string;
    max_booking_time: number;
    author_id: number | string;
    availability: number;
    genre_id: number;
}
