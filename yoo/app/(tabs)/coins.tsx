import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const CoinsScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* TOP COINS */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/coin-small.png")}
          style={styles.bigCoin}
        />
        <Text style={styles.coinValue}>783</Text>
      </View>

      <Text style={styles.title}>Your EnviCoins</Text>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* ACTIVITY */}
      <Text style={styles.sectionTitle}>Your Activity</Text>

      <View style={styles.dateRow}>
        <Text style={styles.date}>Today - 06/11/25</Text>
        <View style={styles.line} />
      </View>

      {/* ACTIVITY ITEMS */}
      <View style={styles.card}>
        <Text style={styles.cardText}>6000 Steps completed</Text>

        <View style={styles.coinRow}>
          <Text style={styles.coinText}>+60</Text>
          <Image
            source={require("../../assets/images/coin-small.png")}
            style={styles.smallCoin}
          />
        </View>
      </View>

      <Text style={styles.dateSub}>Yesterday - 05/11/25</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>4000 Steps completed</Text>
        <View style={styles.coinRow}>
          <Text style={styles.coinText}>+40</Text>
          <Image
            source={require("../../assets/images/coin-small.png")}
            style={styles.smallCoin}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>100% charge at Log9 charging station</Text>
        <View style={styles.coinRow}>
          <Text style={styles.coinText}>+50</Text>
          <Image
            source={require("../../assets/images/coin-small.png")}
            style={styles.smallCoin}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>New EV added</Text>
        <View style={styles.coinRow}>
          <Text style={styles.coinText}>+100</Text>
          <Image
            source={require("../../assets/images/coin-small.png")}
            style={styles.smallCoin}
          />
        </View>
      </View>

      <Text style={styles.dateSub}>04/11/25</Text>

      {/* FOOTER IMAGE */}
      <Image
        source={require("../../assets/images/coins-footer.png")}
        style={styles.footerImage}
      />
    </ScrollView>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDE8",
    padding: 16,
  },

  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },

  bigCoin: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: "contain",
  },

  coinValue: {
    fontSize: 40,
    fontWeight: "700",
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#999",
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  date: {
    fontSize: 12,
    color: "#555",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#999",
    marginLeft: 10,
  },

  dateSub: {
    fontSize: 12,
    color: "#555",
    marginVertical: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  cardText: {
    flex: 1,
    fontSize: 13,
  },

  coinRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  coinText: {
    fontWeight: "600",
    marginRight: 6,
  },

  smallCoin: {
    width: 24,
    height: 24,
  },

  footerImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 20,
  },
});