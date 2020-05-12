import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Axios from 'axios';
import {
  extractNutrientsFromOpenFoodFacts,
  extractNutrientsFromOpenFoodFactsWithoutServing,
} from '../functions/extractNutrients';

const ScanBarcode = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const request = async () => {
      const response = await Axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const foodName = response.data.product['product_name'];
      const foodNutrients = response.data.product['nutriments'];
      const servingSize = response.data.product['serving_quantity'];
      let withServing = true;
      if (servingSize === undefined) {
        withServing = false;
      }
      const foodIngredients =
        response.data.product['ingredients_text_en_imported'];
      props.navigation.navigate('DisplayFood', {
        foodId: '',
        mealOrder: props.route.params.mealOrder,
        foodName: foodName,
        brandOwner: '',
        servingSize: withServing ? servingSize : 1,
        foodNutrients: extractNutrientsFromOpenFoodFacts(
          foodNutrients,
          withServing
        ),
        ingredients: foodIngredients,
        displayType: 'adding',
        foodAmount: withServing ? servingSize : 1,
        servingUnit: withServing ? 'grams' : 'package',
      });
    };
    request();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default ScanBarcode;
