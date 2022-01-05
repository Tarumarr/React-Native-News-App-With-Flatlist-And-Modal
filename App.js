import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { FlatList, StyleSheet, Text, View, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';

const App = () => {
  const [feed, setFeed] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [holdItem, setHoldItem] = useState("");
  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=tr&apiKey=b126c9c85a804b01a06a95990a6bd6c7')
      .then((re) => re.json())
      .then((re) => {
        setFeed(re.articles);
      })
  }, []);
  const LogoTitle = () => {
    return (
      <View style={styles.logo}>
        <Text style={styles.logoText}>NEWS</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <LogoTitle />
      <FlatList
        data={feed}
        keyExtractor={(item) => { return item.title }}
        renderItem={({ item, index }) => (
          <View key={index}>
            <TouchableOpacity onPress={() => (setHoldItem(item), setModalVisible(!modalVisible))}>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{ uri: item.urlToImage }}
                />
              </View>
              <View style={styles.title}>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <View
              style={styles.line}
            />
          </View>
        )}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}>
        <ScrollView>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{ uri: holdItem.urlToImage }}
            />
          </View>
          <Text style={styles.modaldescription}>{holdItem.description}</Text>
          <Text style={styles.modalcontent}>{holdItem.content}</Text>
        </ScrollView>
      </Modal>
    </View>
  );
}
export default App