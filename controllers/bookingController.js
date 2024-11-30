const Booking = require('../models/Booking');
const Apartment = require('../models/Apartment');
const User = require('../models/User');
const { sendBookingEmail } = require('../utils/nodemailerConfig');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, apartmentId, checkInDate, checkOutDate } = req.body;

    const apartment = await Apartment.findById(apartmentId);
    if (!apartment || apartment.isBooked) {
      return res.status(400).json({ error: 'Apartment is unavailable' });
    }

    const booking = new Booking({ user: userId, apartment: apartmentId, checkInDate, checkOutDate });
    await booking.save();

    // Update apartment and user
    apartment.isBooked = true;
    await apartment.save();

    const user = await User.findById(userId);
    user.currentBooking = { apartment: apartmentId, checkInDate, checkOutDate };
    user.bookingHistory.push({ apartment: apartmentId, checkInDate, checkOutDate });
    await user.save();

    // Send email to user and admin
    sendBookingEmail(user.email, apartment, checkInDate, checkOutDate);

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking not found or already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const apartment = await Apartment.findById(booking.apartment);
    apartment.isBooked = false;
    await apartment.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
