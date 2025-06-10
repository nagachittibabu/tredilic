  'use server';

  import DBConnect from '../../utils/config/db';
  import BookingModel from '../../utils/models/Booking';

  const BookingAction = async (bookingData) => {
    await DBConnect();
    try {
      const userBookingDetails = await BookingModel.create({
        productId:bookingData[0].productId,
        title: bookingData[0].title,
        description: bookingData[0].description,
        image: bookingData[0].image,
        price: bookingData[0].price,
        quantity:bookingData[0].selectedQuantity,
        size: bookingData[0].selectedSize,
      });
        return {success:true};
    } catch (error) {
      
      console.log(error);  }
  };

  export default BookingAction;
