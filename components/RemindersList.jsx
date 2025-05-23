import { View, Text, StyleSheet, FlatList } from "react-native";
import RemindCard from "./RemindCard";

const RemindersList = ({ reminders, onDelete, onToggleFinished }) => {
  const renderItem = ({ item }) => (
    <RemindCard {...{ remind: item, onDelete, onToggleFinished }} />
  );

  const getItemLayout = (_, index) => ({
    length: 80, // Approximate height of each item
    offset: 80 * index,
    index,
  });

  if (reminders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>To-Do list is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
});

export default RemindersList;
