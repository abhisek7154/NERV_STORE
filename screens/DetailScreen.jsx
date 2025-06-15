import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailScreen = ({ navigation, route }) => {
  const item = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const renderGalleryItem = ({ item: galleryItem, index }) => (
    <TouchableOpacity
      style={{
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: selectedImageIndex === index ? 2 : 0,
        borderColor: '#ff0033',
      }}
      onPress={() => setSelectedImageIndex(index)}
    >
      <Image source={galleryItem} style={{ width: 50, height: 50 }} resizeMode="cover" />
    </TouchableOpacity>
  );

  const renderAmenityItem = ({ item: amenity }) => (
    <View
      style={{
        backgroundColor: '#111',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ff0033',
      }}
    >
      <Text style={{ color: '#ff0033', fontSize: 11, fontWeight: '500' }}>{amenity}</Text>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: '#000', paddingBottom: 20 }}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />

      {/* Back to Home Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: 8,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#ff0033',
        }}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={24} color="#ff0033" />
      </TouchableOpacity>

      <ImageBackground
        style={{
          height: 350,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          overflow: 'hidden',
        }}
        source={
          item.gallery && item.gallery.length > 0
            ? item.gallery[selectedImageIndex]
            : item.image
        }
      >
        <View
          style={{
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            justifyContent: 'flex-end',
          }}
        >
          {item.featured && (
            <Icon name="star" size={24} color="#ff0033" style={{ marginRight: 8 }} />
          )}
          <Icon name="bookmark-border" size={24} color="#ff0033" />
        </View>

        {item.category && (
          <View
            style={{
              position: 'absolute',
              bottom: 15,
              left: 20,
              backgroundColor: 'rgba(0,0,0,0.7)',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#ff0033',
            }}
          >
            <Text style={{ color: '#ff0033', fontSize: 11, fontWeight: 'bold' }}>
              {item.category}
            </Text>
          </View>
        )}
      </ImageBackground>

      <View
        style={{
          position: 'absolute',
          top: 320,
          right: 20,
          height: 50,
          width: 50,
          backgroundColor: '#ff0033',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#fff',
        }}
      >
        <Icon name="place" color="#fff" size={24} />
      </View>

      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ff0033' }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Icon name="location-on" size={14} color="#555" />
          <Text style={{ fontSize: 13, color: '#555', marginLeft: 5 }}>{item.location}</Text>
        </View>

        {item.distance && (
          <Text style={{ fontSize: 11, color: '#ff0033', marginTop: 3 }}>{item.distance}</Text>
        )}

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name="star"
                  size={16}
                  color={index < Math.floor(item.rating || 4) ? '#ff0033' : '#555'}
                />
              ))}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 6, color: '#ff0033' }}>
              {item.rating || '4.0'}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: '#555' }}>{item.reviews || 365} reviews</Text>
        </View>

        {item.gallery?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#ff0033' }}>GALLERY</Text>
            <FlatList
              data={item.gallery}
              renderItem={renderGalleryItem}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#ff0033' }}>DESCRIPTION</Text>
          <Text style={{ lineHeight: 20, color: '#aaa', fontSize: 13 }}>{item.details}</Text>
        </View>

        {item.amenities?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#ff0033' }}>FEATURES</Text>
            <FlatList
              data={item.amenities}
              renderItem={renderAmenityItem}
              keyExtractor={(amenity, index) => index.toString()}
              numColumns={3}
              scrollEnabled={false}
            />
          </View>
        )}

        {item.roomTypes?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#ff0033' }}>UNIT TYPES</Text>
            {item.roomTypes.map((roomType, index) => (
              <Text key={index} style={{ fontSize: 12, color: '#aaa', marginBottom: 3 }}>
                • {roomType}
              </Text>
            ))}
          </View>
        )}

        {(item.checkIn || item.checkOut) && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#ff0033' }}>OPERATION TIMES</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {item.checkIn && (
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#ff0033' }}>ACTIVATION</Text>
                  <Text style={{ fontSize: 12, color: '#aaa', marginTop: 3 }}>{item.checkIn}</Text>
                </View>
              )}
              {item.checkOut && (
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#ff0033' }}>DEACTIVATION</Text>
                  <Text style={{ fontSize: 12, color: '#aaa', marginTop: 3 }}>{item.checkOut}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View
          style={{
            marginTop: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff0033' }}>RESOURCE COST</Text>
          <View
            style={{
              height: 40,
              alignItems: 'center',
              paddingLeft: 15,
              flex: 1,
              backgroundColor: '#111',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              flexDirection: 'row',
              marginLeft: 30,
              borderWidth: 1,
              borderColor: '#ff0033',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff0033' }}>
              ${item.price}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '500', color: '#555', marginLeft: 6 }}>
              / PER CYCLE
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            backgroundColor: '#ff0033',
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
          }}
          onPress={() =>
            navigation.navigate('Booking', {
              hotelName: item.name,
              hotelAddress: item.location,
            })
          }
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }}>
            INITIATE DEPLOYMENT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;