import React from 'react';
import { Modal, ActivityIndicator, View } from 'react-native';

const LoadingOverlay = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <ActivityIndicator
          animating={true}
          size="large"
          color="#fff"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      </View>
    </Modal>
  );
};

export default LoadingOverlay;
