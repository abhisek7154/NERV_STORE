import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import nervMerchandise from '../consts/nervMerchandise';
import { useBooking } from '../context/BookingContext';

const { width } = Dimensions.get('screen');

const BottomNav = ({ navigation }) => {
  const { bookings } = useBooking();

  return (
    <View style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
      backgroundColor: '#111', flexDirection: 'row',
      justifyContent: 'space-around', alignItems: 'center',
      borderTopWidth: 1, borderTopColor: '#ff0033'
    }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ alignItems: 'center' }}>
        <Icon name="home" size={28} color="#ff0033" />
        <Text style={{ fontSize: 12, color: '#ff0033', marginTop: 4, fontWeight: '600' }}>HQ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('BookingList')} style={{ alignItems: 'center' }}>
        <Icon name="shopping-cart" size={28} color={bookings.length > 0 ? '#ff0033' : '#555'} />
        <Text style={{ fontSize: 12, color: bookings.length > 0 ? '#ff0033' : '#555', marginTop: 4 }}>ORDERS</Text>
        {bookings.length > 0 && (
          <View style={{
            position: 'absolute', top: -2, right: -10,
            backgroundColor: '#ff0033', borderRadius: 8,
            width: 16, height: 16, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {bookings.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ alignItems: 'center' }}>
        <Icon name="person-outline" size={28} color="#555" />
        <Text style={{ fontSize: 12, color: '#555', marginTop: 4 }}>OPERATOR</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = React.useState('Apparel');
  const [showAllItems, setShowAllItems] = React.useState(false);

  const tabs = [
    { name: 'Apparel', icon: 'checkroom' },
    { name: 'Models', icon: 'precision-manufacturing' },
    { name: 'Media', icon: 'movie' },
    { name: 'Collect', icon: 'collections' }
  ];

  const TabButton = ({ tab }) => (
    <TouchableOpacity
      onPress={() => setSelectedTab(tab.name)}
      style={{
        flex: 1, paddingVertical: 12, borderRadius: 0, alignItems: 'center',
        backgroundColor: selectedTab === tab.name ? '#222' : 'transparent',
        borderBottomWidth: selectedTab === tab.name ? 2 : 0,
        borderBottomColor: '#ff0033'
      }}>
      <Icon name={tab.icon} size={24} color={selectedTab === tab.name ? '#ff0033' : '#555'} />
      <Text style={{
        fontSize: 12, fontWeight: '600', marginTop: 4,
        color: selectedTab === tab.name ? '#ff0033' : '#555'
      }}>{tab.name}</Text>
    </TouchableOpacity>
  );

  const ProductCard = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', item)}
      style={{
        width: (width - 60) / 2,
        marginRight: index % 2 === 0 ? 20 : 0,
        marginBottom: 20,
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#222'
      }}>
      <View style={{ position: 'relative' }}>
        <Image
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={{ width: '100%', height: 140 }}
        />
        {item.featured && (
          <View style={{
            position: 'absolute', top: 12, left: 12,
            backgroundColor: '#ff0033',
            borderRadius: 4, paddingHorizontal: 6,
            paddingVertical: 2
          }}>
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>OFFICIAL</Text>
          </View>
        )}
        <View style={{
          position: 'absolute', top: 12, right: 12,
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: 4, paddingHorizontal: 6,
          paddingVertical: 2, flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Icon name="star" size={14} color="#ff0033" />
          <Text style={{ color: '#fff', fontSize: 12, marginLeft: 2, fontWeight: '600' }}>{item.rating}</Text>
        </View>
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 4
        }}>{item.name}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff0033' }}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const FeaturedCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', item)}
      style={{
        marginHorizontal: 20, marginBottom: 20, backgroundColor: '#111',
        borderWidth: 1, borderColor: '#ff0033'
      }}>
      <View style={{ position: 'relative' }}>
        <Image
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={{ width: '100%', height: 200 }}
        />
        <View style={{
          position: 'absolute', top: 16, left: 16, backgroundColor: '#ff0033',
          borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4
        }}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>LIMITED</Text>
        </View>
        <View style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16,
          backgroundColor: 'rgba(0,0,0,0.7)'
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>{item.name}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff0033' }}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const Header = () => (
    <View>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ff0033' }}>NERV{'\n'}MERCHANDISE</Text>
          <TouchableOpacity style={{
            width: 44, height: 44, borderRadius: 22, backgroundColor: '#111',
            justifyContent: 'center', alignItems: 'center',
            borderWidth: 1, borderColor: '#ff0033'
          }}>
            <Icon name="search" size={24} color="#ff0033" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        marginHorizontal: 20,
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#222'
      }}>
        {tabs.map((tab, index) => <TabButton key={index} tab={tab} />)}
      </View>

      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, marginTop: 30, marginBottom: 20
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ff0033' }}>OFFICIAL GEAR</Text>
        <TouchableOpacity onPress={() => setShowAllItems(!showAllItems)}>
          <Text style={{ fontSize: 14, color: '#ff0033', fontWeight: '600' }}>
            {showAllItems ? 'LESS' : 'MORE'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20 }}>
        {(showAllItems ? nervMerchandise : nervMerchandise.slice(0, 4)).map((item, index) =>
          <ProductCard key={index} item={item} index={index} />
        )}
      </View>

      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff0033',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20
      }}>
        LIMITED EDITIONS
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={nervMerchandise.filter(item => item.featured).slice(0, 3)}
        renderItem={({ item }) => <FeaturedCard item={item} />}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;
