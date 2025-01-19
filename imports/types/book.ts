export default interface Book {
    id: number;
    title: string;
    max_booking_time: number;
    author_id: number | string;
    availability: number;
}
