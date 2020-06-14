import React, {createContext,useState, useEffect, useContext,} from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage, Image} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, RectButton, FlatList} from 'react-native-gesture-handler';

import carrinho from '../assets/cart.png'; 


export default function Products({children}){

    const MY_STORAGE_KEY = '@key:value';

    // |> estados da informação do storage
    const [codeBar, setCodeBar] = useState('');
    const [desc, setDesc] = useState('')
    const [value, setValue] = useState('')

    const [cart, setCart] = useState([]);
    const [totalValue, setTotatlValue] = useState();


    const loadProducts = async () =>{
    
        const infolist =  await AsyncStorage.getItem(MY_STORAGE_KEY);
        
        const {codigo, descricao, valor_unitario} = JSON.parse(infolist)

        if(infolist){
            setCodeBar(codigo);
            setDesc(descricao);
            setValue(valor_unitario);
        }

        console.log(codeBar + descricao + valor_unitario);
    }

    const Addcart = async () => {

        cart.push(codeBar, desc, value);
    }
  
    useEffect(() => {
        loadProducts();
    },[cart]);

    useEffect(() =>{
        console.log(cart)
        Addcart();
    }, [cart]);

     return(
        <>
            <View style={styles.header}> 
                    <Text style={styles.headerTxt}>Lista de Produtos</Text>

                <View style={styles.backgroundCart}>
                    <TouchableOpacity>     
                        <Text style={styles.textNumber}>{cart.length}</Text>
                        <Image style={styles.carrinho} source={carrinho}/>
                    </TouchableOpacity> 
                </View>
            </View>
            <SafeAreaView>
                    <Text style={styles.inputText}> Qual a quantidade de items que deseja?</Text>
                    <TextInput keyboardType="numeric" placeholder="Quantidade" style={styles.input}></TextInput>
            </SafeAreaView>
              <SafeAreaView style={styles.container}>  
                    <ScrollView  > 
                        <View style={styles.BoxCart}>
                            <TouchableOpacity onPress={Addcart} >
                                <View style={styles.boxInfo}> 
                                    <Text style={styles.produto}>INFO DO PRODUTO</Text>
                                    <Text  style={styles.id}>Codigo: {codeBar} </Text>
                                    <Text style={styles.descrição}>descrição: {desc}</Text>
                                    <Text style={styles.value}> Preço: R${value}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                     </ScrollView>
                     <View>
                        <RectButton style={styles.inputSubmit}>
                            <Text style={styles.inputSubmitTxt}>Enviar pro carrinho</Text>
                        </RectButton>
                     </View>
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
        top: 10        
    },

    id:{
        fontSize:16,
        fontWeight: "500",
        top:30,
        color: "#9A9898",
        paddingHorizontal: 10
    },
   
    descrição:{
        fontSize:16,
        fontWeight: "500",
        top: 40,
        color: "#9A9898",
        paddingHorizontal: 10
    },

    value:{
        fontSize:16,
        fontWeight: "500",
        top: 55,
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

    },

    inputSubmit:{
        backgroundColor: "#7099d8",
        bottom: 30,
        left: 40,
        width: 300,
        height:50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },

    inputSubmitTxt:{
        textAlign: "center",
        fontSize: 22,
        fontWeight: "700",
        color: "#fff"
    },


    backgroundCart:{
        backgroundColor: "#fff",
        top: 10,
        width: 40,
        left: 325,
        borderRadius: 15,
        height: 42
    },

    textNumber:{
        textAlign: "center",
        top: 2,
        fontWeight: "bold",
        color: "#F32F56"
    },

    carrinho:{
        left: 5,
        bottom: 3
    },

    boxInfo:{
        height: 200
    }

})