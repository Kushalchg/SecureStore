import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { CartItem, decreaseQuantity, increaseQuantity, removeFromCart } from '@/lib/redux/productSlice';
import { ExtendedTheme } from '@/constants/CustomTheme';
import { CustomButton } from '../custom/CustomButton';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { shortToast } from '@/utils/Toast';

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent = ({ item }: CartItemProps) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch()
  const styles = createStyles(colors);

  const handleIncrement = (id: number) => {
    dispatch(increaseQuantity(id))
  };

  const handleDecrement = (id: number) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(id))
    } else {
      shortToast("Can't go lower than 1.\n But you can remove item")
    }
  };

  const handleDelete = (id: number) => {

    Alert.alert(
      "Remove Item",
      "Are you sure to remove form the  items from cart?",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Ok', style: 'destructive', onPress: () => dispatch(removeFromCart(id))
        },
      ]

    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>NPR {item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>

          <CustomButton
            onPress={() => handleDecrement(item.id)}
            borderColor={colors.red}
            style={{ paddingHorizontal: 3, paddingVertical: 3 }}>
            <MaterialIcons name="remove" size={20} color={colors.red} />
          </CustomButton>
          <Text style={styles.quantity}>{item.quantity}</Text>

          <CustomButton
            onPress={() => handleIncrement(item.id)}
            borderColor={colors.profit}
            style={{ paddingHorizontal: 3, paddingVertical: 3 }}>
            <MaterialIcons name="add" size={20} color={colors.profit} />
          </CustomButton>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.removeButton}>
        <Feather name="trash-2" size={24} color={colors.notification} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      resizeMode: 'contain',
      marginRight: 16,
    },
    details: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    price: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 8,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      padding: 8,
      backgroundColor: colors.background,
      borderRadius: 8,
    },
    quantity: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginHorizontal: 12,
    },
    removeButton: {
      padding: 8,
    },
  });

export default CartItemComponent;
