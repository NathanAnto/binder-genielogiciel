import { Meteor } from 'meteor/meteor';
import { Book } from './db/models';
import { get_real_books } from '../data/generate_mock_data';

Meteor.startup(async () => {
  try {
    console.log('Fixture başlatılıyor...');
    const bookCount = await Book.count();
    console.log('Mevcut kitap sayısı:', bookCount);

    if (bookCount === 0) {
      const books = get_real_books();
      console.log('Yüklenecek kitap sayısı:', books.length);
      
      for (const bookData of books) {
        try {
          await Book.create({
            ...bookData,
            isAvailable: true,
            bookingDuration: 14
          });
          console.log(`Kitap eklendi: ${bookData.title}`);
        } catch (err) {
          console.error(`Kitap eklenirken hata: ${bookData.title}`, err);
        }
      }
      console.log('Tüm kitaplar başarıyla yüklendi');
    }
  } catch (error) {
    console.error('Fixture yüklenirken hata:', error);
  }
});