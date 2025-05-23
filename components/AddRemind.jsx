import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment-timezone";

const AddRemind = ({ onAddReminder }) => {
  const [reminderName, setReminderName] = useState("");
  const [reminderDescription, setReminderDescription] = useState("");
  const [reminderDate, setReminderDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const userTimeZone = moment.tz.guess();
    const localDate = moment(date).tz(userTimeZone, true).toDate();
    setReminderDate(localDate);
    hideDatePicker();
  };

  const handleAddReminder = () => {
    if (!reminderName.trim() || !reminderDate) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const newReminder = {
      name: reminderName.trim(),
      description: reminderDescription.trim(),
      date: reminderDate,
      isFinished: false,
    };

    onAddReminder(newReminder);

    setReminderName("");
    setReminderDescription("");
    setReminderDate(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={reminderName}
        onChangeText={setReminderName}
      />

      <TextInput
        style={[styles.input, { backgroundColor: "#f9f9f9" }]}
        placeholder="Description"
        value={reminderDescription}
        onChangeText={setReminderDescription}
        accessibilityLabel="Enter reminder description"
      />

      <Pressable
        onPress={showDatePicker}
        style={[styles.datePickerButton, { backgroundColor: "#e0f7fa" }]}
        accessibilityLabel="Select reminder date and time"
      >
        <Text style={styles.datePickerText}>
          {reminderDate
            ? `Date and time: ${reminderDate.toLocaleString()}`
            : "Please select date and time"}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

      <Button
        title="Add new To-Do"
        onPress={handleAddReminder}
        color="#4CAF50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    margin: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  datePickerText: {
    color: "#333",
  },
});

export default AddRemind;
