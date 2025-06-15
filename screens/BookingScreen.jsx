import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  SafeAreaView, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useBooking } from '../context/BookingContext';

const { width } = Dimensions.get('screen');

const BookingScreen = ({ navigation, route }) => {
  const { addBooking } = useBooking();
  const { hotelName = 'Blue Lagoon Resort', hotelAddress = 'Lagoon Avenue, Bali' } = route.params || {};

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('Ocean View');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateField, setDateField] = useState(null);

  const rooms = [
    { name: 'Ocean View', price: 120 },
    { name: 'Garden Villa', price: 95 },
    { name: 'Beach Bungalow', price: 140 }
  ];

  const nights = 3;
  const roomPrice = rooms.find(r => r.name === selectedRoom)?.price || 0;
  const serviceFee = 25;
  const total = roomPrice * nights + serviceFee;

  const showDatePicker = (field) => {
    setDateField(field);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const formatted = date.toDateString().slice(4, 10);
    if (dateField === 'checkin') setCheckInDate(formatted);
    if (dateField === 'checkout') setCheckOutDate(formatted);
    hideDatePicker();
  };

  const confirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    const bookingDetails = {
      hotelName,
      hotelAddress,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      room: selectedRoom,
      adults,
      children,
      nights,
      total
    };
      console.log('Booking Details:', bookingDetails);
    addBooking(bookingDetails);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
        {/* Hotel Info */}
        <View style={{
          backgroundColor: '#4facfe', padding: 20, borderRadius: 12,
          alignItems: 'center', marginBottom: 20
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{hotelName}</Text>
          <Text style={{ color: 'white', fontSize: 12 }}>{hotelAddress}</Text>
        </View>

        {/* Date Selection */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
            <Icon name="calendar" size={18} /> Select Dates
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {[{ label: 'Check-in', val: checkInDate, type: 'checkin' },
              { label: 'Check-out', val: checkOutDate, type: 'checkout' }]
              .map((d, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => showDatePicker(d.type)}
                  style={{
                    backgroundColor: '#fff', padding: 14, borderRadius: 12,
                    flex: 1, marginHorizontal: 5, elevation: 2,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                  }}>
                  <Icon name="calendar" size={18} color="#4facfe" />
                  <Text style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 14 }}>
                    {d.val || d.label}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Guest Selection */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
            <Icon name="account-group" size={18} /> Guests
          </Text>
          {[{ label: 'Adults', desc: 'Age 13+', val: adults, set: setAdults },
            { label: 'Children', desc: 'Age 2–12', val: children, set: setChildren }]
            .map((g, i) => (
              <View key={i} style={{
                flexDirection: 'row', justifyContent: 'space-between',
                backgroundColor: '#fff', padding: 14, borderRadius: 12,
                marginBottom: 10, elevation: 2
              }}>
                <View>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>{g.label}</Text>
                  <Text style={{ fontSize: 10, color: '#6b7280' }}>{g.desc}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => g.set(Math.max(0, g.val - 1))}>
                    <Text style={{ fontSize: 22, paddingHorizontal: 12, color: '#4facfe' }}>−</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16 }}>{g.val}</Text>
                  <TouchableOpacity onPress={() => g.set(g.val + 1)}>
                    <Text style={{ fontSize: 22, paddingHorizontal: 12, color: '#4facfe' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>

        {/* Room Type */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
            <Icon name="bed" size={18} /> Room Type
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {rooms.map((room, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedRoom(room.name)}
                style={{
                  padding: 16, backgroundColor: '#fff', borderRadius: 12,
                  marginRight: 10, elevation: 2, alignItems: 'center',
                  borderColor: selectedRoom === room.name ? '#4facfe' : 'transparent',
                  borderWidth: selectedRoom === room.name ? 2 : 0
                }}>
                <Text style={{ fontSize: 13, fontWeight: '500' }}>{room.name}</Text>
                <Text style={{ fontSize: 14, color: '#4facfe' }}>${room.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Summary */}
        <View style={{
          backgroundColor: '#fff', padding: 16, borderRadius: 12,
          elevation: 2, marginBottom: 20
        }}>
          <Text style={{ fontSize: 13, color: '#334155' }}>{selectedRoom} × {nights} nights</Text>
          <Text style={{ fontSize: 13, color: '#334155' }}>Room: ${roomPrice * nights}</Text>
          <Text style={{ fontSize: 13, color: '#334155' }}>Service fee: ${serviceFee}</Text>
        </View>

        {/* Total & Confirm */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Total: ${total}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#4facfe', paddingVertical: 14,
              paddingHorizontal: 40, borderRadius: 10
            }}
            onPress={confirmBooking}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default BookingScreen;
