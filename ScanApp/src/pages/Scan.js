// |> Importando Dependencias
import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, Alert} from 'react-native';
import { RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import {BarCodeScanner} from 'expo-barcode-scanner'
import axios from 'axios';
// |> importando Imagens
import CodeBar from '../assets/CodeBar.png';


export default function Scan({navigation}){
    const [appPermission, setAppPermission] = useState(null);
    const [Scanned, setScanned] = useState(false);
    
    const MY_STORAGE_KEY = '@key:value';

    useEffect( () => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setAppPermission(status === 'granted');
        }) ();

    }, [])


    const handleBarCodeScanned = async ({ data }) => {
        
        setScanned(true);

        const api = await (axios.get(`https://api.beepayapp.com.br/api/get-produto?mercado_id=6&codigo=${data}`,{headers:{'Authorization':`Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg4MjRkM2NkNTU1NmUxNWNjZGFmZWJhMDkzYjA2MjdlMDc0YjQ1MzVkNmIwMWQyMGZiZTI1YmViYzcwMmE4NjkyZmEwNGI1NDI1MDFjMDBlIn0.eyJhdWQiOiI0IiwianRpIjoiODgyNGQzY2Q1NTU2ZTE1Y2NkYWZlYmEwOTNiMDYyN2UwNzRiNDUzNWQ2YjAxZDIwZmJlMjViZWJjNzAyYTg2OTJmYTA0YjU0MjUwMWMwMGUiLCJpYXQiOjE1OTE3NDU0MDIsIm5iZiI6MTU5MTc0NTQwMiwiZXhwIjoxNjIzMjgxNDAyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.zhLEU-zu4-7m8APwlAdqQMhDRi7ksxaZM3tflGOZ7hvM-Ykh6rl5FSIc0SWFmzGUExF6Fo9CURC4QClxuW_CuHjMkm0H71lH5tWUpNBmz1PGYQgcqd6_1s5maQRSu1_QbhtpvbdhkndatK8ExECQsHwcbMguIka8imJeuQkvnJfj6qa8jM3gRVRg5lNfJC9KjpxnJR1r56wdMQ8cFo6bR2Gb-WLUg-bcNL1XJYgHm31HH2qyI_Jg1qjAR8QpE3YyE4eQyOYYNxT0gnqUuDEHW71FBAn1TQW5u8_1THOjsZbPYISZHYezwVidighauqmjDjf5XJMZJOCG5rHhlVX4hTiyO5JVQ0ARMccQylZzs4BCnzegtmbJlXCAXFdNsQCn19I7kBh9595Uw1CC4CeUiRoLgZV1-SDkHQ4cF35A6jaLYcrXFef9_41gnDVbjhS0ojLkTuQD93Aktm2wYxVzn8lTjwF5z9yCXJ-jK_8OA_UTMxDF-fuvvYAJah20t6brm1tXgq5A4AlVyPmBTOPs3uQwpPLmqXDEiRRCSrwo_yV0plwGwgynz_kmZvmn7_VzxgpTYtECZ3lGEt_iRnJEfmHknqRqUIJGO03hzZl9b4vE6VSZDmOdONK-Z74NW4gPq7aoX0Ms2ZQ3NqVlZwBE0SXX-QgWrXNSZflbCX-kViU'}`}}, '/Cart'));

        const  {id,codigo, descricao, valor_unitario} = api.data;

        const value = await AsyncStorage.setItem(MY_STORAGE_KEY, JSON.stringify({
            id: id,
            codigo: codigo,
            descricao: descricao,
            valor_unitario: valor_unitario
        }));
    };

    const handlerResetScanner = () => {
         setScanned(false)
    }

    const handleSubmit = async () =>{
         const storage = await AsyncStorage.getItem(MY_STORAGE_KEY);
         Alert.alert("Sucesso",storage);
         console.log(storage)
        await navigation.navigate('Carrinho');
    }

    if(appPermission == null){
        return <Text>Solicitando permissão da câmera</Text>
    }

    if(appPermission === false){
        return <Text>No access to camera</Text>;
    }

    return(
        <>
            <View style={styles.header}> 
                <Text style={styles.headerTxt}>Scan Product</Text>
            </View>

            <View style={styles.imgContainer}>
                <Image  source={CodeBar}/>
                <Text style={styles.imgTxt}>Código do Produto</Text>
                <Text style={styles.imgTxt2}>Escanear código de barras do Produto</Text>
            </View>

            <View>
                <RectButton style={styles.inputScan} onPress={handlerResetScanner}>
                    <Text style={styles.inputScanText}>Escanear Codigo</Text>
                </RectButton>
                
                <RectButton onPress={handleSubmit} style={styles.inputSubmit}>
                    <Text style={styles.inputSubmitTxt}>Enviar pro Carrinho</Text>
                </RectButton>

            </View>

            <View style={styles.Camera}>
                <BarCodeScanner 
                     onBarCodeScanned={Scanned ? undefined : handleBarCodeScanned }
                    style={styles.codeBar} 
                />
            </View>
        </>
        
);}

const styles = StyleSheet.create({
    // |> Estilo do Header
   header:{
        height: 100, 
        backgroundColor: "#F32F56"
   },

   headerTxt:{
        textAlign:"center",
        top:50,
        fontSize: 30,
        color: "#FFF",
        fontWeight: "600"
   },

   // |> Estilo da Area de Inputs 
   imgContainer:{
        alignItems: "center",
    }, 

    imgTxt:{
        textAlign: "center",
        justifyContent: "center",
        fontSize: 30,
        color: "#333",
        fontWeight: "700",
        bottom: 40
   },

   imgTxt2:{
        textAlign: "center",
        justifyContent: "center",
        fontSize: 15,
        color: "#605A5A",
        fontWeight: "700",
        bottom: 20
   },

 
   inputScan:{
        top: 220,
        alignItems: "center",
        backgroundColor: "#F32F56",
        width: 300,
        height: 50,
        left: 37,
        borderRadius: 10
    },

    inputScanText:{
        color:"#FFF",
        fontSize: 22,
        fontWeight: "700",
        top: 10
    },

   codeBar:{
       height: 200,
       width: 300,
       alignItems: "center",
       left: 38,
       bottom: 100,
   },
   
   inputSubmit:{
        backgroundColor: "#7099d8",
        top:240,
        left: 40,
        width: 300,
        height:50,
        justifyContent:"center",
        borderRadius: 10
   },

   inputSubmitTxt:{
        textAlign:"center",
        fontSize: 22,
        color: "#fff",
        fontWeight: "700"
   }

});






