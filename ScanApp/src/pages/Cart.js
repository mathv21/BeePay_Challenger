import React, {useState, useEffect, Component} from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage} from 'react-native';
import { ScrollView, TextInput, State } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

export default function Cart(){

    const MY_STORAGE_KEY = '@key:value';
    
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('')
    const [valor_unitario, setValor_unitario] = useState('')

    
    const loadProducts = async ({}) =>{


        const infolist = await AsyncStorage.getItem(MY_STORAGE_KEY);


        console.log(infolist)

    }
    loadProducts();

     return(


        <>
            <View style={styles.header}> 
                    <Text style={styles.headerTxt}>Carrinho</Text>
            </View>
            <SafeAreaView>
                    <Text style={styles.inputText}> Qual a quantidade de items que deseja?</Text>
                    <TextInput keyboardType="numeric" placeholder="Quantidade" style={styles.input}></TextInput>
            </SafeAreaView>
              <SafeAreaView style={styles.container}>  
                    <ScrollView > 
                        <View style={styles.BoxCart}>
                            <Text  style={styles.id}>{}</Text>
                            <Text style={styles.produto}>INFO DO PRODUTO</Text>
                            <Text style={styles.tipo}>TIPO: Leite em pó</Text>
                            <Text style={styles.descrição}>DESCRIÇÃO:Leite em Pó Ninho Forti+ Integral Instantâneo 400G</Text>
                        </View>
                     </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    
    header:{
        height: 100, 
        backgroundColor: "#F32F56"
    },

    container:{
        flex: 1,
        padding: 0
    },

    headerTxt:{
        textAlign:"center",
        top:50,
        fontSize: 30,
        color: "#FFF",
        fontWeight: "600"
   },
    
    BoxCart:{
        top: 100,
        backgroundColor: "#fff",
        width: 320,
        height:200,
        left: 25,
        borderRadius: 16,      
    },

    produto:{
        fontSize:22,
        fontWeight: "bold",
        textAlign: "center",
        bottom: 10
        
    },

    id:{
        fontSize:16,
        fontWeight: "500",
        top:70,
        color: "#9A9898",
        paddingHorizontal: 10
    },
   
    tipo:{
        fontSize:16,
        fontWeight: "500",
        top: 60,
        color: "#9A9898",
        paddingHorizontal: 10
    },
    descrição:{
        fontSize:16,
        fontWeight: "500",
        top: 70,
        color: "#9A9898",
        paddingHorizontal: 10
    },

    input:{
        top: 40,
        backgroundColor: "#fff",
        height: 60,
        width: 300,
        left: 35,
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 25,
    },

    inputText:{
        top: 20,
        textAlign:"center",
        fontWeight: "600",
        fontSize: 18,

    }

})