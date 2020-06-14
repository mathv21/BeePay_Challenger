import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage} from 'react-native';
import { ScrollView, TextInput} from 'react-native-gesture-handler';

export default function Cart(){

    const MY_STORAGE_KEY = '@key:value';

    const [codeBar, setCodeBar] = useState('');
    const [desc, setDesc] = useState('')
    const [value, setValue] = useState('')

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
  
    useEffect(() => {

        loadProducts()

    },[]);



     return(
        <>
            <View style={styles.header}> 
                    <Text style={styles.headerTxt}>Carrinho</Text>
            </View>
              <SafeAreaView style={styles.container}>  
                    <ScrollView > 
                        <View style={styles.BoxCart}>
                            <Text style={styles.produto}>INFO DO PRODUTO</Text>
                            <Text  style={styles.id}>Codigo: {codeBar} </Text>
                            <Text style={styles.descrição}>descrição: {desc}</Text>
                            <Text style={styles.value}> Preço: {value}</Text>
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
        top: 50,
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