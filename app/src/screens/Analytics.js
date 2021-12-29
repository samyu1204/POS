import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Analytics() {
    return(
        <View style={styles.background  }>
            <Text>This is the Analytics screen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "#D1E3DA",
    },
})

export default Analytics;