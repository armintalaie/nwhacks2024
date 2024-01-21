import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import BottomModal from './BottomModal';
import NewChallenge from './newChallenge';
import Form from './Form';
import JoinChallenge from './JoinChallenge';

export default function GoalAction({ navigation }) {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisibile, setJoinModalVisible] = useState(false);

  const inputs = [
    <TextInput 
      style={styles.input} 
      placeholder="Enter Challenge Link" 
    />,
  ];

   // Define the submit handler
   const handleSubmit = () => {
    navigation.navigate('Challenge');
    setCreateModalVisible(false);
    setJoinModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Olti</Text>
      
      {/* Create Challenge Button */}
      <TouchableOpacity 
        style={styles.actionWidget} 
        onPress={() => setCreateModalVisible(true)}
      >
        <Text style={styles.widgetHeader}>Create a Challenge</Text>
        <Text style={styles.widgetText}>Embark on your personal goal-setting journey by creating a new challenge.</Text>
      </TouchableOpacity>

      {/* Join Challenge Button */}
      <TouchableOpacity 
        style={styles.actionWidget} 
        onPress={() => setJoinModalVisible(true)}
      >
        <Text style={styles.widgetHeader}>Join a Challenge</Text>
        <Text style={styles.widgetText}>Connect with others and achieve together by joining an existing challenge.</Text>
      </TouchableOpacity>

      {/* Create Modal */}
      <BottomModal 
        modalVisible={createModalVisible} 
        setModalVisible={setCreateModalVisible}
        modalHeight={'70%'}
      >
        <NewChallenge navigation={navigation} onClose={() => setCreateModalVisible(false)}/>
      </BottomModal>

      {/* Join Modal */}
      <BottomModal
        modalVisible={joinModalVisibile} 
        setModalVisible={setJoinModalVisible}
        modalHeight={'40%'}
      >
      <JoinChallenge
        navigation={navigation}
        onClose={() => setJoinModalVisible(false)}
      />
      </BottomModal>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center-start',
    padding: 20,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#7B61FF',
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  actionWidget: {
    backgroundColor: '#E3EAFD',
    borderRadius: 10,
    height: 150,
    width: '100%',
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    marginBottom: 20,
    padding: 20,
  },
  
  widgetHeader: {
    fontSize: 24,
    justifyContent: 'center-start',
    fontWeight: '600', 
    textAlign: 'left', 

    marginBottom: 10, 
  },
  widgetText: {
    fontSize: 16,
    textAlign: 'left', 
    color: '#6C757D',
  },

});
