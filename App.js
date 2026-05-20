import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, StatusBar } from 'react-native';

export default function App() {
  // Estados para guardar o Pokémon e controlar o carregamento
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  // A sua função original adaptada para o React Native
  async function sortearPokemon() {
    setLoading(true);
    
    // Gera um ID aleatório de 1 até 1025
    const idAleatorio = Math.floor(Math.random() * 1025) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${idAleatorio}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) throw new Error("Pokémon não encontrado");

      const data = await response.json();

      // Atualiza o estado com os dados mastigados da API
      setPokemon({
        name: data.name.toUpperCase(),
        // Pega a imagem oficial que você usava no web
        image: data.sprites.other['official-artwork'].front_default,
        // Mapeia e junta os tipos com a barra '/'
        tipos: data.types.map(info => info.type.name).join(' / ')
      });

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Alerta nativo do mobile
      Alert.alert("Ops!", "Ocorreu um erro ao buscar o Pokémon.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* Configura a barra de status do celular (bateria, hora) para combinar com o app */}
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      <Text style={styles.header}>Sorteador Pokémon Mobile</Text>

      {/* Card que exibe o Pokémon ou o texto inicial */}
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFCC00" />
        ) : pokemon ? (
          <>
            <Text style={styles.pokeName}>{pokemon.name}</Text>
            
            {/* Imagens da web no mobile precisam de uri, width e height explícitos */}
            <Image 
              style={styles.pokeImg} 
              source={{ uri: pokemon.image }} 
            />
            
            <Text style={styles.pokeType}>Tipo: {pokemon.tipos}</Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>
            Clique no botão abaixo para sortear um Pokémon de 1 a 1025!
          </Text>
        )}
      </View>

      {/* Botão de Sorteio (TouchableOpacity dá o efeito de clique no mobile) */}
      <TouchableOpacity style={styles.button} onPress={sortearPokemon} activeOpacity={0.7}>
        <Text style={styles.buttonText}>SORTEAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilização do App (substitui o CSS clássico da Web)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFCC00',
    marginBottom: 30,
    letterSpacing: 1,
  },
  card: {
    width: '90%',
    height: 380,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFCC00',
    marginBottom: 40,
    // Sombras para Android e iOS ficarem elegantes
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  pokeName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  pokeImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Garante que a imagem não mude de proporção
    marginBottom: 20,
  },
  pokeType: {
    fontSize: 18,
    color: '#FFCC00',
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: '#1a1a1a',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFCC00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});